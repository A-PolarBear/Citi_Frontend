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
import FavouritesAPI from "../api/Favourites";

function StockDetail() {
  const { pathname } = useLocation();
  const stockCode = pathname.split("/").slice(-1).toString();
  const [stockQuote, setStockQuote] = useState<any>(null);
  const [isFavourite, setIsFavourite] = useState(false);
  const [stockHistories, setStockHistories] = useState([]);

  // fetch quote data 10s/per
  async function fetchStockQuoteData(stockCode: any) {
    try {
      const res: any = await StockAPI.getByStockCode(stockCode);
      console.log(
        "🚀 ~ file: StockDetail.tsx:25 ~ fetchStockQuoteData ~ res:",
        res
      );
      setStockQuote(res.data);
      setIsFavourite(res.data.stockVO.isFavourite);
    } catch (error) {
      setStockQuote(null);
    }
  }

  useEffect(() => {
    fetchStockQuoteData(stockCode);
    if (stockCode !== null) {
      const timerId = setInterval(() => {
        fetchStockQuoteData(stockCode);
      }, 10 * 1000 + Math.floor(Math.random() * 5));
      return () => clearTimeout(timerId);
    }
  }, [stockCode]);

  useEffect(() => {
    
  }, [isFavourite]);

  // acquire history data from children component(candlestick chart)
  const getHistory = (e: any) => {
    console.log("🚀 ~ file: StockDetail.tsx:45 ~ getHistory ~ e:", e);
    setStockHistories(e);
  };

  // download history data csv file
  function downloadCsv(data: any[], fileName: string) {
    if (!data || !Array.isArray(data) || !data.length) {
      return message.error(`Data is not found`);
    }
    const header = [
      "stockCode",
      "stockrecordDate",
      "stockrecordOpenPrice",
      "stockrecordEndPrice",
      "stockrecordLow",
      "stockrecordHigh",
      "stockrecordVolume",
    ];
    var csvContent = "data:text/csv;charset=utf-8,\ufeff";
    const _header = header.map((item) => item).join(",");
    csvContent += _header + "\n";
    data.forEach((item, index) => {
      let dataString = "";
      for (let i = 0; i < header.length; i++) {
        dataString += item[header[i]] + ",";
      }
      csvContent +=
        index < data.length
          ? dataString.replace(/,$/, "\n")
          : dataString.replace(/,$/, "");
    });
    const url = encodeURI(csvContent);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
  }

  // upload csv setup
  const props: UploadProps = {
    beforeUpload: (file) => {
      const isCSV = file.type === "text/csv";
      if (!isCSV) {
        message.error(`${file.name} is not a csv file`);
      }
      return isCSV || Upload.LIST_IGNORE;
    },
    onChange: (info) => {
      console.log(info.fileList);
    },
    action: "http://localhost:3000/api/stockhistories/upload",
  };

  function FavouriteHandler(){
    if(isFavourite){
      FavouritesAPI.deleteFavourites(stockCode);
    }
    else{
      FavouritesAPI.addFavourites(stockCode);
    }
    setIsFavourite(!isFavourite);
  }

  if (stockQuote === null || typeof stockQuote === "undefined") {
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
                  svg: stockQuote.stockVO.svg,
                  stockCode: stockCode,
                  stockName: stockQuote.stockVO.stockName,
                }}
              />
              <div style={{ width: "50%", margin: "12px 0px" }}>
                <QuotePanelD quote={stockQuote.finnhub} />
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
              onClick={FavouriteHandler}
            >
              <span style={{ paddingLeft: "12px" }}>Favourites</span>
            </Button>
          </div>
          <Divider />
          <Detail quote={stockQuote.finnhub} />
          <Divider />
          <div
            style={{
              display: "flex",
              marginBottom: "24px",
              justifyContent: "flex-end",
            }}
          >
            <Button
              onClick={() => downloadCsv(stockHistories, `${stockCode}.csv`)}
              type="primary"
              style={{ marginRight: "12px" }}
            >
              Download CSV
            </Button>
            <Upload {...props}>
              <Button type="primary">Upload CSV</Button>
            </Upload>
          </div>
          <CandleStickChart stockCode={stockCode} getHistory={getHistory} />
        </Card>
      </>
    );
  }
}

export default StockDetail;
