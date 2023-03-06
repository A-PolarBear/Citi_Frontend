import { Col, Row } from "antd";
import StockCard from "../components/stockCard/StockCard";
import {useState } from "react";

function Favorites() {
  const [stockCodeList,setStockCodeList] = useState([]);
  const colCount = 6;
  const cols = [];
  for (let i = 0; i < colCount; i++) {
    cols.push(
      <Col key={i.toString()} sm={24} lg={12} xl={8} >
        <StockCard symbol={"AAPL"}></StockCard>
      </Col>,
    );
  }

  // const [total, setTotal] = useState(10);
  // const pageOption = useRef<any>({ page: 1, size: 10 });
  // const paginationProps = {
  //   total: total,
  //   current: pageOption.current.page,
  //   pageSize: pageOption.current.size,
  //   onChange: (current: any, size: any) => paginationChange(current, size), //分页切换的函数 在下面给到
  // };

  // async function paginationChange(page: any, size: any) {
  //   pageOption.current = { page, size };
  //   fetchStockCodeFavourite();
  // }

  // async function fetchStockCodeFavourite() {
  //   const res: any = await StockAPI.getAll(pageOption.current);
  //   setStockCodeList(res.data);
  //   setTotal(res?.totalPage);
  //   console.log(res);
  // }

  // useEffect(() => {
  //   fetchStockCodeFavourite();
  // }, []);

  return (
    <>
       <Row gutter={[24,24]}>
        {cols}
        </Row>
    </>
  );
}

export default Favorites;
