
const jwt = require("jsonwebtoken");
require('dotenv').config();
module.exports = function(req, res, next) {
  const authcookie = req.cookies.authcookie;
  try{
    const decoded =jwt.verify(authcookie,'SECRET');
    req.user=decoded.user;
    next();
  }
  catch(e)
  {
    console.log(e);
    res.status(500).json({message:"Invalid Token"});
  }
  }