import qs from "qs";
import instance from "./index";

const LoginAPI = {
  login: (userInfo: any) =>
    instance.get("/users/login", { params: userInfo }),
  signUp: (userInfo: any) =>
    instance.post("/users/reg", userInfo),
  changePwd: (userInfo: any) =>
    instance.put("/users/change-pwd?"+qs.stringify(userInfo)),
};

export default LoginAPI;
