//导入数据库操作模块
const db = require("../db/index");

//添加我的医生的接口
exports.addMyDoctor = async (req, res) => {
  const sqlStr = "insert into my_doctor set ?";
  const { doctorid } = req.body;
  console.log(req.user.id);
  console.log(doctorid);
  db.query(sqlStr, { doctorid, userid: req.user.id }, function (err, results) {
    //执行 SQL 失败
    if (err) return res.cc(err);

    //执行成功。但是 影响行数不等于1
    if (results.affectedRows !== 1) return res.cc("添加我的医生失败！");

    // 将用户信息响应给客户端
    res.send({
      status: 0,
      message: "添加我的医生成功！",
    });
  });
};

// 查找医生列表
exports.getMyDoctorList = (req, res) => {
  // 根据用户的 id，查询用户的基本信息
  const sql = `select * from doctor where id in
  (select doctorId from my_doctor where userid=?) `;
  // 注意：req 对象上的 user 属性，是 Token 解析成功，express-jwt 中间件帮我们挂载上去的
  db.query(sql, req.user.id, (err, results) => {
    // 1. 执行 SQL 语句失败
    if (err) return res.cc(err);

    // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
    if (results.length == 0) return res.cc("获取我的医生列表失败!");

    // 3. 将用户信息响应给客户端
    res.send({
      status: 0,
      message: "获取我的医生列表成功!",
      data: results,
    });
  });
};

//取关我的医生的接口
exports.delMyDoctor = (req, res) => {
  console.log(req.user);
  const sqlStr = "delete from `my_doctor` where doctorid=? and userid=?";
  //地址的id
  const { doctorid } = req.body;
  db.query(sqlStr, [doctorid, req.user.id], function (err, results) {
    // 1. 执行 SQL 语句失败
    if (err) return res.cc(err);

    // 2. 将用户信息响应给客户端
    res.send({
      status: 0,
      message: "删除医生成功！",
    });
  });
};
