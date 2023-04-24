/**
 * 该中间件是用来返回处理错误的结果信息的
 */
const failInfoSend = (req, res, next) => {
    res.cc = function(err, status = 1) {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next();
}

module.exports = failInfoSend;