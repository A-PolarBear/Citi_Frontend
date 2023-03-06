import { useLoaderData } from "react-router-dom";
import { Card } from "antd";
import StockAPI from "../api/Stock";
import type { StockDataType } from "./Stock";

export async function loader({ params }: { params: any }) {
<<<<<<< HEAD
  const res = await StockAPI.getBySid(params.symbol);
=======
  const res = await StockAPI.getBySid(params.stockCode);
>>>>>>> cff4adf59b816ba678c0334a4f09e91748803321
  const data : any  = res;
  const detailData : StockDataType[]= data;
  return detailData;
}

function StockDetail() {
  const detaiData:any = useLoaderData();
  return (
    <>
<<<<<<< HEAD
      <Card title={detaiData.symbol}>
=======
      <Card title={detaiData.stockCode}>
>>>>>>> cff4adf59b816ba678c0334a4f09e91748803321
        <div>{detaiData.value}</div>
      </Card>
    </>
  );
}

export default StockDetail;
