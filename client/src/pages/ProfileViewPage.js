import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToken } from "../auth/useToken";
import { useUser } from "../auth/useUser";

export const ProfileViewPage = () => {
  const user = useUser();
  const [token, setToken] = useToken();

  const { id, username, info } = user;

  // We'll use the history to navigate the user
  // programmatically later on (we're not using it yet)
  const navigate = useNavigate();

  // These states are bound to the values of the text inputs
  // on the page (see JSX below).
  const [favoritePlant, setFavoritePlant] = useState(info.favoritePlant || "");
  const [email, setEmail] = useState(info.email || "");
  const [bio, setBio] = useState(info.bio || "");

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
      }, 3000);
    }
  }, [showSuccessMessage, showErrorMessage]);

  const saveChanges = async () => {
    // Send a request to the server to
    // update the user's info with any changes we've
    // made to the text input values
    try {
      const response = await axios.put(
        `/api/users/${id}`,
        {
          favoritePlant,
          email,
          bio,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
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
    setFavoritePlant(info.favoritePlant);
    setEmail(info.email);
    setBio(info.bio);
  };

  // And here we have the JSX for our component. It's pretty straightforward
  return (
    <div className="content-container">
      <h1>{username}'s Profile</h1>
      <label>
        Bio:
        <input value={bio} />
      </label>
      <label>
        Email:
        <input value={email} />
      </label>
      <label>
        Favorite Plant:
        <input value={favoritePlant} />
      </label>
    </div>
  );
};
