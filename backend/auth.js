const jwt = require("jsonwebtoken");

function  auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ message: "invalid user no token" });

  console.log(authHeader)
 
   
  try {
    const decoded = jwt.verify(authHeader,"qwerty@123");
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};
module.exports=auth;
