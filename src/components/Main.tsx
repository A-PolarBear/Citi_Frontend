import { Layout } from "antd";
import { useState } from "react";
import { useLocation, Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import HeaderM from "./HeaderM";

const { Header, Footer, Sider, Content } = Layout;

function Main() {
  const { pathname } = useLocation();
  const [isLighttheme, setIsLightTheme] = useState(true);
  const [isFold, setIsFold] = useState(false);
  const page: string = pathname.replace("/", "");

  return (
    <>
      <Layout
        style={{
          height: "100vh",
          background: "transparent",
        }}
      >
        <Sider
          theme={isLighttheme ? "light" : "dark"}
          breakpoint="lg"
          width={isFold?"80px":"260px"}
          collapsedWidth="0"
          trigger={null}
          className={isFold?"sider-primary fold":"sider-primary"}
        >
          <SideBar pathname={page} theme={isLighttheme} fold={isFold}></SideBar>
        </Sider>
        <button className="hidden lg:fold-btn" onClick={() => setIsFold(!isFold)} style={isFold?{left:"80px"}:{}}>
          <svg
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2807"
            width="20"
            height="20"
            fill="#bfbfbf"
          >
            <path
              d="M0 64h1024v128H0V64z m0 768h1024v128H0v-128z m384-384h640v128H384V448z m-128 256L0 507.328 256 320v384z"
              p-id="2808"
            ></path>
          </svg>
        </button>
        <Layout
          style={
            isLighttheme
              ? { backgroundColor: "" }
              : { backgroundColor: "#001529" }
          }
        >
          <Header>
            <div className="header-primary">
              <HeaderM
                pathname={page}
                setTheme={() => setIsLightTheme(!isLighttheme)}
              ></HeaderM>
            </div>
          </Header>
          <Content>
            <Outlet />
          </Content>
          <Footer
            className="footer"
            style={
              isLighttheme
                ? { backgroundColor: "" }
                : { backgroundColor: "#001529", color: "white" }
            }
          >
            © 2023, Made with ❤️ by SCU & Citi for a better app
          </Footer>
        </Layout>
      </Layout>
    </>
  );
}

export default Main;
