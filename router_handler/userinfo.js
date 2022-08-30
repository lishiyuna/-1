// 导入数据库操作模块
const db = require("../db/index");

//导入处理密码的模块
const bcrypt = require("bcryptjs");

// 获取用户基本信息的函数
exports.getUserInfo = (req, res) => {
  console.log(req.user);
  // 根据用户的 id，查询用户的基本信息
  const sql = `select id, username, nickname, email, user_pic from ev_users where id=?`;
  // 注意：req 对象上的 user 属性，是 Token 解析成功，express-jwt 中间件帮我们挂载上去的
  db.query(sql, req.user.id, (err, results) => {
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

//更新用户基本信息的处理函数
exports.updateUserInfo = (req, res) => {
  //定义待执行的 SQL 语句
  const sql = "update ev_users set ? where id = ?";

  //调用 db.query() 执行sQl 语句并传递参数
  db.query(sql, [req.body, req.user.id], (err, results) => {
    //执行失败
    if (err) return res.cc(err);
    //执行成功。但是 影响行数不等于1
    if (results.affectedRows !== 1) return res.cc("更新用户基本信息失败！");
    res.cc("更新用户信息成功！", 0);
  });
};

//更新用户密码的处理函数
exports.updatePassword = (req, res) => {
  //根据id查询用户的信息
  const sql = "select * from ev_users where id = ?";

  //执行根据id查询用户的信息的sql语句
  db.query(sql, req.user.id, (err, results) => {
    //执行 SQL 失败
    if (err) return res.cc(err);

    //执行 SQL 成功。但是 影响行数不等于1
    if (results.length !== 1) return res.cc("用户不存在！");

    //判断用户输入的旧密码是否正确
    const compareResult = bcrypt.compareSync(
      req.body.oldPwd,
      results[0].password
    );

    if (!compareResult) return res.cc("原密码错误");

    //定义更新密的 sql 语句
    const sql = "update ev_users set password=? where id=?";

    // 对新密码进行加密处理
    const newPwd = bcrypt.hashSync(req.body.newPwd, 10);

    //调用 db.query() 执行 sql 语句
    db.query(sql, [newPwd, req.user.id], (err, results) => {
      //执行 SQL 失败
      if (err) return res.cc(err);

      //执行成功。但是 影响行数不等于1
      if (results.affectedRows !== 1) return res.cc("更改密码失败！");

      //成功
      res.cc("更改密码成功！", 0);
    });
  });
};

//更新用户头像的处理函数
exports.updateAvatar = (req, res) => {
  console.log("文件上传", req.file);

  //定义更新用户头像的 sql 语句
  const sql = "update ev_users set user_pic=? where id=?";

  //拿到文件名称设置文件路径
  const { filename } = req.file;
  const avatarUrl = `http://127.0.0.1:3007/${filename}`;

  //调用 db.query() 执行sql语句，更新对应用户的头像
  db.query(sql, [avatarUrl, req.user.id], (err, results) => {
    //执行 SQL 失败
    if (err) return res.cc(err);

    //执行 SQL 成功但是 影响行数不等于1
    if (results.affectedRows !== 1) return res.cc("更换头像失败！");

    //成功
    res.cc("更换头像成功！", 0);
  });
};
