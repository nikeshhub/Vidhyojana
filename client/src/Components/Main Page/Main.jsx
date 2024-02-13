// Home.js
import React from "react";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to the Main Page</h1>
      <p>Please login to access the content.</p>
      <Link to="/login">
        <button style={{ padding: "10px 20px", fontSize: "16px" }}>
          Login
        </button>
      </Link>
    </div>
  );
};

export default Main;
