const express = require("express");
const cors = require("cors");
var { expressjwt } = require("express-jwt");
// var { expressjwt: jwt } = require("express-jwt");
const userRouter = require("./router/user");
const userInfoRouter = require("./router/userinfo");
// 错误信息的结果返回
const failInfoSend = require("./middleware/failInfoSend");
// 全局错误捕获
const error = require("./middleware/error");
const config = require("./config");

// 创建express服务器实例
const app = express();

// 配置cors跨域
app.use(cors());

// 配置解析application/json格式的数据的中间件
app.use(express.json());
// 配置接卸application/x-www-form-urleconded格式的表单数据的中间件
app.use(express.urlencoded({ extended: false }));

// 处理错误信息的结果返回
app.use(failInfoSend);

// 配置解析token的中间件
// .unless指定哪些接口不需要进行token的身份验证，下边表示不需要对路径中含有/aip/的接口进行身份验证
app.use(expressjwt({secret: config.jwtSecretKey,algorithms: ["HS256"]}).unless({ path: [/^\/api\//] }));

// 注册用户路由模块
app.use("/api", userRouter);

// 注册用户信息路由模块
app.use("/my", userInfoRouter);

// 注册全局错误处理中间件
app.use(error);

// 调用app.listen方法，指定端口号并启动web服务器
app.listen(3007, () => {
  console.log(`express server is running at http://127.0.0.1:3007`);
});
