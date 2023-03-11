import { notification } from "antd";
import { Cookies } from "react-cookie";
import axios from "axios";

export const cookie = new Cookies();

const serverConfig = {
  baseURL: "/api/",
  useTokenAuthorization: true, // token authorization
};

// axios instance
const instance = axios.create({
  baseURL: serverConfig.baseURL, 
  timeout: 10000,
});

// request interceptor
instance.interceptors.request.use(
  (config) => {
    config.headers["Access-Control-Allow-Methods"] = "*";
    config.headers["Access-Control-Allow-Origin"] = "*";
    // if authorization is true
    if (serverConfig.useTokenAuthorization) {
      config.headers["token"] = cookie.get("token");
    }
    // header setup
    if (!config.headers["content-type"]) {
      if (config.method === "post") {
        config.data = JSON.stringify(config.data); // JSON stringify
      }
      config.headers["content-type"] = "application/json"; //default
    }
    console.log("request config:", config);
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// response interceptor
instance.interceptors.response.use(
  (res) => {
    let data = res.data;
    if (data.state === 7000) {
      notification.error({
        message: "Request Error",
        description: data.message,
        placement: "topRight",
      });
      setTimeout(() => {
        location.href = "/signin";
      }, 3000);
    }
    return data;
  },
  async (error) => {
    console.log("🚀 ~ file: index.ts:55 ~ error:", error);
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
    } catch (message) { }
  }
);
export default instance;
