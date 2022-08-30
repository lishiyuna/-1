//导入数据库操作模块
const db = require("../db/index");

//编辑微信用户的基本信息
exports.editwxuserinfo = (req, res) => {
  const { name, tel, danwei, zhiwei, other } = req.body;
  const sqlStr =
    "update wx_users set name=?,tel=?,danwei=?,zhiwei=?,other=? where id=?";

  db.query(
    sqlStr,
    [name, tel, danwei, zhiwei, other,req.user.id],
    function (err, results) {
      //执行 SQL 失败
      if (err) return res.cc(err);

      //执行成功。但是 影响行数不等于1
      if (results.affectedRows !== 1) return res.cc("更改信息失败！");

      // 将用户信息响应给客户端
      res.send({
        status: 0,
        message: "更改信息成功！",
      });
    }
  );
};

//获取用户的信息
exports.getwxuserinfo = (req, res) => {
  const sqlStr = `select name, tel, danwei, zhiwei,other from wx_users where id=?`;

  db.query(sqlStr, req.user.id, function (err, results) {
    // 1. 执行 SQL 语句失败
    if (err) return res.cc(err);

    // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
    if (results.length !== 1) return res.cc("获取用户信息失败！");

    // 3. 将用户信息响应给客户端
    res.send({
      status: 0,
      message: "获取用户基本信息成功！",
      data: results[0],
    });
  });
};
