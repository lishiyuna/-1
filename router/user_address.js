const express = require("express");
//创建路由对象
const router = express.Router();
//导入用户路由处理函数对应的模块
const {
  getUserAddress,
  delUserAddress,
  editUserAddress,
  addUserAddress,
  getProvinces,
  getCities,
  getAreas,
  getAnAddress
} = require("../router_handler/user_address");

//获取用户地址
router.get("/useraddress", getUserAddress);

//获取一条用户地址
router.get("/anaddress", getAnAddress);

//删除用户地址
router.delete("/deluseraddress", delUserAddress);

//编辑用户地址
router.post("/edituseraddress", editUserAddress);

//添加用户地址
router.post("/adduseraddress", addUserAddress);

//获取省地址
router.get("/getprovinces", getProvinces);

//获取市地址
router.get("/getcities", getCities);

//获取县区地址
router.get("/getareas", getAreas);
module.exports = router;
