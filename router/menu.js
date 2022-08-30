const express = require('express');

const router = express.Router()

const menus_handler = require("../router_handler/menu")

//获取groups的全部信息
router.get("/menus",menus_handler.getMenus);

// 向外共享路由对象
module.exports = router;
