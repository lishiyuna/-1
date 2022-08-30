const db = require('../db/index')

exports.getPrescription = (req, res) => {
    if (req.query.id) {
        try {
            // console.log("@@@",req.query);
            const sql = 'SELECT * FROM `prescription` where  id=?';
            db.query(sql, req.query.id, function (error, results, fields) {
                if (error) throw error;
                res.send({
                    code: 1,
                    msg: '获取处方数据成功',
                    records: results
                })
            });
        } catch (error) {
            res.send({
                msg: '服务器出错了'
            })
        }
    } else {
        try {
            // console.log("@@@",req.query);
            const sql = 'SELECT * FROM `prescription`';
            db.query(sql, function (error, results, fields) {
                if (error) throw error;
                res.send({
                    code: 1,
                    msg: '获取处方数据成功',
                    records: results
                })
            });
        } catch (error) {
            res.send({
                msg: '服务器出错了'
            })
        }
    }
}