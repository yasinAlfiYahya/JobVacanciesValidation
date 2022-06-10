const conn = require("../config/dbConnection");

exports.ownHistory = (userid, res) => {
  conn.query(
    "SELECT UserID,input,output,created_at FROM result WHERE UserID = ? ORDER BY created_at DESC ",
    [userid],
    (err, result) => {
      if (err)
        return res.status(500).send({
          message: "Something Went Wrong",
          errorDetail: JSON.parse(JSON.stringify(err)),
        });
      const data = {
        error: 0,
        datas: JSON.parse(JSON.stringify(result)),
      };
      return res.status(200).send(data);
    }
  );
};

exports.allHistory = (res) => {
  conn.query(
    "SELECT UserID,input,output,created_at FROM result  ORDER BY created_at DESC ",
    (err, result) => {
      if (err)  throw err;
      const data = {
        error: 0,
        datas: JSON.parse(JSON.stringify(result)),
      };
      return res.status(200).send(data);
    }
  );
};

exports.insertParam = (data, res) => {
  conn.query(
    "INSERT INTO result (UserID,input) VALUES (?,?)",
    [data.userid, data.input],
    (err, result) => {
      if (err)
        return res.status(500).send({
          message: "Something went wrong!",
          errorDetail: JSON.parse(JSON.stringify(err.sqlMessage)),
        });
      return res.send({
        error: 0,
        message: "Succesfully added Input",
      });
    }
  );
};
