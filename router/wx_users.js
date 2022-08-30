const express = require("express");
//创建路由对象
const router = express.Router();

//导入微信用户路由处理函数对应的模块
const wx_user_handler = require("../router_handler/wx_users");

//微信一键登录
router.get("/wxlogin",wx_user_handler.wxlogin)


module.exports = router;