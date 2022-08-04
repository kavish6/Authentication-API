const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult} = require("express-validator/check");

exports.signUp=async (req, res) => {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const {
        username,
        email,
        password
    } = req.body;
    try {
        let user = await User.findOne({
            email
        });
        if (user) {
            return res.status(400).json({
                msg: "User Already Exists"
            });
        }

        user = new User({
            username,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user._id
            }
        };

        const token=jwt.sign(
            payload,
            'SECRET', {
                expiresIn: '1h'
            }
        );
        res.cookie("authcookie",token,{httpOnly:true,maxAge:2147483647});
        res.status(200).json(user);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error in Saving");
    }
}

exports.login=async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({
        email
      });
      if (!user)
        return res.status(400).json({
          message: "User Not Exist"
        });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          message: "Incorrect Password !"
        });

      const payload = {
        user: {
          id: user._id
        }
      };

      jwt.sign(
        payload,
        'SECRET',
        {
          expiresIn: '1h'
        },
        (err, token) => {
          if (err) throw err;
          res.cookie('authcookie',token,{maxAge:2147483647,httpOnly:true});
          res.status(200).json(user);
        }
      );
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error"
      });
    }
  }
  
  exports.getUser=async (req, res) => {
    try {
      // request.user is getting fetched from Middleware after token authentication
      const user = await User.findById(req.user.id).select("-password");
      res.json(user);
    } catch (e) {
      res.send({ message: "Error in Fetching user" });
    }
  }

  exports.logout=async(req,res)=>{
    res.cookie('authcookie');
    res.status(200).json({message:'successfully logged out'})
  }