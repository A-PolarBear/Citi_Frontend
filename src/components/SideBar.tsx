import { Menu } from "antd";
import { NavLink } from "react-router-dom";
import CitiLogo from "../assets/images/citi_logo.svg";
import CitiLogo_d from "../assets/images/citi_d.svg";


type IProps = React.PropsWithChildren<{pathname: string,theme:boolean }>;


function SideBar({ pathname,theme }: IProps) {
  const color = "#1890ff";

  return (
    <>
      <div className="logo">
        <img src={theme?CitiLogo:CitiLogo_d} alt="" />
      </div>
      <hr></hr>
      <Menu mode="inline" theme="light" style={{ background: "0 0" }}>
        <Menu.Item key="1">
          <NavLink to="/stock">
            <span
              className="icon"
              style={{ background: pathname === "stock" ? color : "" }}
            >
              <svg
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="20142"
                width="20"
                height="20"
                fill={pathname === "stock" ? "white" : "#bfbfbf"}
              >
                <path
                  d="M589.656 124.4c-10.864-10.848-2.96-29.072 12.608-29.072h277.936c15.48 0 23.424 18.04 12.736 28.944-4.848 4.944-14.448 13.856-29.064 26.168-24.096 20.304-53.736 42.864-89.192 67.104-100.904 69.008-228.208 137.92-384.008 202.152-71.112 29.312-146.792 57.04-227.16 82.904-7.88 2.536-16.512-0.632-20.712-7.6a1502.72 1502.72 0 0 0-27.648-44.064c-6.192-9.52-1.416-22.16 9.64-25.52 174.16-52.728 288.128-107.072 523.88-237.768l1.592-0.88 1.192-0.664-61.8-61.704zM277.136 609.04c27.856 0 50.504 23.136 50.032 51.92v213.824c0 28.784-22.656 51.92-50.496 51.92h-113.76c-27.84 0-50.496-23.136-50.496-51.92V660.96c0-28.8 22.656-51.92 50.504-51.92h114.216z m284.096-155.28c27.84 0 50.504 23.6 50.504 52.4v368.624c0 28.784-22.656 52.384-50.504 52.384H447c-27.84 0-50.496-23.6-50.496-52.384V506.152c0-28.792 22.656-52.392 50.496-52.392h114.232z m286.24-130.112c27.84 0 50.504 23.6 50.504 52.856v497.96c0 29.264-22.656 52.864-50.504 52.864H733.72c-27.848 0-50.504-23.6-50.504-52.864V376.512c0-29.264 22.656-52.864 50.504-52.864h113.752z"
                  p-id="20143"
                ></path>
              </svg>
            </span>
            <span>Stocks</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="2">
          <NavLink to="/create">
            <span
              className="icon"
              style={{ background: pathname === "create" ? color : "" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill={pathname === "create" ? "white" : "#bfbfbf"}
              >
                <title>plus-box</title>
                <path d="M17,13H13V17H11V13H7V11H11V7H13V11H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z" />
              </svg>
            </span>
            <span>Create</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="3">
          <NavLink to="/favourites">
            <span
              className="icon"
              style={{ background: pathname === "favourites" ? color : "" }}
            >
              <svg
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2395"
                width="20"
                height="20"
                fill={pathname === "favourites" ? "white" : "#bfbfbf"}
              >
                <path
                  d="M757.94318222 927.06702222c-11.42328889 0-23.42912-3.79790222-35.70346667-11.28903111l-185.17902222-113.10648889c-5.97105778-3.6352-15.33724445-5.80835555-25.06069333-5.80835555s-19.09532445 2.17315555-25.06638222 5.81973333l-185.16764445 113.09511111c-12.27434667 7.49112889-24.28586667 11.28903111-35.70915555 11.28903111-14.40654222 0-27.60704-6.25095111-36.21660445-17.14403555-7.24764445-9.18641778-14.55786667-25.72515555-8.20337778-52.35256889l50.34439112-211.04981333c3.44291555-14.42929778-4.23480889-38.04046222-15.50222222-47.66947556L91.70716445 457.66656c-29.10890667-24.93326222-25.07207111-49.71406222-21.98528-59.20995555s14.38947555-31.91694222 52.59264-34.98211556l216.29724444-17.34200889c14.77404445-1.19466667 34.85923555-15.78097778 40.5504-29.45934222L462.49528889 116.3264c14.71488-35.38944 39.5264-39.21009778 49.51608889-39.21009778 9.98513778 0 34.80120889 3.82065778 49.52177777 39.21578667l83.32743112 200.34218666c5.68547555 13.68405333 25.76611555 28.27719111 40.54471111 29.46503112l216.29155555 17.34314666c38.23274667 3.06403555 49.52291555 25.48622222 52.59832889 34.97528889 3.08110222 9.49589333 7.11907555 34.27669333-21.98528 59.21564445l-164.78435555 141.16181333c-11.26513778 9.64039111-18.93717333 33.25724445-15.49539556 47.67516445l50.35576889 211.05436444c6.36017778 26.63424-0.95573333 43.17297778-8.20792889 52.34801778-8.62208 10.90446222-21.82826667 17.15541333-36.23480889 17.15541333z"
                  p-id="2396"
                ></path>
              </svg>
            </span>
            <span>Favourites</span>
          </NavLink>
        </Menu.Item>
      </Menu>
    </>
  );
}

export default SideBar;
