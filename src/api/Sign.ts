import instance from "./index";

const LoginAPI = {
  login: (userInfo: any) =>
    instance.get("/users/login", { params: userInfo }),
  signUp: (userInfo: any) =>
    instance.post("/users/reg", userInfo),
  changePwd: (userInfo: any) =>
    instance.post("/users/change-pwd", userInfo),
};

export default LoginAPI;
