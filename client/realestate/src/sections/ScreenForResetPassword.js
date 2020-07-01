import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
const ResetPassScreen = (props) => {
  const [newPassword, setNewPassword] = useState({ newpassword: "" });
  const [updated, setUpdated] = useState(false);
  const [error, setError] = useState(false);
  let { token } = useParams();
  const { userData } = props;
  console.log("thisss", userData.id);
  useEffect(() => {
    try {
      fetch(`http://localhost:9090/reset?resetpasswordtoken=${token}`, {})
        .then((res) => res.json())
        .then((data) => {
          console.log("here", data.response);
          if (data.response.message === "password reset link a-ok") {
            setUpdated(false);
            setError(false);
          }
        });
    } catch (error) {
      console.log("erro in catch", error);
      setUpdated(false);
      setError(true);
    }
  }, [token]);

  const handleChange = (e) => {
    setNewPassword({
      [e.target.id]: e.target.value,
    });
    console.log(newPassword);
  };
  const updatePassword = async (e) => {
    e.preventDefault();
    const userInfo = {
      id: userData.id,
      newPassword: newPassword.newpassword,
      token,
    };
    console.log(userInfo);
    try {
      const resetResponse = await axios.put(
        "http://localhost:9090/updatePasswordViaEmail",
        {
          userInfo,
        }
      );
      console.log(resetResponse);
      if (resetResponse.data.message === "password updated") {
        setError(false);
        setUpdated(true);
        // handleLogout();
        // handleUserStatus();
      } else {
        setError(true);
        setUpdated(false);
      }
    } catch {
      console.log(error);
    }
  };

  //   const handleLogout = async () => {
  //     localStorage.removeItem("user");
  //     onAuth(false);
  //     try {
  //       await axios.get("http://localhost:9090/users/logout");
  //       return;
  //     } catch (err) {
  //       return;
  //     }
  //   };

  if (error) {
    return (
      <div>
        <div>
          <h4>Problem resetting password. Please send another reset link.</h4>
          <Link to="/"> Home page</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="passwordScreenContainer">
      {!updated ? (
        <div className="resetForm">
          <h2 style={{ textAlign: "center" }}>Reset your password</h2>

          <form onSubmit={updatePassword}>
            <i className="fa fa-lock icon"></i>

            <input
              type="text"
              name=""
              id="newpassword"
              placeholder="Type your new password"
              onChange={handleChange}
            />
            <button
              className="submitButton"
              style={{ width: "100%" }}
              type="submit"
            >
              Reset password
            </button>
          </form>
        </div>
      ) : null}

      {updated && (
        <div className="successMessage">
          <h2 style={{ marginTop: "3em" }}>
            Your password has been successfully reset, please try logging in
            again.
          </h2>
        </div>
      )}
    </div>
  );
};
export default ResetPassScreen;
