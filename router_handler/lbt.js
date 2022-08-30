const db = require('../db/index')

//获取轮播图
exports.getlbts = (req, res) => {
    if(req.query.id){
        try {
            const sql = 'SELECT * FROM `lbt` where id =?';
            db.query(sql, req.query.id,function (error, results) {
                if (error) throw error;
                res.send({
                    code:1,
                    msg:"获取轮播图数据成功",
                    records: results,
                })
            });
        } catch (error) {
            res.send({
                msg:'服务器出错了'
            })
        }
    }else{
        try {
            const sql = 'SELECT * FROM `lbt`';
            db.query(sql, function (error, results) {
                if (error) throw error;
                res.send({
                    code:1,
                    msg:"获取轮播图数据成功",
                    records: results,
                })
            });
        } catch (error) {
            res.send({
                msg:'服务器出错了'
            })
        }
    }

}
//添加轮播图的处理函数
exports.addLbt = (req, res) => {
    console.log("@@@",req.body)
    const { filename } = req.file;
    const lbtUrl = `http://127.0.0.1:3007/${filename}`;
    try {
        const sql = 'insert into lbt (name,img) values (?,?)';
        db.query(sql, [req.body.name,lbtUrl],function (error, results) {
            if (error) throw error;
            res.send({
                code:1,
                msg:"添加轮播图数据成功",
                records: results,
            })
        });
    } catch (error) {
        res.send({
            msg:'服务器出错了'
        })
    }
};
//编辑轮播图的处理函数
exports.editLbt = (req, res) => {
    const { filename } = req.file;
    const lbtUrl = `http://127.0.0.1:3007/${filename}`;
    try {
        const sql = 'update lbt set name=?,img=? where id = ?';
        db.query(sql, [req.body.name,lbtUrl,req.body.id],function (error, results) {
            if (error) throw error;
            res.send({
                code:1,
                msg:"修改轮播图数据成功",
                records: results,
            })
        });
    } catch (error) {
        res.send({
            msg:'服务器出错了'
        })
    }
};
//删除轮播图的处理函数
exports.deleteLbt = (req, res) => {
    const {id} = req.body
    try {
        const sql = 'delete from lbt where id = ?';
        db.query(sql, id,function (error, results) {
            if (error) throw error;
            res.send({
                code:1,
                msg:"删除轮播图数据成功",
                records: results,
            })
        });
    } catch (error) {
        res.send({
            msg:'服务器出错了'
        })
    }
};
