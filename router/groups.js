const express = require('express');

const router = express.Router()

const groups_handler = require("../router_handler/groups")

//获取groups的全部信息
router.get("/groups",groups_handler.getGroups);
// 向groups中添加一条信息
router.post("/addGroup",groups_handler.addGroup)
// 向groups中修改一条信息
router.put("/updateGroup",groups_handler.updateGroup)
// 从groups中删除一条信息
router.delete("/delGroup",groups_handler.delGroup)

// 向外共享路由对象
module.exports = router;
