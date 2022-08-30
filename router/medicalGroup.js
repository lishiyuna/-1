const express = require('express');

const router = express.Router()

const medicalGroup_handler = require("../router_handler/medicalGroup")

//获取groups的全部信息
router.get("/groupData",medicalGroup_handler.getGroupData);

// 向外共享路由对象
module.exports = router;
