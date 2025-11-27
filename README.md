# Full-Stack Coding Challenge -- React + TypeScript + Node.js

Thank you for participating in our coding challenge!
Your goal is to build a small full-stack application using **React + TypeScript** on the frontend and **Node.js + Express** on the backend. The total time for this challenge is 1 hour ( 60 minutes ).

Please follow all requirements and submission instructions below.

------------------------------------------------------------------------

## Project Overview

You will build:

-   A **backend API proxy** that fetches users from a public API
-   A **frontend interface** that displays, filters, and interacts with
    those users

------------------------------------------------------------------------

## Backend Requirements (Node.js + Express)

### 1. Create a simple backend server that exposes a single proxy endpoint.

**Base URL**

    http://localhost:3000

**Endpoint: `GET /api/users`**

This endpoint must:

1.  Fetch users from `https://jsonplaceholder.typicode.com/users`
   
2.  Include basic error handling
   
3.  Return the JSON data to your frontend

------------------------------------------------------------------------

### 2. Add a backend endpoint

    GET /api/search?q=<term>


This endpoint must:

a.  Implement **Levenshtein distance** *from scratch* (no external distance libraries). See [Annexure](#annexure) at the end 

b.  For each user, compute similarity between:

    -   search term
    
    -   user.name
    
c.  Sort results by similarity (descending) 

d.  Return the top 5 matches

e.  Performance requirements:
    -   Must compute a single query in **\< 50ms** on average
    -   Use optimized DP (**O(min(m, n)) space**)
    
f.  Include at least **3 unit tests**:

    -   perfect match
    
    -   1 edit distance
    
    -   no similarity

------------------------------------------------------------------------

## Frontend Requirements (React + TypeScript)

The frontend must fetch data **only from your backend**:

    GET http://localhost:3000/api/users

------------------------------------------------------------------------

### 1. User List With Search & Debounce

Display all users showing:

-   Name
-   Email
-   Company name

Add a search box that:

-   Filters by name
-   Uses a **300ms debounce**
-   Updates on the client side

Add a **"Favorites Only"** toggle.

------------------------------------------------------------------------

### 2. User Detail Side Panel

When a user is clicked, show their details on the right side:

-   Name
-   Email
-   Phone

------------------------------------------------------------------------

### 3. Favorite a User (⭐)

-   Clicking ⭐ toggles favorite status
-   Must **not** trigger the details panel
-   Favorites stored only in React state

------------------------------------------------------------------------

## Repository Structure

    /backend    → Express server
    /frontend   → React + TypeScript

------------------------------------------------------------------------

## Running Locally

### Backend

    cd backend
    npm install
    npm run dev

### Frontend

    cd frontend
    npm install
    npm run dev

------------------------------------------------------------------------

## Deployment and Submission Instructions

1.  Push code to GitHub
2.  Deploy via Vercel
3.  Ensure auto-deploy on push
4.  Total time: 1 hour (60 mins)
5.  Submit:
    -   GitHub repo link
    -   Live Vercel link

------------------------------------------------------------------------

## Deployment Instructions

1.  Push code to GitHub
2.  Deploy via Vercel
3.  Ensure auto-deploy on push
4.  Submit:
    -   GitHub repo link
    -   Live Vercel link

------------------------------------------------------------------------
## Annexure 

### Levenshtein Distance Details

The **Levenshtein distance** is the minimum number of single-character
edits required to transform one string into another.

**Allowed operations:**

-   **Insertion**
-   **Deletion**
-   **Substitution**

------------------------------------------------------------------------

### **Example**

Transforming `"kitten"` → `"sitting"` requires **3 steps**:

1.  kitten → sitten (substitute k → s)
2.  sitten → sittin (substitute e → i)
3.  sittin → sitting (insert g)

Therefore:

    distance("kitten", "sitting") = 3

------------------------------------------------------------------------

### **Formal Definition**

Given two strings **a** (length *m*) and **b** (length *n*), the
Levenshtein distance **d(m, n)** is defined recursively:
```
If min(m, n) = 0:
   distance = max(m, n)
Otherwise:
   d(i, j) = min(
       d(i-1, j)   + 1,      // deletion
       d(i, j-1)   + 1,      // insertion
       d(i-1, j-1) + cost    // substitution
   )
```
Where **cost** is:
    0 if a[i] == b[j]
    1 otherwise

------------------------------------------------------------------------

### **Time & Space Complexity**

#### Traditional Dynamic Programming

-   **Time:** O(m × n)
-   **Space:** O(m × n)

#### Optimized Dynamic Programming

-   **Space:** O(min(m, n))
------------------------------------------------------------------------
Good luck! 
