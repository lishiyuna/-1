// 导入 express
const express = require("express");

// 创建路由对象
const router = express.Router();

// 导入用户信息的处理函数模块
const { getwxusers, delWxusers ,getAwxusers} = require("../router_handler/admin_users");

// 获取用户列表
router.get("/getwxusers", getwxusers);

// 获取一个用户
router.get("/getawxusers", getAwxusers);

// 删除用户信息
router.delete("/delwxusers", delWxusers);

// 向外共享路由对象
module.exports = router;
