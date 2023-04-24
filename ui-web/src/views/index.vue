<template>
  <div>
    <el-button @click="requestMethod">请求</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import { AxiosInstance } from "axios";

export default defineComponent({
  name: "IndexPage",
  data() {
    return {};
  },
  setup() {
    const $http: any = inject<AxiosInstance>("$http");
    const requestMethod = () => {
      $http.get("http://127.0.0.1:3007/my/userinfo").then((res: any) => {
        console.log(res);
      });
    };
    return { requestMethod };
  },
});
</script>

<style lang="scss" scoped></style>
