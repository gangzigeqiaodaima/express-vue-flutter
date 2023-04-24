const db = require("../db/index");

/**
 * ‘获取用户的基本信息’的处理函数
 */
exports.getUserInfo = (req, res) => {
    // 定义根据用户id查询详情的sql语句
    const sqlStr = `select id, username, nickname, email, user_pic from ev_users where id=?`;

    // req对象上的auth属性，是Token解析成功，express-jwt中间件帮我们挂载上去的
    db.query(sqlStr, req.auth.id, (err, results) => {

        // sql语句执行失败
        if (err) { return res.cc(err);}

        // 执行sql语句成功，但是查询到的结果条数不等于1
        if (results.length != 1) {
            return res.cc("获取用户信息失败！");
        }

        // 查询成功，返回用户信息
        res.send({
            status: 0,
            message: '获取用户基本信息成功',
            data: results[0]
        });
    });
}

/* ‘更新用户的基本信息’的处理函数 */
exports.updateUserInfo = (req, res) => {

    // 定义更新用户信息的sql语句
    const updateSqlStr = `update ev_users set ? where id=?`;

    // 执行更新语句
    db.query(updateSqlStr, [req.body, req.body.id], (err, results) => {

        // sql语句执行失败
        if (err) {res.cc(err)};

        // 执行sql语句成功，但影响行数不为1
        if (results.affectedRows !== 1) {
            return res.cc("修改用户基本信息失败！")
        }

        // 更新成功
        res.send({
            status: 0,
            message: '用户信息更新成功',
            data: {}
        });

    });
}


/* ‘更新密码’的处理函数 */
exports.updatepwd = (req, res) => {
    const sqlStr = `select * from ev_users where id=?`;
    db.query(sqlStr, req.auth.id, (err, results) => {
        // sql语句执行失败
        if (err) { return res.cc(err) };

        if (results.length !== 1) {
            return res.cc("用户不存在！")
        }


        if (req.body.oldPwd != results[0].password) {
            return res.cc("原密码错误");
        }

        // 将新密码更新到数据库中
        const updatePasswordSqlStr = `update ev_users set password=? where id=?`;
        db.query(updatePasswordSqlStr, [req.body.newPwd, req.auth.id], (err, upresult) => {

            // sql语句执行失败
            if (err) {return res.cc(err)};

            if (upresult.affectedRows !== 1) { return res.cc('更新密码失败') };

            // 密码更新成功
            res.send({
                status: 0,
                message: '密码更新成功',
                data: {}
            })
        });

    });
}

/* ‘更新用户头像’的处理函数 */
exports.updateAvatar = (req, res) => {

   const sqlStr = `update ev_users set user_pic=? where id=?`;
   
   db.query(sqlStr, [req.body.avatar, req.auth.id], (err, result) => {

    // sql语句执行失败
     if (err) { res.cc(err) };

    //  执行SQL语句成功，但是影响行数不等于1
    if (result.affectedRows != 1) { res.cc('更新头像失败！') };

    res.send({
        status: 0,
        message: '头像更新成功!',
        data: {}
    });

   });
}