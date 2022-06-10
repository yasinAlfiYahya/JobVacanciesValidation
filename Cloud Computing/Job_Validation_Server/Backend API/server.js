const express = require('express');

const server = express();
const port = process.env.PORT || 8080;
const userRouter = require('./src/controller/user.controller');
const cors = require('cors')
const taskRouter = require('./src/controller/task.controller')

const Multer = require('multer')

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

server.use(multer.single('file'))

server.use(cors());
server.use(express.urlencoded({extended : false}));
server.use(express.json())
server.use('/v1/user' , userRouter)
server.use('/v1/user' , taskRouter)
server.use('*',(req,res) =>{
    res.status(400).send({message : 'Page Not Found'}).end();
})



server.listen(port, () => console.log(`Server Running at port ${port}`));
