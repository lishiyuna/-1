// 导入数据库操作模块
const db = require("../db/index");
// 获取集团基本信息的函数
exports.getGroups = (req, res) => {
  try {
    const sql = 'SELECT * FROM `groups`';
    db.query(sql, function (error, results, fields) {
      if (error) throw error;
      res.send({
        code:1,
        msg:'获取成功',
        records: results,
      })
    });
  } catch (error) {
    console.log(error);
  }
};
// 添加一条集团基本信息的函数
exports.addGroup =  (req, res) => {
  try {
    const {groupName} = req.body
    const sql = 'insert into `groups` (groupName) values (?)' ;
    
    db.query(sql, groupName,function (error, results, fields) {
      if (error) throw error;
      res.status(200).send({
        msg:"添加成功"
      })
    });
  } catch (error) {
    console.log(error);
  }
};
// 修改一条集团基本信息的函数
exports.updateGroup =  (req, res) => {
  try {
    const {id,groupName} = req.body
    const sql = 'update `groups` set groupName=? where id=?' ;
    db.query(sql, [groupName,id],function (error, results, fields) {
      if (error) throw error;
      res.status(200).send({
        msg:"修改成功"
      })
    });
  } catch (error) {
    console.log(error);
  }
};
// 删除一条集团基本信息的函数
exports.delGroup =  (req, res) => {
  try {
    const {id} = req.body
    const sql = 'delete from `groups` where id =?' ;
    
    db.query(sql, id,function (error, results, fields) {
      if (error) throw error;
      res.status(200).send({
        msg:"删除成功"
      })
    });
  } catch (error) {
    console.log(error);
  }
};
