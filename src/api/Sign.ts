import instance from "./index"


const LoginAPI = {
    login: (userInfo: any) =>
        instance.get("/users/login",{params:userInfo,withCredentials:false}),
    signUp: (userInfo: any) =>
        instance.post("/users", {userInfo,withCredentials:false} ),
    forgetPwd: (userInfo: any) =>
        instance.post("/users/forgetPwd", {userInfo,withCredentials:false}),
}

export default LoginAPI;