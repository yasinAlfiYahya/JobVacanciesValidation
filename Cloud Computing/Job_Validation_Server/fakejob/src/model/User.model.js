const conn = require('../config/dbConnection')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const {uploadImage} = require('./image.model')


exports.getuser = (res)=>{
    conn.query('select * from users', (err,result) =>{
        return res.send(result)
    })
}

exports.register = async (data,res) =>{
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(data.password,salt);

    if (
        data.name === undefined ||
        data.email === undefined ||
        data.password === undefined ||
        data.name === "" ||
        data.email === "" ||
        data.password === ""
      ) {
        return res.status(400).send({
          error: 1,
          message: "Failed Register. Please fill name, email, and password",
        });
      }
    conn.query(
        `SELECT * FROM users WHERE LOWER(email) = ${conn.escape(data.email)}`,
        (err,result) =>{
            if(result.length) {
                return res.status(409).send({
                    error: 1,
                    message: "This user email is already in use!",
                  });
            }else {
                conn.query(
                    `INSERT INTO users (name, email, password) VALUES ('${
                      data.name
                    }', ${conn.escape(data.email)}, ${conn.escape(hashPassword)})`,
                    (err, result) => {
                      if (err) {
                        console.log(err);
                        return res.status(500).send({
                          error: 1,
                          message: err,
                        });
                      }
                      return res.status(201).send({
                        error: 0,
                        message: "Register Succesfully",
                      });
                    }
                  );
            }
        }
    )
}

exports.login = (data,res) =>{
    conn.query(
        `SELECT * FROM users WHERE email = ?`,
        [data.email],
        (err, result) => {
          if (err) {
            throw err;
          }
    
          if (!result.length) {
            return res.status(401).send({
              error: 1,
              message: "Email Not Found!",
            });
          }
    
          bcrypt.compare(data.password, result[0]["password"], (bErr, bResult) => {
            if (bErr) {
              throw err;
            }
    
            if (bResult) {
              result[0].password = undefined;
              const datas = JSON.parse(JSON.stringify(result[0]));
              const token = jwt.sign(
                { userid: datas.id, name: datas.name, email: datas.email },
                process.env.SECRET_KEY,
                { expiresIn: "1d" }
              );
    
              return res.send({
                error: 0,
                message: "Logged In!",
                userid: datas.UserID,
                token,
              });
            }
    
            return res.status(401).send({
              error: 1,
              message: "Wrong Password!",
            });
          });
        }
      );
}


exports.getBio = (data,res) =>{
    conn.query(
        "SELECT * FROM users where UserID = ?",
        [data],
        (err, result) => {
          if (err) return res.send(err)
          const data = JSON.parse(JSON.stringify(result[0]));
          return res.send({
            name: data.name,
            email : data.email,
            profilePhoto : data.ProfilePhoto,
            phonenumber : data.PhoneNumber,
            birthday : data.BirthDay,
            nation : data.Nation,
            updated_at : data.updated_at,
          })
        }
      );
}


exports.updateBio = async (data, req, res) =>{
    let imagePath;
    try {
       const myFile = req.file;
       imagePath = await uploadImage(myFile)
       
   } catch (error) {
       
   }
    finally{
    conn.query(
        "UPDATE users SET name = ?,ProfilePhoto = ? ,BirthDay = ? , Nation = ?, PhoneNumber = ?,updated_at = CURRENT_TIMESTAMP  WHERE UserID =?",
        [data.name, imagePath, data.birthday=== '' ? null : data.birthday, data.nation, data.phonenumber,data.userid],
        (err, result) => {
          if (err) return res.status(500).send({msg : err});
    
          return res.send({
            error: 0,
            message: "Update Succesfully",
          });
        }
      );
    }
}