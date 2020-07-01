const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // const token = req.query.jwt;

  const token = req.header("token");
  if (!token) return res.status(401).json({ message: "Auth Error" });

  try {
    const decoded = jwt.verify(token, "the jwt secret key");
    console.log("from auth", decoded);
    req.id = decoded.id;
    next();
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Invalid Token" });
  }
};
// module.exports = function (req, res, next) {
//   console.log("date", new Date());
//   next();
// };
