const joi = require('joi');

const error = (err, req, res, next) => {
    // 使用joi库进行信息验证，如果验证失败，则返回错误信息
    if (err instanceof joi.ValidationError) {
        return res.cc(err);
    }

    // 捕获身份认证的错误
    if (err.name == 'UnauthorizedError') {
        return res.cc('身份认证失败');
    }

    res.cc(err)
}

module.exports = error;