import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
// import axios from "axios";

const Signup = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  let history = useHistory();

  const signupHandler = async (formData) => {
    const options = {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    };
    const res = await fetch(
      "http://ec2-18-232-129-39.compute-1.amazonaws.com/users/signup",
      options
    );
    const data = await res.json();
    console.log("response....", data);
    setErrorMessage(data.message);
    if (data.status !== 400) {
      history.push("/login");
    }
  };
  return (
    <div className="formContainer">
      <section className="formImage"></section>
      <div className="registerForm">
        <h2>Welcome to Dream House</h2>
        {errorMessage ? (
          <div style={{ color: "#bb0000" }}>{errorMessage}</div>
        ) : (
          ""
        )}
        <form onSubmit={handleSubmit(signupHandler)}>
          <div className="nameWrapper">
            <input
              type="text"
              name="firstname"
              placeholder="First name"
              ref={register({
                required:
                  "* First name must be minimum 2 alphabetical charecters",
                minLength: 2,
                pattern: { value: /^[a-zA-Z\s]+$/ },
              })}
            />
            {errors.name && (
              <small className="err-msg">{errors.name.message}</small>
            )}
            <input
              type="text"
              name="lastname"
              placeholder="Last name"
              ref={register({
                required:
                  "* Last name must be minimum 2 alphabetical charecters",
                minLength: 2,
                pattern: { value: /^[a-zA-Z\s]+$/ },
              })}
            />
            {errors.lastname && (
              <small className="err-msg">
                Last name must be minimum 2 charecter{" "}
              </small>
            )}
          </div>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            ref={register({
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              },
            })}
          />
          {errors.email && <small>* Invalid email address </small>}

          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            ref={register({
              required: true,
              pattern: {
                value: /^(?=.*\d)(?=.*[a-zA-Z]).{5,}$/,
              },
            })}
          />
          {errors.password && (
            <small>* Minimum 5 alpha numberic charecters </small>
          )}
          <input
            type="password"
            name="repeatPassword"
            placeholder="Repeat Password"
            ref={register({
              required: true,
              pattern: {
                value: /^(?=.*\d)(?=.*[a-zA-Z]).{5,}$/,
              },
            })}
          />
          {errors.repeatPassword && (
            <small>* Minimum 5 alpha numberic charecters </small>
          )}

          <button className="submitButton">Signup</button>
        </form>
      </div>
    </div>
  );
};
export default Signup;
