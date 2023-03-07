import { useLocation } from "react-router-dom";
import { Button, Card, Divider, Skeleton, message, Upload } from "antd";
import StockAPI from "../api/Stock";
import { useEffect, useState } from "react";
import ProfileD from "../components/stockDetail/ProfileD";
import QuotePanelD from "../components/stockDetail/QuotePanelD";
import Detail from "../components/stockDetail/Detail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarR } from "@fortawesome/free-regular-svg-icons";
import CandleStickChart from "../components/stockDetail/CandleStickChart";
import type { UploadProps } from "antd";

function StockDetail() {
  const { pathname, state } = useLocation();
  const stockCode = pathname.split("/").slice(-1).toString();
  const [stockDetail, setStockDetail] = useState(null);
  const [isFavourite, setIsFavourite] = useState(false);

  async function fetchStockDetailData(stockCode: any) {
    try {
      const res: any = await StockAPI.getByStockCode(stockCode);
      console.log(
        "🚀 ~ file: StockDetail.tsx:22 ~ fetchStockDetailData ~ res:",
        res
      );
      setStockDetail(res);
    } catch (error) {
      setStockDetail(null);
    }
  }

  useEffect(() => {
    fetchStockDetailData(stockCode);
    if (stockCode !== null) {
      const timerId = setInterval(() => {
        fetchStockDetailData(stockCode);
      }, 5 * 1000 + Math.floor(Math.random() * 5));
      return () => clearTimeout(timerId);
    }
  }, [stockCode]);

  const props: UploadProps = {
    beforeUpload: (file) => {
      const isPNG = file.type === "text/csv";
      if (!isPNG) {
        message.error(`${file.name} is not a csv file`);
      }
      return isPNG || Upload.LIST_IGNORE;
    },
    onChange: (info) => {
      console.log(info.fileList);
    },
    action: "http://localhost:3000/api/stockhistories/upload",
  };

  if (stockDetail === null || typeof stockDetail === "undefined") {
    return (
      <Card>
        <Skeleton active></Skeleton>
      </Card>
    );
  } else {
    return (
      <>
        <Card className="md:px-8 py-2">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "50%" }}>
              <ProfileD
                profile={{
                  svg: state.svg,
                  stockCode: stockCode,
                  stockName: state.stockName,
                }}
              />
              <div style={{ width: "50%", margin: "12px 0px" }}>
                <QuotePanelD quote={stockDetail} />
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
              <span style={{ paddingLeft: "12px" }}>Favourites</span>
            </Button>
          </div>
          <Divider />
          <Detail quote={stockDetail} />
          <Divider />
          {/* <input
            type="file"
            id="upload"
            accept=".csv"
            onChange={FileHandler}
          ></input>
          <Button onClick={upload}></Button> */}
          <div
            style={{
              display: "flex",
              marginBottom: "24px",
              justifyContent: "flex-end",
            }}
          >
            <Upload {...props}>
              <Button type="primary">Upload csv only</Button>
            </Upload>
          </div>
          <CandleStickChart stockCode={stockCode} />
        </Card>
      </>
    );
  }
}

export default StockDetail;
