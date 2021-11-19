import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToken } from "../auth/useToken";

export const SignUpPage = () => {
  const [token, setToken] = useToken();

  const [errorMessage, setErrorMessage] = useState("");

  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");

  const navigate = useNavigate();

  const onSignUpClicked = async () => {
    const response = await axios.post("/api/signup", {
      username: usernameValue,
      password: passwordValue,
    });
    const { token } = response.data;
    setToken(token);
    navigate("/profile");
  };

  return (
    <div className="content-container">
      <h1>Sign Up</h1>
      {errorMessage && <div className="fail">{errorMessage}</div>}
      <input
        value={usernameValue}
        onChange={(e) => setUsernameValue(e.target.value)}
        placeholder="username"
      />
      <input
        value={passwordValue}
        onChange={(e) => setPasswordValue(e.target.value)}
        type="password"
        placeholder="password"
      />
      <input
        value={confirmPasswordValue}
        onChange={(e) => setConfirmPasswordValue(e.target.value)}
        type="password"
        placeholder="password"
      />
      <hr />
      <button
        disabled={
          !usernameValue ||
          !passwordValue ||
          passwordValue !== confirmPasswordValue
        }
        onClick={onSignUpClicked}
      >
        Sign Up
      </button>
      <button onClick={() => navigate("/login")}>
        Already have an account? Log In
      </button>
    </div>
  );
};
