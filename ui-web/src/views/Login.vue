<template>
  <div class="login-frame">
    <div class="login-content">
      <div class="login-txt">用户登录</div>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="90px"
        class="demo-ruleForm"
        :size="formSize"
        status-icon
      >
        <el-form-item label="用户名：" prop="username">
          <el-input v-model="ruleForm.username" />
        </el-form-item>
        <div style="height: 10px;"></div>
        <el-form-item label="密码：" prop="password">
          <el-input v-model="ruleForm.password" />
        </el-form-item>
        <div style="height: 10px;"></div>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
          <span class="goto-reguser">还没有账号？点击<a href="/regUser">注册</a></span>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, inject } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { useRouter } from 'vue-router';
import axios, { AxiosInstance } from "axios";

export default defineComponent({
  name: "LoginUser",
  setup() {
    const router = useRouter();
    const formSize = ref("default");
    const ruleFormRef = ref<FormInstance>();
    const ruleForm = reactive({
      username: "",
      password: ""
    });
    const $http:any = inject<AxiosInstance>('$http');

    const rules = reactive<FormRules>({
      username: [
        { required: true, message: "请输入用户名", trigger: "blur" },
        { min: 1, max: 10, message: "用户名的长度不能超过10个字符", trigger: "blur" }
      ],
      password: [
      { required: true, message: "请输入密码", trigger: "blur" },
      { min: 6, max: 12, message: "密码的长度介于6-12位之间", trigger: "blur" }
      ]
    });

    // 表单提交
    const submitForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      await formEl.validate((valid, fields) => {
        if (valid) {
          $http.post("/api/login", {
                username: 'lrg',
                password: '12121212'
            }).then((res:any) => {
              if (res.status === 200 && res.data.token) {
                // 跳转至首页
                router.push({
                  path: '/home/index'
                })
              }
            })
        } else {
          console.log("error submit!", fields);
        }
      });
    };

    // 重置页面数据
    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.resetFields();
    };

    return { formSize, ruleFormRef, ruleForm, rules, submitForm, resetForm};
  },
});
</script>

<style lang="scss" scoped>
// @import "@/styles.scss";
// .p-c {
//     color: $primary-color
// }
.login-frame {
  width: 100%;
  height: 100%;
  background-image: url(@/assets/login-bg.jpg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  div.login-content {
    width: 420px;
    padding: 20px 20px 0 10px;
    border-radius: 6px;
    background-color: rgba(0,0,0,0.2);
    
    div.login-txt {
      font-size: 20px;
      color: #ffffff;
      padding: 10px 0 30px 0;
      text-align: center;
    }
    .goto-reguser {
      color: #999999;
      font-size: 13px;
      text-align: right;
      padding-left: 20px;
      a {
        color: #69c22f;
        padding-left: 2px;
        text-decoration: none;
        
      }
    }
  }
}
</style>
