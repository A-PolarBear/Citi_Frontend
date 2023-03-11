import { Cookies } from "react-cookie";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute=()=>{
  const cookie = new Cookies();
  const token = cookie.get('token');
  console.log("🚀 ~ file: ProtectedRoute.tsx:7 ~ ProtectedRoute ~  token:",  token)

  return (
    (token===""||token===null || token===undefined)?<Navigate to="/signin" />:<Outlet/>
  )
}

export default ProtectedRoute;