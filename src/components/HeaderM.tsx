import { Row, Col, Breadcrumb, Button } from "antd";
import { NavLink, useLoaderData,Link } from "react-router-dom";
import { useEffect, useState } from "react";

type IProps = React.PropsWithChildren<{
  pathname: string;
  setTheme: any;
  lighttheme: boolean;
}>;

function HeaderM({ pathname, setTheme, lighttheme }: IProps) {
  const [checked, setChecked] = useState(() => {
    const storage = localStorage.getItem("checked");
    if (storage) return storage === "true" ? true : false;
    else return false;
  });

  let patharr = pathname.split("/");
  const arr = patharr.map((value, index) => {
    const url = `/${patharr.slice(1, index + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={index}>
        <NavLink to={url}>{value}</NavLink>
      </Breadcrumb.Item>
    );
  });

  useEffect(() => {
    localStorage.setItem("checked", JSON.stringify(checked));
  }, [checked]);

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
          <Link to="/SignIn">
                <Button type="primary" className="signInButton">Sign In</Button>
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
          <label className="rocker rocker-small">
            <input
              type="checkbox"
              onClick={() => setChecked(!checked)}
              defaultChecked={checked}
            />
            <span className="switch-left">Yes</span>
            <span className="switch-right">No</span>
          </label>
        </Col>
      </Row>
    </>
  );
}

export default HeaderM;
