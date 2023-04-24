const express = require('express');
const userInfoHandler = require("../router_handler/userinfo");
const expressJoi = require("@escook/express-joi");
const { update_userinfo_schema, update_pwd_schema, updata_avatar_schema } = require("../schema/user");

const router = express.Router();

/* 获取用户信息 */
router.get("/userinfo", userInfoHandler.getUserInfo);

/* 更新用户信息 */
router.post("/userinfo", expressJoi(update_userinfo_schema),  userInfoHandler.updateUserInfo);

/* 更新密码 */
router.post("/updatepwd", expressJoi(update_pwd_schema), userInfoHandler.updatepwd);

/* 更新用户头像 */
router.post("/update/avatar", expressJoi(updata_avatar_schema), userInfoHandler.updateAvatar)

module.exports = router;