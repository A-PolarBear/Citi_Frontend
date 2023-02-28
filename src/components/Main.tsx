import { Layout } from "antd";
import { useState } from "react";
import { useLocation, Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import HeaderM from "./HeaderM";

const { Header, Footer, Sider, Content } = Layout;

function Main() {
  const { pathname } = useLocation();
  const [lighttheme, setLightTheme] = useState(true);
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
          theme={lighttheme?"light":"dark"}
          breakpoint="lg"
          width="260px"
          collapsedWidth="0"
          trigger={null}
          className="sider-primary"
        >
          <SideBar pathname={page} theme={lighttheme}></SideBar>
        </Sider>
        <Layout >
          <Header>
            <HeaderM pathname={page} setTheme={()=>setLightTheme(!lighttheme)}></HeaderM>
          </Header>
          <Content>
            <Outlet />
          </Content>
          <Footer>© 2023, Made with ❤️ by SCU & Citi for a better app</Footer>
        </Layout>
      </Layout>
    </>
  );
}

export default Main;
