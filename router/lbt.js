const express = require('express');

const router = express.Router()
//导入上传文件的中间件
const upload = require("../utils/upload");
const lbt_handler = require("../router_handler/lbt")

//获取lbt的全部信息
router.get("/lbts",lbt_handler.getlbts);

//添加轮播图
router.post("/lbtadd",upload.single("img"),lbt_handler.addLbt);

//编辑轮播图
router.put("/lbtedit",upload.single("img"),lbt_handler.editLbt);

//删除轮播图
router.delete("/lbtdelete",lbt_handler.deleteLbt);
// 向外共享路由对象
module.exports = router;
