const express = require("express");
const { check, validationResult} = require("express-validator/check");
const router = express.Router();
const auth= require('../middleware/auth')

const { signUp, login, getUser, logout } = require("../controller/UserController");


//route for registering a user
router.post(
    "/signup",
    [
        check("username", "Please Enter a Valid Username")
        .not()
        .isEmpty(),
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Please enter a valid password").isLength({
            min: 6
        })
    ],
    signUp
);
// route for loggging in a user
router.post(
    "/login",
    [
      check("email", "Please enter a valid email").isEmail(),
      check("password", "Please enter a valid password").isLength({
        min: 6
      })
    ],
    login
  );
  // route to get loggedin user's details
  router.get("/fetch", auth, getUser);

router.post("/logout",auth,logout);
module.exports = router;

// route to logout a user

