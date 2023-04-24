const joi = require('joi');

/**
 * string()：值必须时字符串
 * alphanum(): 值只能包含a-zA-Z0-9的字符串
 * min(length): 最小长度
 * max(length): 最大长度
 * required(): 值时必填项，不能为undefined
 * pattern(正则表达式)：值必须符合正则表达式的规则
 * */

// 用户名的校验规则--下面两种写法等同
// const username = joi.string().alphanum().min(1).max(10).required();
const username = joi.string().pattern(/^[a-zA-Z0-9]{1,10}$/).required();

// 密码的校验规则--（6-12位的非空白符）
const password = joi.string().pattern(/^[\S]{6,12}$/).required();

// id的校验规则
const id = joi.number().integer().min(1).required();
// nickname的校验规则
const nickname = joi.string().required();
// email的验证规则
const email = joi.string().email().required();

// 头像的验证规则
// dataUri()指的是字符串数据格式为：data:image/png;base64,VE9PTUFOWVNFQ1JFVFM=
// 可以理解为图片是 base64 格式的数据
const avatar = joi.string().dataUri().required();

// 注册和登录表单的验证规则对象
exports.reg_login_schema = {
    body: {
        username,
        password
    }
}

// 验证规则对象--更新用户基本信息
exports.update_userinfo_schema = {
    body: {
        id,
        nickname,
        email
    }
}

// 验证规则对象--更新密码
exports.update_pwd_schema = {
    body: {
        oldPwd: password,
        newPwd: joi.not(joi.ref('oldPwd')).concat(password)
    }
}

// 验证规则--更新头像
exports.updata_avatar_schema = {
    body: {
        avatar
    }
}