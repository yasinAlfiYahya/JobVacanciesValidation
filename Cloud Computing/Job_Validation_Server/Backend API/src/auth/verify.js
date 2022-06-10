const { verify } = require("jsonwebtoken");
module.exports = {
  verifyToken: (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
        token = token.slice(7);
        verify(token, process.env.SECRET_KEY, (err, decode)=>{
            if(err){
                res.status(401).send({
                    error  :1,
                    message: 'Invalid Token'
                })
            }
            else{
                next()
            }
        })
    }
    else{
        return res.status(403).send({
            error : 1,
            message : 'Access Denied! Unauthorized user'
        })
    }
  },
};