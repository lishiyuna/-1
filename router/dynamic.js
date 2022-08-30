const express = require('express');

const router = express.Router()

const dynamic_handler = require("../router_handler/dynamic")

//获取groups的全部信息
router.get("/dynamic",dynamic_handler.getDynamic);

// 向外共享路由对象
module.exports = router;
