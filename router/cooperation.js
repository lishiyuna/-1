const express = require('express');

const router = express.Router()

const cooperation_handler = require("../router_handler/cooperation")

//获取groups的全部信息
router.get("/cooperation",cooperation_handler.getCooperation);

// 向外共享路由对象
module.exports = router;
