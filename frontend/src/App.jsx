import "./App.css";
import { useEffect, useState } from "react";

const HOST = "http://localhost:3000";

function App() {
  const [data, setData] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);

  const [column, setColumn] = useState("col-12");

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const request = await fetch(`${HOST}/api/users`);

        const data = await request.json();
        setData(data);
      } catch (error) {
        setData([]);
        console.log("Failed to get data from the server");
      }
    };

    fetchUserData();
  }, []);

  const fetchSearchData = async () => {
    try {
      const request = await fetch(`${HOST}/api/search?q=${searchTerm}`);

      const data = await request.json();
      setData(data);
    } catch (error) {
      setData([]);
      console.log("Failed to get data from the server");
    }
  };

  const markUserFavorite = async (user) => {

    const favoriteUsers = localStorage.getItem("users")? JSON.parse(localStorage.getItem("users")) : [];
    

    
  
  }

  return (
    <div className="container m-5">
      <div className="row">
        <input
          placeholder="Type search term"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            // fetchSearchData();

            // setInterval(() => {
            // }, 300);
          }}
          className="form-control"
        />
      </div>

      <div className="row mt-5">
        <div className={`${column}`}>
          {data && data.length > 0 ? (
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Company</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((user) => (
                  <tr
                    key={user.id}
                    onClick={() => {
                      setSelectedUser(user);
                      setColumn("col-6");
                    }}
                  >
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.company?.name}</td>
                    <td>
                      <button onClick={() => }>Mark favorite</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>No data found</div>
          )}
        </div>
        <div className="col-6">
          {selectedUser && selectedUser.name && (
            <>
              <h1>Selected User</h1>
              <button onClick={() => setSelectedUser(null)}>
                Clear selection
              </button>
              <ul>
                <li>Name: {selectedUser.name}</li>
                <li>Email: {selectedUser.email}</li>
                <li>Company name: {selectedUser.company?.name}</li>
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
