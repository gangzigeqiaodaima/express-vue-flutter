
/**
 * 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
 */

const jwt = require('jsonwebtoken');
const config = require("../config");
const db = require("../db/index");
// 验证数据库是否连接成功，如果打印出[ RowDataPacket { '1': 1 } ]则表示连接成功
// db.query(`select 1`, (err, result) => {
//     console.log(result);
// });

/**
 * 用户注册的处理函数 
 */
exports.reguser = (req, res) => {
    // 接受数据
    const userinfo = req.body;
    // 判断数据是否合法
    if (!userinfo.username || !userinfo.password) {
        return res.cc('用户名或密码不能为空！');
    }

    // 定义查询username的sql语句
    const sqlstr = `select * from ev_users where username=?`;
    // 执行查询sql语句
    db.query(sqlstr, [userinfo.username], (err, result) => {
        // 执行sql语句失败
        if (err) {
            return res.cc(err);
        }
        // 用户被占用
        if (result.length > 0) {
            return res.cc('用户名被占用，请更换其它用户名！');
        }

        // 定义新增用户的sql语句
        const addUserSql = `insert into ev_users set ?`;
        // 执行新增用户的操作
        db.query(addUserSql, {username: userinfo.username, password: userinfo.password}, (adderr, addresult) => {
            if (adderr) {
                return res.cc(adderr);
            }
            if (addresult.affectedRows != 1) {
                return res.cc('注册用户失败，请稍后重试');
            }
            res.send({
                status: 0,
                message: '注册成功'  
            });
        });
    });
}

/**
 * 登录的处理函数
 */
exports.login =  (req, res) => {
    const userinfo = req.body;
    console.log(userinfo);
    if (!userinfo.password || !userinfo.username) {
        return res.cc("用户名或密码不能为空！");
    }
    const searchSqlStr = `select * from ev_users where username=?`;
    db.query(searchSqlStr, [userinfo.username], (err, result) => {
        // 执行sql语句失败
        if (err) {
            return res.cc(err)
        }
        if (result.length != 1) {
            return res.cc("登录失败，未查询到该用户名");
        }
        // 此处不需要验证用户名了，因为如果用户名不正确，根本不可能查出数据
        // if (result[0].username != userinfo.username) {
        //     return res.cc("用户名不正确");
        // }
        if (result[0].password != userinfo.password) {
            return res.cc("密码不正确")
        }
        // 剔除掉用户的密码和头像信息
        const user = {...result[0], password: '', user_pic: ''};
        // 生成Token字符串
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {
            expiresIn: '10h', // token有效期为10小时
            algorithm: 'HS256'
        })
        res.send({
            status: 0,
            message: '登录成功',
            // 为了方便客户端使用Token，在服务器端直接拼上Bearer的前缀,因为使用express-jwt进行token验证的时候，其规定的前端token格式是：Bearer + token
            // 注意：Bearer和Token之间有个空格
            token: `Bearer ${tokenStr}`
        })
    })
}