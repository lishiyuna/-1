// 导入 express
const express = require("express");

// 创建路由对象
const router = express.Router();

// 导入用户信息的处理函数模块
const { editwxuserinfo, getwxuserinfo } = require("../router_handler/wx_userinfo");


//微信更改用户信息
router.post("/editwxuserinfo", editwxuserinfo);

// 获取用户信息
router.get("/getwxuserinfo", getwxuserinfo);

// 向外共享路由对象
module.exports = router;
