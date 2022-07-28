const router = require('express').Router();
const User = require('../models/User');
const UserProfile = require('../models/UserProfile')
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");

// Register
router.post("/register", async (req,res)=>{
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJs.AES.encrypt(req.body.password, process.env.CRYPTO_KEY).toString()
  });

  try {
    const user = await newUser.save();

    const userProfile = new UserProfile({
      user: user._id
    })
    const profile = await userProfile.save();
    console.log(profile.user);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error.message);  
  }
})

// Login
router.post("/login", async (req,res)=>{
  try {
    const user = await User.findOne({email:req.body.email});
    !user && res.status(401).json("Wrong password or email");

    // Decrypting password if user email is found in database
    const bytes = CryptoJs.AES.decrypt(user.password, process.env.CRYPTO_KEY);
    const originalPassword = bytes.toString(CryptoJs.enc.Utf8);

    originalPassword !== req.body.password && res.status(401).json("Wrong password");

    // Getting the jwt access token
    const accessToken = jwt.sign(
      { id: user._id },
      process.env.JWT_KEY,
      { expiresIn: '5d' }
    )
    
    // Removing password from retured user object
    const {password, ...info} = user._doc;

    res.status(200).json({...info, accessToken});
  } catch (error) {
    res.status(500).json(error.message);
  }
})


// Get User List
router.get('/users', async (req,res)=>{
  try {
    const users = await User.find();
    // Retrieving only the userernames as this is a public api
    user_id = users.map((obj)=>obj.username);
    res.status(200).json(user_id)
  } catch (error) {
    res.status(500).json(error.message);
  }
}) 


module.exports = router;