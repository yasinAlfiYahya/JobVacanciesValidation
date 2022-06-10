const express = require("express");
const router = express.Router();
const UserModel = require("../model/User.model");
const { verifyToken } = require("../auth/verify");
const { route } = require("express/lib/application");
const ImageModel = require('../model/image.model')



router.post("/register", (req, res) => {
  const data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  UserModel.register(data, res);
});

router.post("/login", (req, res) => {
  const data = {
    email: req.body.email,
    password: req.body.password,
  };
  UserModel.login(data, res);
});

router.post("/bio", verifyToken, (req, res) => {
  const data = {
    userid: req.body.userid,
    name: req.body.name,
    birthday: req.body.birthday,
    nation: req.body.nation,
    phonenumber : req.body.phonenumber
  };
  UserModel.updateBio(data, req,res);
});



router.get("/bio", verifyToken, (req, res) => {
  UserModel.getBio(req,res);
});



module.exports = router;
