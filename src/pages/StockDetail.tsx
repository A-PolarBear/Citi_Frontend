import { useLoaderData } from "react-router-dom";
import { Card } from "antd";
import StockAPI from "../api/Stock";
import type { StockDataType } from "./Stock";

export async function loader({ params }: { params: any }) {
  const res = await StockAPI.getBySymbol(params.symbol);
  const data : any  = res;
  const detailData : StockDataType[]= data;
  return detailData;
}

function StockDetail() {
  const detaiData:any = useLoaderData();
  return (
    <>
      <Card title={detaiData.symbol}>
        <div>{detaiData.value}</div>
      </Card>
    </>
  );
}

export default StockDetail;
