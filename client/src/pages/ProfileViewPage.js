import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const ProfileViewPage = () => {
  // We'll use the history to navigate the user
  // programmatically later on (we're not using it yet)
  const navigate = useNavigate();

  let { username } = useParams();

  const [bio, setBio] = useState([]);
  const [favoritePlant, setFavoritePlant] = useState([]);
  useEffect(() => {
    fetchPublicInfo();
  }, []);
  const fetchPublicInfo = () => {
    axios
      .get(`/api/users/${username}`)
      .then((res) => {
        console.log(res);
        const body = res.data;
        const { publicInfo } = body;
        const { bio, favoritePlant } = publicInfo;
        setBio(bio);
        setFavoritePlant(favoritePlant);
      })
      .catch((err) => {
        navigate("/");
      });
  };

  // And here we have the JSX for our component. It's pretty straightforward
  return (
    <div className="content-container">
      <h1>{username}'s Profile</h1>
      <label>
        Bio:
        <input value={bio} readOnly />
      </label>
      <label>
        Favorite Plant:
        <input value={favoritePlant} readOnly />
      </label>
    </div>
  );
};
