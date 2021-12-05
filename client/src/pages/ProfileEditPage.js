import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToken } from "../auth/useToken";
import { useUser } from "../auth/useUser";

export const ProfileEditPage = () => {
  const user = useUser();
  const [token, setToken] = useToken();

  const { username, bio, favoritePlant, email } = user;
  console.log("**************");
  console.log(user);
  console.log(username);
  console.log(bio);
  console.log(favoritePlant);
  console.log(email);

  // We'll use the history to navigate the user
  // programmatically later on (we're not using it yet)
  const navigate = useNavigate();

  // These states are bound to the values of the text inputs
  // on the page (see JSX below).
  const [bioValue, setBioValue] = useState(bio || "");
  const [favoritePlantValue, setFavoritePlantValue] = useState(
    favoritePlant || ""
  );
  const [emailValue, setEmailValue] = useState(email || "");

  // These state variables control whether or not we show
  // the success and error message sections after making
  // a network request (see JSX below).
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  // This useEffect hook automatically hides the
  // success and error messages after 3 seconds when they're shown.
  // Just a little user interface improvement.
  useEffect(() => {
    if (showSuccessMessage || showErrorMessage) {
      setTimeout(() => {
        setShowSuccessMessage(false);
        setShowErrorMessage(false);
      }, 5000);
    }
  }, [showSuccessMessage, showErrorMessage]);

  const saveChanges = async () => {
    // Send a request to the server to
    // update the user's info with any changes we've
    // made to the text input values
    try {
      const response = await axios.put(
        `/api/users/${username}`,
        {
          bio: bioValue,
          favoritePlant: favoritePlantValue,
          email: emailValue,
        },
        {
          headers: { Authorization: `${token}` },
        }
      );

      const { token: newToken } = response.data;
      setToken(newToken);
      setShowSuccessMessage(true);
    } catch (error) {
      setShowErrorMessage(true);
    }
  };

  const logOut = () => {
    // We'll want to log the user out here
    // and send them to the "login page"
    localStorage.removeItem("token");
    navigate("/login");
  };

  const resetValues = () => {
    // Reset the text input values to
    // their starting values (the data we loaded from the server)
    setBioValue(bio);
    setFavoritePlantValue(favoritePlant);
    setEmailValue(email);
  };

  // And here we have the JSX for our component. It's pretty straightforward
  return (
    <div className="container">
      <h1>{username}'s Profile</h1>
      {showSuccessMessage && (
        <div className="success">Successfully saved user data!</div>
      )}
      {showErrorMessage && (
        <div className="fail">
          Uh oh... something went wrong and we couldn't save changes
        </div>
      )}
      <label>
        Bio:
        <input onChange={(e) => setBioValue(e.target.value)} value={bioValue} />
      </label>
      <label>
        Favorite Plant:
        <input
          onChange={(e) => setFavoritePlantValue(e.target.value)}
          value={favoritePlantValue}
        />
      </label>
      <label>
        Email:
        <input
          onChange={(e) => setEmailValue(e.target.value)}
          value={emailValue}
        />
      </label>
      <button
        onClick={saveChanges}
        className="btn btn-large waves-effect waves-light hoverable blue accent-3"
      >
        Save Changes
      </button>
      <button
        onClick={resetValues}
        className="btn btn-large waves-effect waves-light hoverable blue accent-3"
      >
        Reset Values
      </button>
      <button
        onClick={logOut}
        className="btn btn-large waves-effect waves-light hoverable blue accent-3"
      >
        Log Out
      </button>
    </div>
  );
};
