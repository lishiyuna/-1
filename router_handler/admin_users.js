//导入数据库操作模块
const db = require("../db/index");

//获取用户的信息
exports.getwxusers = (req, res) => {
  const sqlStr = `select id, name, tel, danwei, zhiwei, other from wx_users`;

  db.query(sqlStr, function (err, results) {
    // 1. 执行 SQL 语句失败
    if (err) return res.cc(err);

    // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
    if (results.length == 0) return res.cc("获取用户失败！");

    // 3. 将用户信息响应给客户端
    res.send({
      status: 0,
      message: "获取用户成功！",
      data: results,
    });
  });
};

//获取用户的信息
exports.getAwxusers = (req, res) => {
  const sqlStr = `select id, name, tel, danwei, zhiwei, other from wx_users where id=?`;

  db.query(sqlStr, req.query.id, function (err, results) {
    // 1. 执行 SQL 语句失败
    if (err) return res.cc(err);

    // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
    if (results.length == 0) return res.cc("获取用户失败！");

    // 3. 将用户信息响应给客户端
    res.send({
      status: 0,
      message: "获取用户成功！",
      data: results[0],
    });
  });
};

// 删除用户的接口
exports.delWxusers = async (req, res) => {
  console.log(req.user);
  const sqlStr = "delete from `wx_users` where id= ?";
  //地址的id
  const { id } = req.body;
  db.query(sqlStr, id, function (err, results) {
    // 1. 执行 SQL 语句失败
    if (err) return res.cc(err);

    // 2. 将用户信息响应给客户端
    res.send({
      status: 0,
      message: "删除成功！",
    });
  });
};
