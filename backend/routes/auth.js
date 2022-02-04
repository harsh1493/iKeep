const express = require("express");
const fetchUser= require("../middleware/fetchUser");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken');

const JWT_SECRET= 'JijaGodiNeUthalega';
const {
  body,
  validationResult
} = require('express-validator');

//ROUTE 1 :create a user using: POST "/api/auth/createUser".Does not require Login
router.post('/createUser', [

  body('email', 'Enter a valid name').isEmail(),
  body('name', 'Enter a valid email').isLength({
    min: 3
  }),
  body('password', 'Enter a valid password').isLength({
    min: 5
  }),
], async (req, res) => {
  let success=false;
  console.log(req.body);
  const errors = validationResult(req);
  //if feilds are invalid/bad formatted
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success:success,
      errors: errors.array()
    });
  }

  try {
    //if user with email exists
    let user = await User.findOne({
      email: req.body.email
    });
    if (user) {
      return res.status(400).json({success:success,
        error: "sorry bad request,user with email exists"
      })  
    }

    //hashing before saving password 
    //generating salt
    const salt= await bcrypt.genSalt(10);

    //adding salt then hashing
    secPass= await bcrypt.hash(req.body.password,salt);
    //if no error ,user is created/registered
    success=true;
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    });

    //sample data for token generation
    const data= {
      user:{
        id:user.id
      }
    }
    //const jwtData= jwt.sign(data,JWT_SECRET);
    const authToken= jwt.sign(data,JWT_SECRET);
    
    //sending auth token back to user
    res.json({success,authToken});

  } catch (error) {
    console.log(error);
    res.status(500).send(success,'Internal Server error');
  }
 
});

//ROUTE 2 :Authenticate a user using:POST "/api/auth/login".Does not require Login
router.post('/login', [
  body('email', 'Enter a valid name').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
 let success=false;
  const errors = validationResult(req);
  //if feilds are invalid/bad formatted
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success:success,
      errors: errors.array()
    });
  }

  const {email,password}= req.body;
  try {
    let user= await User.findOne({email});
    if(!user){
      //user does not exists
      return res.status(400).json({
        success:success,
        error:'Wrong Credentials'
      });
    }
    const passwordCompare=await bcrypt.compare(password,user.password);
    if(!passwordCompare){
      //user exists but wrong password
      return res.status(400).json({
        success:success,
        error:'Wrong Credentials'
      });
    }
    success=true;
    const data= {
      user:{
        id:user.id
      }
    }
    //const jwtData= jwt.sign(data,JWT_SECRET);
    const authToken= jwt.sign(data,JWT_SECRET);
    
    //sending auth token back to user
    res.json({success,authToken});
    
  } catch (error) {
    console.log(error);
    res.status(500).send(success,'Internal Server error');
  }

});

//ROUTE 3 :Get logged in user details using:POST "/api/auth/getUser". Require Login
router.post('/getUser',fetchUser, async (req, res) => {
  try {
    const userId=req.user.id;
    const user=await User.findById(userId).select("-password");//select all feilds except password
    res.send(user);
  
  } catch (error) {
        console.log(error);
      res.status(500).send('Internal Server error');
  }
});




module.exports = router;