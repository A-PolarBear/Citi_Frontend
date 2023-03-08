import { notification } from "antd";
import  {Cookies} from "react-cookie";
import axios from "axios";


export const cookie = new Cookies();

const serverConfig = {
  // baseURL: "http://43.136.170.29/:8088", // 请求基础地址,可根据环境自定义
  baseURL: "http://127.0.0.1:3000/api/",
  useTokenAuthorization: true, // 是否开启 token 认证
};

// 创建 axios 请求实例
const instance = axios.create({
  baseURL: serverConfig.baseURL, // 基础请求地址
  timeout: 10000, // 请求超时设置
  withCredentials: true, // 跨域请求是否需要携带 cookie
});

// 创建请求拦截
instance.interceptors.request.use(
  (config) => {
    config.headers['Access-Control-Allow-Origin']='*';
    // 如果开启 token 认证
    if (serverConfig.useTokenAuthorization) {
      config.headers["Authorization"] = cookie.get("token"); // 请求头携带 token
    }
    // 设置请求头
    if (!config.headers["content-type"]) {
      // 如果没有设置请求头
      if (config.method === "post") {
        config.data = JSON.stringify(config.data); // 序列化,比如表单数据
      }
      config.headers["content-type"] = "application/json"; // 默认类型
    }
    console.log("request config:", config);
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

    if (res.config.method === "post" || res.config.method === "put") {
      notification.success({
        message: "Success",
        description: "",
        placement: "topRight",
      });
    }
    return data;
  },
  async (error) => {
    console.log("🚀 ~ file: index.ts:55 ~ error:",error);
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
    } catch (message) {}
  }
);
export default instance;
