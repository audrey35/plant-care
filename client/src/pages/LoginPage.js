import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useToken } from "../auth/useToken";

export const LoginPage = () => {
  const [token, setToken] = useToken();

  const [errorMessage, setErrorMessage] = useState("");

  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const navigate = useNavigate();

  const onLoginClicked = async () => {
    const response = await axios.post("/api/users/login", {
      username: usernameValue,
      password: passwordValue,
    });
    const { token } = response.data;
    setToken(token);
    navigate("/profile");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col s8 offset-s2">
          {errorMessage && <div className="fail">{errorMessage}</div>}
          <Link to="/" className="btn-flat waves-effect">
            <i className="material-icons left">keyboard_backspace</i> Back to
            home
          </Link>
          <div className="col s12">
            <h4>
              <b>Login</b>
            </h4>
            <p className="grey-text text-darken-1">
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
          <div className="input-field col s12">
            <input
              value={usernameValue}
              onChange={(e) => setUsernameValue(e.target.value)}
              placeholder="username"
              id="username"
              type="text"
            />
          </div>
          <div className="input-field col s12">
            <input
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
              type="password"
              placeholder="password"
              id="password"
            />
          </div>
          <div className="col s12">
            <button
              disabled={!usernameValue || !passwordValue}
              onClick={onLoginClicked}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
