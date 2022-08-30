const express = require('express');

const router = express.Router()

const prescription_handler = require("../router_handler/prescription")

//获取groups的全部信息
router.get("/prescription",prescription_handler.getPrescription);

// 向外共享路由对象
module.exports = router;
