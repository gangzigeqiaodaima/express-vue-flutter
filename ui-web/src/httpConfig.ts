import axios from 'axios';

const instance = axios.create({
//   baseURL: import.meta.env.VITE_APP_AXIOS_BASE_URL
    baseURL: 'http://127.0.0.1:3007',
    timeout: 10000  
})

/**
 * 请求拦截
 */
instance.interceptors.request.use((config) => {
  const {url, headers} = config;
  // 排除掉注册和登录接口，其它接口请求时请求头添加token
  if (url?.indexOf("/api/") === -1) {
    // 为路径中为不包含/api/的接口的请求头添加token
    headers['Authorization'] = localStorage.getItem('token');
  }
  return {
    ...config,
    headers
  }
});

/**
 * 响应拦截
 */
instance.interceptors.response.use((res) => {
  const url = res.config.url;
  // 登录成功后，将token存储在localStorage中
  if (res.status == 200 && url?.indexOf("/api/login") !== -1 && res.data.token) {
    localStorage.setItem('token', res.data.token);
  }
  return res;
});

export default instance