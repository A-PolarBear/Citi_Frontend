import { notification } from "antd";
import axios from "axios";
<<<<<<< HEAD
import qs from "qs";
=======
>>>>>>> cff4adf59b816ba678c0334a4f09e91748803321

const serverConfig = {
  baseURL: "http://localhost:3000/mock", // 请求基础地址,可根据环境自定义
  useTokenAuthorization: false, // 是否开启 token 认证
};

// 创建 axios 请求实例
const instance = axios.create({
  baseURL: serverConfig.baseURL, // 基础请求地址
  timeout: 10000, // 请求超时设置
<<<<<<< HEAD
  withCredentials: false, // 跨域请求是否需要携带 cookie
=======
  withCredentials: true, // 跨域请求是否需要携带 cookie
>>>>>>> cff4adf59b816ba678c0334a4f09e91748803321
});

// 创建请求拦截
instance.interceptors.request.use(
  (config) => {
    // 如果开启 token 认证
    if (serverConfig.useTokenAuthorization) {
      config.headers["Authorization"] = localStorage.getItem("token"); // 请求头携带 token
    }
    // 设置请求头
    if (!config.headers["content-type"]) {
      // 如果没有设置请求头
      if (config.method === "post") {
        config.data = JSON.stringify(config.data); // 序列化,比如表单数据
      }
      config.headers["content-type"] = "application/json"; // 默认类型
    }
    console.log("请求配置", config);
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// 创建响应拦截
instance.interceptors.response.use(
  (res) => {
    let data = res.data;
    // 处理自己的业务逻辑，比如判断 token 是否过期等等
    // 代码块
    if(res.config.method==="post" || res.config.method==="put" ){
        notification.success({
            message:"Success",
            description:"",
            placement:"topRight",
        })
    }
    return data;
  },
  async (error) => {
    let message = "";
    if (error && error.response) {
      switch (error.response.status) {
        case 302:
          message = "URL redirection";
          break;
        case 400:
          message = "Bad Request";
          break;
        case 401:
          message = "Unauthorized";
          break;
        case 403:
          message = "Forbidden";
          break;
        case 404:
          message = `Not Found: ${error.response.config.url}`;
          break;
        case 408:
          message = "Request Timeout";
          break;
        case 409:
          message = "Conflict";
          break;
        case 500:
          message = "Internal Server Error";
          break;
        case 501:
          message = "Not Implemented";
          break;
        case 502:
          message = "Bad Gateway";
          break;
        case 503:
          message = "Something went wrong, please try again later(503)";
          break;
        case 504:
          message = "Something went wrong, please try again later(504)";
          break;
        case 505:
          message = "HTTP Version Not Supported";
          break;
        default:
          message = "Something went wrong, please try again later！";
          break;
      }
      notification.error({
        message: "Error",
        description: message,
        placement: "topRight",
      });
    }
    try {
      return await Promise.reject(message);
    } catch (message) {
      return console.log("error:", message);
    }
  }
);
export default instance;
