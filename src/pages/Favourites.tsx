<<<<<<< HEAD
function Favorites() {
  return (
    <>
      <h1>Hello! favourites</h1>
=======
import { Col, Row } from "antd";
import StockCard from "../components/stockCard/StockCard";

function Favorites() {
  const colCount = 20;
  const cols = [];
  for (let i = 0; i < colCount; i++) {
    cols.push(
      <Col key={i.toString()} sm={24} lg={12} xl={8} >
        <StockCard></StockCard>
      </Col>,
    );
  }

  return (
    <>
       <Row gutter={[24,24]}>
        {cols}
        </Row>
>>>>>>> cff4adf59b816ba678c0334a4f09e91748803321
    </>
  );
}

export default Favorites;
