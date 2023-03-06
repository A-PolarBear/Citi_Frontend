import { useLocation } from "react-router-dom";
import { Button, Card, Divider, Skeleton } from "antd";
import StockAPI from "../api/Stock";
import type { StockDataType } from "./Stock";
import { useEffect, useState } from "react";
import ProfileD from "../components/stockDetail/ProfileD";
import QuotePanelD from "../components/stockDetail/QuotePanelD";
import Detail from "../components/stockDetail/Detail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarR } from "@fortawesome/free-regular-svg-icons";
import CandleStickChart from "../components/stockDetail/CandleStickChart";

function StockDetail() {
  const { pathname,state } = useLocation();
  const stockCode = pathname.split("/").slice(-1).toString();
  const [stockDetail, setStockDetail] = useState<StockDataType>();
  const [isFavourite, setIsFavourite] = useState(false);

  async function fetchStockDetailData(stockCode: any) {
    const res: any = await StockAPI.getByStockCode(stockCode);
    setStockDetail(res);
  }

  useEffect(() => {
    fetchStockDetailData(stockCode);
  }, [stockCode]);

  if (stockDetail === null || typeof stockDetail === "undefined") {
    return (
      <Card>
        <Skeleton></Skeleton>
      </Card>
    );
  } else {
    return (
      <>
        <Card className="md:px-8 py-2">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <ProfileD
                profile={{
                  svg: state.svg,
                  stockCode: stockCode,
                  stockName: state.stockName,
                }}
              />
              <div style={{ width: "50%", margin: "12px 0px" }}>
                <QuotePanelD
                  quote={stockDetail}
                />
              </div>
            </div>
            <Button
              type="primary"
              size="large"
              icon={
                isFavourite ? (
                  <FontAwesomeIcon icon={faStar} />
                ) : (
                  <FontAwesomeIcon icon={faStarR} />
                )
              }
              onClick={() => setIsFavourite(!isFavourite)}
            >
              <span style={{ paddingLeft: "12px" }}>Add to Favourites</span>
            </Button>
          </div>
          <Divider />
          <Detail
            quote={stockDetail}
          />
          <Divider />
          <CandleStickChart stockCode={stockCode}/>
        </Card>
      </>
    );
  }
}

export default StockDetail;
