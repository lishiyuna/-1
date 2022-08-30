const db = require("../db/index");
exports.getDoctors = (req, res) => {
  if (req.query.id) {
    try {
      // console.log("@@@",req.query);
      const sql = "SELECT * FROM `doctor` where  id=?";
      db.query(sql, req.query.id, function (error, results, fields) {
        if (error) throw error;
        res.send({
          code: 1,
          msg: "获取医生数据成功",
          records: results,
        });
      });
    } catch (error) {
      res.send({
        msg: "服务器出错了",
      });
    }
  } else {
    try {
      // console.log("@@@",req.query);
      const sql = "SELECT * FROM `doctor` where groupId=8 ";
      db.query(sql, function (error, results, fields) {
        if (error) throw error;
        res.send({
          code: 1,
          msg: "获取医生数据成功",
          records: results,
        });
      });
    } catch (error) {
      res.send({
        msg: "服务器出错了",
      });
    }
  }
};
exports.getDoct = (req, res) => {
  //定义分类查询的sql语句
  const sql = " SELECT * FROM  `doctor` where groupId = ?";
  //定义
  db.query(sql, req.query.groupId, (err, result) => {
    if (err) return res.cc(err);
    res.send({
      status: 0,
      message: "成功",
      data: result,
    });
  });
};
//删除接口
exports.getdelete = (req, res) => {
  //定义分类查询的sql语句
  const sql = "delete from `doctor` where id= ?";
  //定义
  db.query(sql, req.body.id, (err, result) => {
    if (err) return res.cc(err);
    res.send({
      status: 0,
      message: "成功",
      data: result,
    });
  });
};
//新增接口
exports.newdoctor = (req, res) => {
  const { filename } = req.file;
  console.log(filename);
  const artcaturl = `http://127.0.0.1:3007/${filename}`;
  const { team, department, position, onlineTime, unit, desc1, groupId } =
    req.body;
  //console.log(team, department, position,  onlineTime, unit, desc1);
  const start =
    "insert into `doctor` (team, department, position, onlineTime, unit, desc1,groupId,photo) values (?,?,?,?,?,?,?,?)";
  //定义
  db.query(
    start,
    [team, department, position, onlineTime, unit, desc1, groupId, artcaturl],
    (err, result) => {
      if (err) return res.cc(err);
      res.send({
        status: 0,
        message: "成功",
        data: result,
      });
    }
  );
};

//根据id获取医生信息
exports.iddoctor = (req, res) => {
  //定义分类查询的sql语句
  const sql = " SELECT * FROM  `doctor` where id = ?";
  //定义
  console.log(req.query.id);
  db.query(sql, req.query.id, (err, result) => {
    if (err) return res.cc(err);
    res.send({
      status: 0,
      message: "成功",
      data: result,
    });
  });
};
//修改医生信息
exports.setdoctor = (req, res) => {
  //定义分类查询的sql语句
  const { filename } = req.file;
  const lbtUrl = `http://127.0.0.1:3007/${filename}`;
  const { team, department, position, onlineTime, unit, desc1, id } =
    req.body;
  //console.log(team, department, position, photo, onlineTime, unit, desc1,id);
  const start =
    "update `doctor` set team = ? , department = ? , position = ? , photo = ? , onlineTime = ?, unit = ?,desc1 = ? where id=? ";
  //定义
  db.query(
    start,
    [team, department, position, lbtUrl, onlineTime, unit, desc1, id],
    (err, result) => {
      if (err) return res.cc(err);
      res.send({
        status: 0,
        message: "成功",
        data: result,
      });
    }
  );
};
