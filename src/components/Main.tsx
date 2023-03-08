import { ConfigProvider, Layout, theme } from "antd";
import { useEffect, useState } from "react";
import { useLocation, Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import HeaderM from "./HeaderM";
import { TickerTape } from "react-ts-tradingview-widgets";

const { Header, Footer, Sider, Content } = Layout;

function Main() {
  const { pathname } = useLocation();
  const [isLightTheme, setIsLightTheme] = useState(() => {
    const storage = localStorage.getItem("isLightTheme");
    if (storage) return storage === "true" ? true : false;
    else return false;
  });
  const [isFold, setIsFold] = useState(() => {
    const storage = localStorage.getItem("isFold");
    if (storage) return storage === "true" ? true : false;
    else return false;
  });

  useEffect(() => {
    localStorage.setItem("isLightTheme", JSON.stringify(isLightTheme));
  }, [isLightTheme]);

  useEffect(() => {
    localStorage.setItem("isFold", JSON.stringify(isFold));
  }, [isFold]);

  const tickerTape =
    pathname.split("/").slice(-1).toString() === "stock" ? (
      <div style={{ padding: "0 16px" }}>
        <TickerTape colorTheme={isLightTheme ? "light" : "dark"}></TickerTape>
      </div>
    ) : (
      <></>
    );

  return (
    <>
      <Layout
        style={{
          height: "100vh",
        }}
        className={isLightTheme ? "" : "dark"}
      >
        <Sider
          theme={isLightTheme ? "light" : "dark"}
          breakpoint="lg"
          width={isFold ? "80px" : "260px"}
          collapsedWidth="0"
          trigger={null}
          className={isFold ? "sider-primary fold" : "sider-primary"}
        >
          <SideBar theme={isLightTheme} fold={isFold}></SideBar>
        </Sider>
        <button
          className={
            isLightTheme ? "hidden lg:fold-btn" : "hidden lg:fold-btn-dark"
          }
          onClick={() => setIsFold(!isFold)}
          style={isFold ? { left: "80px" } : {}}
        >
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
            isLightTheme
              ? { backgroundColor: "", padding: "0 20px" }
              : { backgroundColor: "#1a202c", padding: "0 20px" }
          }
        >
          <Header>
            <div className="header-primary">
              <HeaderM
                pathname={pathname}
                setTheme={() => setIsLightTheme(!isLightTheme)}
                lighttheme={isLightTheme}
              ></HeaderM>
            </div>
          </Header>
          {tickerTape}
          <Content>
            <ConfigProvider
              theme={
                isLightTheme
                  ? {}
                  : {
                      algorithm: theme.darkAlgorithm,
                    }
              }
            >
              <div className={isLightTheme ? "" : "dark"}>
                <Outlet />
              </div>
            </ConfigProvider>
          </Content>
          <Footer
            style={
              isLightTheme
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
