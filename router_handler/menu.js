const db = require('../db/index')

exports.getMenus = (req, res) => {
    try {
        const sql = 'SELECT * FROM `index_menu`';
        db.query(sql, function (error, results, fields) {
            if (error) throw error;
            res.send({
                code:1,
                msg:'获取菜单数据成功',
                records: results
            })
        });
    } catch (error) {
        res.send({
            msg:'服务器出错了'
        })
    }
}