import React from "react";
import Logo from "../assets/logo2.png";
import { Link } from "react-router-dom";
import axios from "axios";
const Nav = (props) => {
  const { userData, isAuth, onAuth } = props;
  console.log("user data ...", userData);
  const handleLogout = async () => {
    localStorage.removeItem("user");
    onAuth(false);
    try {
      await axios.get("/users/logout");
      return;
    } catch (err) {
      return;
    }
  };
  return (
    <div className="Nav">
      <div id="imgContainer">
        <img src={Logo} alt="logo" />
        {isAuth ? <p>Welcome {userData.firstname} </p> : null}
      </div>
      {isAuth ? (
        <ul>
          <Link to="/">Home</Link>
          <Link to="/inventory">Inventory</Link>
          <Link to="/profile">Profile</Link>
          <button id="logout" onClick={handleLogout}>
            Log out
          </button>
        </ul>
      ) : (
        <ul>
          <Link to="/">Home</Link>
          <Link to="/inventory">Inventory</Link>
          <div id="signInUpContainer">
            <div className="signInUp" id="signin">
              <Link to="/login">Login</Link>
            </div>
            <div className="signInUp" id="signup">
              <Link to="/signup">Signup</Link>
            </div>
          </div>
        </ul>
      )}
    </div>
  );
};

export default Nav;
