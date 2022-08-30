const express = require("express");
const router = express.Router();
const upload = require("../utils/liad");
const doctor_handler = require("../router_handler/doctor");
//获取groups的全部信息
router.get("/doctors", doctor_handler.getDoctors);

router.get("/getDoct", doctor_handler.getDoct);
//删除groups里面的信息·
router.delete("/getdelete", doctor_handler.getdelete);
//修改内容
router.post("/setdoctor",upload.single("photo"),doctor_handler.setdoctor);
//根据id获取医生信息
router.get("/iddoctor", doctor_handler.iddoctor);
//新增
router.post("/newdoctor",upload.single("photo"), doctor_handler.newdoctor);
// 向外共享路由对象
module.exports = router;