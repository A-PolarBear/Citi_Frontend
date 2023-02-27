import { Row, Col, Breadcrumb } from "antd";
import { NavLink } from "react-router-dom";

function HeaderM( {pathname}:{pathname:string} ) {
  return (
    <>
      <Row gutter={[24, 0]}>
        <Col span={24} md={6}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <NavLink to="/">Pages</NavLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item className="">
              {pathname.replace("/", "")}
            </Breadcrumb.Item>
          </Breadcrumb>
          <div>
            <span
              className="ant-page-header-heading-title"
              style={{ textTransform: "capitalize" }}
            >
              {pathname.replace("/", "")}
            </span>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default HeaderM;
