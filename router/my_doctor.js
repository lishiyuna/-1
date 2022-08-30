// 导入 express
const express = require("express");

// 创建路由对象
const router = express.Router();

// 导入我的医生处理函数模块
const {
  addMyDoctor,
  getMyDoctorList,
  delMyDoctor,
} = require("../router_handler/my_doctor");

// 获取医生列表
router.get("/getmydoctorlist", getMyDoctorList);

// 关注医生
router.post("/addmydoctor", addMyDoctor);

// 取消关注
router.delete("/delmydoctor", delMyDoctor);

// 向外共享路由对象
module.exports = router;
