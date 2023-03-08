import instance from "./index"


const LoginAPI = {
    login: (userInfo: any) =>
        instance.post("/users/login", { data: userInfo }),
    signUp: (userInfo: any) =>
        instance.post("/users", { data: userInfo }),
    forgetPwd: (userInfo: any) =>
        instance.post("/users/forgetPwd", { data: userInfo }),
}

export default LoginAPI;