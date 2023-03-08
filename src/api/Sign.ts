import instance from "./index";

const LoginAPI = {
  login: (userInfo: any) =>
    instance.get("/users/login", { params: userInfo }),
  signUp: (userInfo: any) =>
    instance.post("/users/reg", userInfo),
  forgetPwd: (userInfo: any) =>
    instance.post("/users/forgetPwd", userInfo),
};

export default LoginAPI;
