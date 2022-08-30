// 导入数据库操作模块
const db = require("../db/index");

// 获取用户基本地址的函数
exports.getUserAddress = (req, res) => {
  console.log(req.user);
  // 根据用户的 id，查询用户的基本信息
  const sql = `select * from user_address where pid=? order by id desc`;
  // select * from score where cno='3-105' order by degree,sno limit 3
  // 注意：req 对象上的 user 属性，是 Token 解析成功，express-jwt 中间件帮我们挂载上去的
  db.query(sql, req.user.id, (err, results) => {
    // 1. 执行 SQL 语句失败
    if (err) return res.cc(err);

    // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
    if (results.length == 0) return res.cc("获取用户地址失败！");

    // 3. 将用户信息响应给客户端
    res.send({
      status: 0,
      message: "获取用户地址成功！",
      data: results,
    });
  });
};


// 获取一条用户基本地址的函数
exports.getAnAddress = (req, res) => {
  // 根据用户的 id，查询用户的基本信息
  const sql = `select * from user_address where id=?`;
  // 注意：req 对象上的 user 属性，是 Token 解析成功，express-jwt 中间件帮我们挂载上去的
  db.query(sql, req.query.id, (err, results) => {
    // 1. 执行 SQL 语句失败
    if (err) return res.cc(err);

    // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
    if (results.length == 0) return res.cc("获取一条用户地址失败！");

    // 3. 将用户信息响应给客户端
    res.send({
      status: 0,
      message: "获取一条用户地址成功！",
      data: results,
    });
  });
};


//删除用户地址的接口
exports.delUserAddress = (req, res) => {
  console.log(req.user);
  const sqlStr = "delete from `user_address` where id= ?";
  //地址的id
  const { id } = req.body;
  db.query(sqlStr, id, function (err, results) {
    // 1. 执行 SQL 语句失败
    if (err) return res.cc(err);

    // 2. 将用户信息响应给客户端
    res.send({
      status: 0,
      message: "删除地址成功！",
    });
  });
};

//编辑用户地址的接口
exports.editUserAddress = async (req, res) => {
  const sqlStr =
    "update user_address set name=?,tel=?,address=?,mainaddress=? where id=?";
  const { id, name, tel, address, mainaddress } = req.body;
  db.query(
    sqlStr,
    [name, tel, address, mainaddress, id],
    function (err, results) {
      //执行 SQL 失败
      if (err) return res.cc(err);

      //执行成功。但是 影响行数不等于1
      if (results.affectedRows !== 1) return res.cc("编辑地址失败！");

      // 将用户信息响应给客户端
      res.send({
        status: 0,
        message: "编辑地址成功！",
      });
    }
  );
};

//添加用户地址的接口
exports.addUserAddress = async (req, res) => {
  const sqlStr = "insert into user_address set ?";
  const { name, tel, address, mainaddress } = req.body;
  db.query(
    sqlStr,
    { name, tel, address, mainaddress, pid: req.user.id },
    function (err, results) {
      //执行 SQL 失败
      if (err) return res.cc(err);

      //执行成功。但是 影响行数不等于1
      if (results.affectedRows !== 1) return res.cc("添加地址失败！");

      // 将用户信息响应给客户端
      res.send({
        status: 0,
        message: "添加地址成功！",
      });
    }
  );
};




//省市县三级联查
//查找省
exports.getProvinces = (req, res) => {
  // 根据用户的 id，查询用户的基本信息
  const sql = `select * from provinces`;
  // 注意：req 对象上的 user 属性，是 Token 解析成功，express-jwt 中间件帮我们挂载上去的
  db.query(sql, req.query.id, (err, results) => {
    // 1. 执行 SQL 语句失败
    if (err) return res.cc(err);

    // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
    if (results.length == 0) return res.cc("获取省地址失败！");

    // 3. 将用户信息响应给客户端
    res.send({
      status: 0,
      message: "获取省地址成功！",
      data: results,
    });
  });
};

//查找市
exports.getCities = (req, res) => {
  // 根据用户的 id，查询用户的基本信息
  const sql = `select * from cities where provinceid=?`;
  // 注意：req 对象上的 user 属性，是 Token 解析成功，express-jwt 中间件帮我们挂载上去的
  db.query(sql, req.query.provinceid, (err, results) => {
    // 1. 执行 SQL 语句失败
    if (err) return res.cc(err);

    // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
    if (results.length == 0) return res.cc("获取市地址失败！");

    // 3. 将用户信息响应给客户端
    res.send({
      status: 0,
      message: "获取市地址成功！",
      data: results,
    });
  });
};

//查找县区
exports.getAreas = (req, res) => {

  // 根据用户的 id，查询用户的基本信息
  const sql = `select * from areas where cityid=?`;

  db.query(sql, req.query.cityid, (err, results) => {
    // 1. 执行 SQL 语句失败
    if (err) return res.cc(err);

    // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
    if (results.length == 0) return res.cc("获取县区地址失败！");

    // 3. 将用户信息响应给客户端
    res.send({
      status: 0,
      message: "获取县区地址成功！",
      data: results,
    });
  });
};
