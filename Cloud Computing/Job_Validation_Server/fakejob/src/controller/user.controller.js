const express = require("express");
const UserModel = require("../model/User.model");
const router = express.Router();
 const {verifyToken}= require('../auth/verify')

router.get('/getuser', (req,res) =>{
    UserModel.getuser(res)
});

router.post("/register", (req, res) => {
  const data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  UserModel.register(data,res)
});

router.post("/login", (req, res) => {
    const data = {
      email: req.body.email,
      password: req.body.password,
    };
    UserModel.login(data, res);
  });

router.post("/bio",verifyToken,(req,res) =>{
      const data = req.body.userid
    UserModel.getBio(data,res);
  })

router.patch("/bio",verifyToken, (req,res) =>{
    const data = {
        userid: req.body.userid,
        name: req.body.name,
        birthday: req.body.birthday,
        nation: req.body.nation,
        phonenumber : req.body.phonenumber
      };
      UserModel.updateBio(data, req,res);
})
  
module.exports = router;