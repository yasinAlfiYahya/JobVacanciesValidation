const express = require('express')
const router = express.Router();
const { verifyToken } = require("../auth/verify");
const TaskModel = require('../model/Task.model')



router.get("/history/:userid",verifyToken, (req, res) => {
    const userid = req.params.userid;
    TaskModel.ownHistory(userid, res);
  });
  
  router.get("/history", verifyToken,(req, res) => {
    TaskModel.allHistory(res);
  });

  router.post('/inputargumen', verifyToken,(req,res,)=>{
    const data = {
      userid : req.body.userid,
      input : req.body.input,
    }
      TaskModel.insertParam(data,res);  
  })

 


module.exports = router;