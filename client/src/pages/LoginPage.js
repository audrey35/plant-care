import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToken } from "../auth/useToken";

export const LoginPage = () => {
  const [token, setToken] = useToken();

  const [errorMessage, setErrorMessage] = useState("");

  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const navigate = useNavigate();

  const onLoginClicked = async () => {
    const response = await axios.post("/api/login", {
      email: emailValue,
      password: passwordValue,
    });
    const { token } = response.data;
    setToken(token);
    navigate("/");
  };

  return (
    <div className="content-container">
      <h1>Log In</h1>
      {errorMessage && <div className="fail">{errorMessage}</div>}
      <input
        value={emailValue}
        onChange={(e) => setEmailValue(e.target.value)}
        placeholder="someone@gmail.com"
      />
      <input
        value={passwordValue}
        onChange={(e) => setPasswordValue(e.target.value)}
        type="password"
        placeholder="password"
      />
      <hr />
      <button disabled={!emailValue || !passwordValue} onClick={onLoginClicked}>
        Log In
      </button>
      <button onClick={() => navigate("/forgot-password")}>
        Forgot your password?
      </button>
      <button onClick={() => navigate("/signup")}>
        Don't have an account? Sign Up
      </button>
    </div>
  );
};
