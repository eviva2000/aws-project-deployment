const express = require("express");
const session = require("express-session");
const app = express();
const dotEnv = require("dotenv");
const path = require("path");

dotEnv.config();
app.use(express.static(path.join(__dirname, "build")));
app.use(express.json()); // to parse the body of an HTTP request
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:9090");
 res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Origin", "http://52.202.183.85");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  );
  next();
});
app.use(
  session({
    name: "sid",
    secret: "secretkey",
    resave: false,
    saveUninitialized: false,
  })
);
/*  Setting up database */
const Knex = require("knex");
const knexFile = require("./knexfile");

// we instanciate Knex library to have a connection
const knex = Knex(knexFile.development); // knex is established connection to our DB. inside (knexFile.development) we have connection info

const { Model } = require("objection");
/* Give the knex instance to objection. */
Model.knex(knex);

/* Limit the the amount of the request on login and signup routes*/
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 4, // limit each IP to 4 requests per windowMs
});
// app.use("/users/login", limiter);
app.use("/users/signup", limiter);

/* **********  Routes ************* */

const userRoute = require("./routes/user");
const resetPasswordRoute = require("./routes/resetpassword");
app.use(userRoute);
app.use(resetPasswordRoute);
const port = 9090;

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});


app.listen(port, (error) => {
  if (error) {
    console.log("server can not listen");
    return;
  }
  console.log(`server is listening to port ${port}`);
});
