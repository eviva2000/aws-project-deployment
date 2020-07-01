import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavBar from "./components/Nav";
import LandingPage from "./sections/LandingPage";
import Login from "./sections/Login";
import Signup from "./sections/Signup";
import Profile from "./sections/Profile";
import Inventory from "./sections/Inventory";
import PrivateRoute from "./components/ProtectedRout";
import HomeProfile from "./sections/HomeProfile";
import ResetPassword from "./sections/ResetPassword";
import ResetPasswordFinalScreen from "./sections/ScreenForResetPassword";
import "./App.css";

function App() {
  const [auth, setAuth] = useState(localStorage.getItem("user") ? true : false);

  const [userData, setUserData] = useState(
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : ""
  );

  return (
    <Router>
      <div className="App">
        <NavBar userData={userData} isAuth={auth} onAuth={setAuth} />

        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route
            exact
            path="/login"
            component={(props) => (
              <Login {...props} onAuth={setAuth} setUserData={setUserData} />
            )}
          ></Route>
          <Route path="/signup">
            <Signup />
          </Route>{" "}
          <PrivateRoute
            auth={auth}
            exact
            path="/profile"
            component={(props) => (
              <Profile
                userData={userData}
                setUserData={setUserData}
                onAuth={setAuth}
                {...props}
              />
            )}
          />
          <PrivateRoute
            auth={auth}
            exact
            path="/inventory"
            component={(props) => <Inventory {...props} />}
          />
          <PrivateRoute
            exact
            path="/inventory/:homeId"
            component={HomeProfile}
          />
          <Route exact path="/resetpassword" component={ResetPassword} />
          <Route
            exact
            path="/reset/:token"
            component={(props) => (
              <ResetPasswordFinalScreen
                userData={userData}
                onAuth={setAuth}
                {...props}
              />
            )}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
