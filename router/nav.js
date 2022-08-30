// const path=require('path')
const express = require("express");
const router = express.Router();
const upload = require("../utils/liad");
//导入文章分类的模块
const {
  load,
  lognav,
  table,
  delectinterface,
  Modifyarticle,
  article,
  allarticle
} = require("../router_handler/navvat");
router.get("/nav", lognav).post("/ipload", upload.array("avatar", 12), load);
router.post("/table", table);

//删除文章分类的模块
router.delete("/delectinterface", delectinterface);

//修改文章内容
router.post("/Modifyarticle", Modifyarticle);

//获取文章内容
router.get("/article", article);
router.get('/allarticle',allarticle)

router.get('/allarticle',allarticle)

module.exports = router;
