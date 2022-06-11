const express = require("express");
const app = express();
const userRouter = require('./src/controller/user.controller')
const taskRouter = require('./src/controller/task.controller')
const cors = require('cors')
const port = 8080;
const Multer = require('multer')

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

app.use(multer.single('file'))
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/v1/user/" , userRouter)
app.use("/v1/user/" , taskRouter)
app.use("*", (req, res) => {
  res.status(400).send({ message: "Page Not Found" }).end();
});

app.listen(port, () => console.log(`Server Running at port ${port}`));
