//导入数据库操作模块
const db = require("../db/index");

//导入 bcryptjs 密码加密包
const bcrypt = require("bcryptjs");

//导入生成 Token 的包
const jwt = require("jsonwebtoken");

//导入全局配置的文件
const config = require("../config");

//注册新用户的处理函数
exports.regUser = (req, res) => {
  //获取用户端提交到服务器额度用户信息
  const userinfo = req.body;

  //对表单中的数据， 进行合法性判断（判断是否为空）
  //   if (!userinfo.username || !userinfo.password) {
  //     return res.cc("用户名或密码不合法！");
  //   }

  //定义sqle 语句， 查询用户名是否被占用
  const sqlStr = "select * from ev_users where username=?";

  db.query(sqlStr, userinfo.username, (err, results) => {
    //执行 SQL 语句失败
    if (err) return res.cc(err);

    //判断用户名是否被占用
    if (results.length > 0) {
      return res.cc("用户名被占用，请更换其他用户名！");
    }

    //TODO 用户名可以被使用 调用bcrypt.hashSync()方法对密码进行加密
    userinfo.password = bcrypt.hashSync(userinfo.password, 10);

    //定义插入新用户的 sql 语句
    const sql = "insert into ev_users set ?";

    db.query(
      sql,
      { username: userinfo.username, password: userinfo.password },
      (err, results) => {
        //判断sql 语句是否执行成功
        if (err) return res.cc(err);

        //判断影响行数是否为1
        if (results.affectedRows !== 1)
          return res.cc("注册用户失败，请稍后再试");

        //注册用户成功
        // res.send({ status: 0, message: "注册成功" });
        res.cc("注册成功", 0);
      }
    );
  });
};

//登录的处理函数
exports.login = (req, res) => {
  //接收表单数据
  const userinfo = req.body;

  //定义 SQL 语句
  const sql = "select * from ev_users where username=?";

  //执行 SQL 语句，根据用户名查询用户信息
  db.query(sql, userinfo.username, (err, results) => {
    const menusql = "select * from `admin_menu`";

    //执行 SQL 失败
    if (err) return res.cc(err);

    //执行 SQL 成功，但是获取到的数据条数不等于1
    if (results.length !== 1) return res.cc("用户不存在，请先注册！");

    //判断密码是否正确 对比数据库和提交的密码返回一个波尔值
    const compareResult = bcrypt.compareSync(
      userinfo.password,
      results[0].password
    );
    if (!compareResult) return res.cc("密码错误，请重新输入！");

    // 在服务器端生成 Token 的字符串
    const user = { ...results[0], password: "", user_pic: "" };

    //对用户的信息进行加密，生成 token 字符串
    const tokenStr = jwt.sign(user, config.jwtSecretKey, {
      expiresIn: config.expiresIn,
      algorithm: "HS256",
    });

    db.query(menusql, (err, results) => {
      //执行 SQL 失败
      if (err) return res.cc(err);

      //执行 SQL 成功，但是获取到的数据条数不等于1
      if (results.length == 0) return res.cc("获取菜单失败！");

      // 递归将扁平化数组转成树形数组
      function nest(pid, arr) {
        return arr
          .filter((item) => item.pid === pid)
          .map((item) => ({ ...item, children: nest(item.id, arr) }));
      }
      console.log(nest("0", results));

      res.send({
        status: 0,
        msg: "登录成功！",
        token: "Bearer " + tokenStr,
        menus: nest(0, results),
        data:user
      });
    });

    //调用 res.send() 将 Token 响应给前端
  });
};
