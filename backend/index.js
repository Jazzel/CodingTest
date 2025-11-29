const express = require("express");

const app = express();

const PORT = 3000;
const IP = "localhost";

const levenshteinDistance = (a, b) => {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const cost = a[a.length - 1] === b[b.length - 1] ? 0 : 1;

  // deletion
  // insertion
  // substitution
  return Math.min(
    levenshteinDistance(a.slice(0, -1), b) + 1,
    levenshteinDistance(a, b.slice(0, -1)) + 1,
    levenshteinDistance(a.slice(0, -1), b.slice(0, -1)) + cost
  );
};

console.log(levenshteinDistance("kitten", "sitting"));

app.get("/", async (req, res) => {
  res.status(200).json({ message: "Server is healthy" });
});

app.get("/api/users", async (req, res) => {
  try {
    const request = await fetch("https://jsonplaceholder.typicode.com/users");

    const data = await request.json();

    console.log(data);

    return res.status(200).json(data);
  } catch (error) {
    return res.status(404).json({ message: "Failed to fetch data" });
  }
});

app.get("/api/search", async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res
        .status(404)
        .json({ message: "Please provide the search term" });
    }

    const request = await fetch("https://jsonplaceholder.typicode.com/users");

    const data = await request.json();

    return res.status(200).json(
      data.map((user) => {
        user.similarityScore = levenshteinDistance(q.trim(), user.name);
      })
    );
  } catch (error) {
    return res.status(404).json({ message: "Failed to fetch data" });
  }
});

app.listen(PORT, IP, () => {
  console.log(`Server running at http://${IP}:${PORT}`);
});
