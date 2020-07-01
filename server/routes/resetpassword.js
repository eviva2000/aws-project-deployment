const router = require("express").Router();
const User = require("../models/User");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
require("dotenv").config();

router.post("/resetpassword", async (req, res) => {
  const { email } = req.body;
  if (email === "") {
    res.status(400).send("email required");
  }
  const users = await User.query().select().where({ email: email });
  const user = users[0];
  if (!user) {
    return res.status(404).send({ message: "Email is not in DB" });
  }
  const userId = user.id;
  const token = crypto.randomBytes(20).toString("hex");
  await User.query().findById(userId).patch({
    resetpasswordtoken: token,
  });
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: `${process.env.EMAIL}`,
      pass: `${process.env.PASSWORD}`,
    },
  });

  const mailOptions = {
    from: "mySqlDemoEmail@gmail.com",
    to: `${user.email}`,
    subject: "Link To Reset Password",
    text:
      "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
      "Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n" +
      `http://localhost:3000/reset/${token}\n\n` +
      "If you did not request this, please ignore this email and your password will remain unchanged.\n",
  };
  transporter.sendMail(mailOptions, (err, response) => {
    if (err) {
      console.log("there was an error", err);
      return;
    } else {
      console.log("here is the res: ", response);
      res.send({ message: "Recovery email sent" });
    }
  });
});

/***********  Reset password screen after sending email */
router.get("/reset", async (req, res) => {
  const { resetpasswordtoken } = req.query;
  // console.log("it is req.query", resetpasswordtoken);
  const users = await User.query()
    .select()
    .where({ resetpasswordtoken: resetpasswordtoken });
  user = users[0];
  console.log(user);
  if (user === null) {
    console.error("password reset link is invalid or has expired");
    res.status(403).send("password reset link is invalid or has expired");
  } else {
    res.send({
      response: {
        user: user,
        message: "password reset link a-ok",
      },
    });
  }
});

/************ Reset password button clicked-- update password in DB */
const saltRounds = 12;
router.put("/updatePasswordViaEmail", async (req, res) => {
  const { userInfo } = req.body;
  const users = await User.query()
    .select()
    .where({ id: userInfo.id, resetpasswordtoken: userInfo.token });
  const user = users[0];
  const userId = user.id;

  if (user == null) {
    console.error("password reset link is invalid or has expired");
    res.status(403).send("password reset link is invalid or has expired");
  } else if (user != null) {
    bcrypt.hash(
      userInfo.newPassword,
      saltRounds,
      async (error, hashedPassword) => {
        if (error) {
          return res.status(500).send({});
        }
        try {
          await User.query().findById(userId).patch({
            password: hashedPassword,
            resetpasswordtoken: null,
          });
          res.send({ message: "password updated" });
        } catch (error) {
          res
            .status(500)
            .send({ response: "Something went wrong with the database" });
        }
      }
    );
  }
});

module.exports = router;
