import { Layout } from "antd";
import { useLocation, Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import HeaderM from "./HeaderM";

const { Header, Footer, Sider, Content } = Layout;

function Main() {
  const { pathname } = useLocation();
  const page:string = pathname.replace("/", "");

  return (
    <>
      <Layout
        style={{ height: "100vh", background: "transparent" }}
      >
        <Sider
          breakpoint="lg"
          width="260px"
          collapsedWidth="0"
          trigger={null}
          className="sider-primary"
        >
          <SideBar pathname={page}></SideBar>
        </Sider>
        <Layout>
          <Header>
          {/* <HeaderM pathname={page}>Header</HeaderM> */}
          </Header>
          <Content>
            <Outlet />
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    </>
  );
}

export default Main;
