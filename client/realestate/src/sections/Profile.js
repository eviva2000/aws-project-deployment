import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Avatar2 from "../assets/av3.png";
import axios from "axios";
const Profile = (props) => {
  let history = useHistory();
  const { userData, onAuth, setUserData } = props;
  const [displayUpdateMessage, setDisplayUpdateMessage] = useState("none");
  const [displayUpdateBtn, setDisplayUpdateBtn] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(false);
  const [form, setForm] = useState({
    firstname: userData.firstname,
    lastname: userData.lastname,
    email: userData.email,
  });
  // Getting the values of the form
  const handleChange = (input) => (event) => {
    setForm({ ...form, [input]: event.target.value });
    setDisplayUpdateBtn(true);
    console.log("handlechange", form);
  };

  // Update user info
  const handleUpdate = async () => {
    const updatedData = {
      firstname: form.firstname,
      lastname: form.lastname,
      email: form.email,
    };

    try {
      const response = await axios.put(
        "http://3.82.1.90/users",
        updatedData
      );
      setUserData(updatedData);
      console.log(response.data.response);
      localStorage.setItem("user", JSON.stringify(response.data.response));
      showUpdateModal();
    } catch (err) {
      console.log("error", err);
      setDisplayUpdateMessage("none");
    }
  };
  const showUpdateModal = () => {
    console.log("hiiii");
    setDisplayUpdateMessage("grid");
  };

  //Delete user profile
  const handleDelete = async () => {
    try {
      await axios.delete(
        "http://3.82.1.90/users"
      );
      onAuth(false);
      localStorage.removeItem("user");
      history.push("/");
    } catch (err) {
      console.log("Failed:", err);
    }
  };
  const hideUpdateModal = () => {
    setDisplayUpdateMessage("none");
  };
  const showDeleteMessage = () => {
    setDeleteMessage(true);
  };
  const hideDeleteMessage = () => {
    setDeleteMessage(false);
  };
  return (
    <div className="profileContainer">
      <div className="MessageModal" style={{ display: displayUpdateMessage }}>
        <p id="successMessage">
          Your information has been updated successfully!
        </p>
        <button onClick={hideUpdateModal}>Ok</button>
      </div>
      <div
        className="MessageModal"
        style={{ display: deleteMessage ? "grid" : "none" }}
      >
        <p style={{ color: "#bb0000" }}> Are you sure?</p>
        <div id="warningContainer">
          <button onClick={handleDelete}>Yes</button>
          <button onClick={hideDeleteMessage} style={{ marginLeft: "1em" }}>
            Cancel
          </button>
        </div>
      </div>
      <div className="imgWrapper">
        <img src={Avatar2} id="avatar" alt="" />
        <div className="resetBtn" style={{ marginTop: "1em" }}>
          {" "}
          <Link to="resetpassword">Change password</Link>{" "}
        </div>
      </div>
      <div className="userInfo">
        <form className="userInfo" autoComplete="off">
          <div className="detail">
            <span> Email Address:</span>
            <input
              className="profileInput"
              type="text"
              defaultValue={userData.email}
              onChange={handleChange("email")}
            />
          </div>
          <div className="detail" style={{ marginTop: "2em" }}>
            <span> Full name: </span>
            <div className="profileInput" id="fullName">
              <input
                type="text"
                name=""
                defaultValue={userData.firstname}
                onChange={handleChange("firstname")}
              />
              <input
                type="text"
                name=""
                id=""
                defaultValue={userData.lastname}
                onChange={handleChange("lastname")}
              />
            </div>
          </div>
        </form>
        <div className="profileBtns">
          <div
            id="update"
            style={{
              display: displayUpdateBtn ? "block" : "none",
              marginRight: "2em",
            }}
          >
            <button id="updateBtn" onClick={handleUpdate}>
              Save Updates
            </button>
          </div>

          <div id="delete">
            <button id="deleteBtn" onClick={showDeleteMessage}>
              Delete profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
