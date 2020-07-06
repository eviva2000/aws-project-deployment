import React, { useEffect } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;
//component property defined on props
const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  const history = useHistory();
  console.log("rest", rest);
  // check if the user is already logged in
  useEffect(() => {
    const userStatus = async () => {
      try {
        const response = await axios.get(
          "http://ec2-18-232-129-39.compute-1.amazonaws.com/users/session"
        );
        const userData = response.data;
        if (!userData) {
          console.log("not logged in");
        }
        console.log(userData.data);
        localStorage.setItem("user", JSON.stringify(userData.data));
      } catch (err) {
        localStorage.removeItem("user");
        return;
      }
    };

    userStatus();
  }, [history]);

  return (
    <Route
      {...rest}
      render={(props) =>
        auth === true || localStorage.getItem("user") ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};
export default PrivateRoute;
