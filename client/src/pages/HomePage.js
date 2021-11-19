import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="content-container">
      <h1>Plant Care</h1>
      <button onClick={() => navigate("/login")}>Log In</button>
      <button onClick={() => navigate("/signup")}>
        Don't have an account? Sign Up
      </button>
    </div>
  );
};

export default HomePage;
