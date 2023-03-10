import { Row, Col, Breadcrumb, Button, Popover } from "antd";
import { NavLink, Link, useNavigate } from "react-router-dom";
import avatar from "../assets/images/avatar.png";
import loginExit from "../assets/images/loginExit.png";
import { Cookies } from "react-cookie";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

const cookie = new Cookies();

type IProps = React.PropsWithChildren<{
  pathname: string;
  setTheme: any;
  lighttheme: boolean;
  opendrawer: any;
}>;

function HeaderM({ pathname, setTheme, lighttheme, opendrawer }: IProps) {
  const navigate = useNavigate();
  // 判断用户是否登录：
  const [userLoginState, setUserLoginState] = useState(false);
  useEffect(() => {
    // 如果本地的cookie中的token不为空，则说明用户已经登录：
    if (cookie.get("token") != null) {
      const current_user_emailValue = localStorage.getItem(
        "current_user_emailValue"
      );
      console.log("current_user_emailValue", current_user_emailValue);
      setUserLoginState(true);
    } else {
      setUserLoginState(false);
    }
  }, []);

  // 用户登出：
  const loginOut = () => {
    // 把cookie清空：
    cookie.set("token", "");
    console.log("loginOut方法开始调用");
    setUserLoginState(false);
    setTimeout(() => navigate("/signin"), 1500);
  };
  // 用户注销：
  // const loginOff = () => {
  //   // 把cookie清空：
  //   console.log("loginOff方法开始调用")
  //   setUserLoginState(false)
  //   LoginAPI.deleteUser(localStorage.getItem('current_user_emailValue')).then((response:any)=>{
  //     if(response.state!==4000){
  //       notification.success({
  //         message: "Success",
  //         description: "Log out success",
  //         placement: "topRight",
  //         duration: 1.5,
  //       });
  //       cookie.set('token','');
  //     }else{
  //       notification.error({
  //         message: "Error",
  //         description: response.message,
  //         placement: "topRight",
  //       });
  //     }
  //   })
  // }

  const UserInfoPopoverContent = (
    <div>
      <p className="firstTXT text-sm">Hello,dear user</p>
      <p className="secondTXT text-sm">
        {localStorage.getItem("current_user_emailValue")}
      </p>
      <div className="popoverImgBox1" onClick={loginOut}>
        <span>Sign out</span>
        <img src={loginExit} alt="" className="loginExit" />
      </div>
      {/* <div className="popoverImgBox2" onClick={loginOff}>
        <span>Log out</span>
        <img src={loginOffImg} alt="" className="loginExit" />
      </div> */}
    </div>
  );

  let patharr = pathname.split("/");
  const arr = patharr.map((value, index) => {
    const url = `/${patharr.slice(1, index + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={index}>
        <NavLink to={url}>{value}</NavLink>
      </Breadcrumb.Item>
    );
  });

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col span={24} md={6}>
          <div className={lighttheme ? "" : "dark"}>
            <Breadcrumb>
              <Breadcrumb.Item>
                <NavLink to="/">Pages</NavLink>
              </Breadcrumb.Item>
              {arr.slice(1)}
            </Breadcrumb>
          </div>
          <div className={lighttheme ? "" : "dark"}>
            <span
              className="ant-header-page"
              style={{ textTransform: "capitalize" }}
            >
              {pathname.split("/").slice(-1)}
            </span>
          </div>
        </Col>
        <Col span={24} md={18} className="header-control">
          <Popover
            content={UserInfoPopoverContent}
            placement="bottom"
            title="User Info"
            style={userLoginState ? { display: "" } : { display: "none" }}
            className="w-auto"
          >
            <img
              className="indexAvatar"
              src={avatar}
              alt="图片不见了"
              style={userLoginState ? { display: "" } : { display: "none" }}
            />
          </Popover>

          <Link
            to="/SignIn"
            style={userLoginState ? { display: "none" } : { display: "" }}
          >
            <Button type="primary" className="signInButton">
              Sign In
            </Button>
          </Link>
          <Button
            onClick={() => setTheme()}
            style={{ background: "transparent" }}
          >
            <svg
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2797"
              width="20"
              height="20"
              style={lighttheme ? {} : { fill: "white" }}
            >
              <path
                d="M524.8 938.666667h-4.266667a439.893333 439.893333 0 0 1-313.173333-134.4 446.293333 446.293333 0 0 1-11.093333-597.333334 432.213333 432.213333 0 0 1 170.666666-116.906666 42.666667 42.666667 0 0 1 45.226667 9.386666 42.666667 42.666667 0 0 1 10.24 42.666667 358.4 358.4 0 0 0 82.773333 375.893333 361.386667 361.386667 0 0 0 376.746667 82.773334 42.666667 42.666667 0 0 1 54.186667 55.04A433.493333 433.493333 0 0 1 836.266667 810.666667a438.613333 438.613333 0 0 1-311.466667 128z"
                p-id="2798"
              ></path>
            </svg>
          </Button>
          <Button
            onClick={opendrawer}
            style={{ background: "transparent" }}
            className="ml-2 lg:hidden"
          >
            <FontAwesomeIcon icon={faList} />
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default HeaderM;
