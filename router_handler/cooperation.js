const db = require('../db/index')

exports.getCooperation = (req, res) => {
    if (req.query.id) {
        try {
            const sql = 'SELECT * FROM `cooperation` where id=?';
            db.query(sql, req.query.id, function (error, results, fields) {
                if (error) throw error;
                res.send({
                    code: 1,
                    msg: '获取医院数据成功',
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
            const sql = 'SELECT * FROM `cooperation`';
            db.query(sql, function (error, results, fields) {
                if (error) throw error;
                res.send({
                    code: 1,
                    msg: '获取医院数据成功',
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

