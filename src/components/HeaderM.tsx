import { Row, Col, Breadcrumb, Button } from "antd";
import { NavLink } from "react-router-dom";

type IProps = React.PropsWithChildren<{ pathname: string; setTheme: any }>;

function HeaderM({ pathname, setTheme }: IProps) {
  return (
    <>
      <Row gutter={[24, 0]}>
        <Col span={24} md={6}>
          <div style={{ color: "inherit" }}>
            <Breadcrumb>
              <Breadcrumb.Item>
                <NavLink to="/">Pages</NavLink>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{pathname.replace("/", "")}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div style={{ color: "inherit" }}>
            <span
              className="ant-header-page"
              style={{ textTransform: "capitalize" }}
            >
              {pathname.replace("/", "")}
            </span>
          </div>
        </Col>
      </Row>
      <Button onClick={() => setTheme()}></Button>
    </>
  );
}

export default HeaderM;
