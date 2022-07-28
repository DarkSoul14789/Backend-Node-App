const router = require('express').Router();
const UserProfile = require('../models/UserProfile');
const User = require('../models/User');
const verify = require('../verifyToken');
const CryptoJs = require("crypto-js");

// Profile Edit
router.put('/:id', verify, async (req,res)=>{
  if(req.user.id === req.params.id){
    if(req.body.profilePic){
      try {
        const updatedProfile = await UserProfile.findOneAndUpdate(
          { user: req.params.id },
          { $set: {"profilePic": req.body.profilePic} },
          { new: true }
        );
        const {profilePic,...info} = req.body;

        if(req.body.password){
          req.body.password = CryptoJs.AES.encrypt(req.body.password, process.env.CRYPTO_KEY).toString()
        }  

        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          { $set: info },
          { new: true }
        );
        res.status(200).json({updatedUser,updatedProfile});
      } catch (error) {
        res.status(500).json(error.message);
      }
    }

    
    // Update password if body contains password
    if(req.body.password){
      req.body.password = CryptoJs.AES.encrypt(req.body.password, process.env.CRYPTO_KEY).toString()
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }else{
    res.status(403).json("You can only update your account.");
  }
});

module.exports = router;