import { Col, ConfigProvider, Row } from "antd";
import StockCard from "../components/stockCard/StockCard";
import { useEffect, useState } from "react";
import FavouritesAPI from "../api/Favourites";
import NullSVG from "../assets/images/null.svg";

function Favorites() {
  const [stockCodeList, setStockCodeList] = useState([]);

  async function getFavouriteList() {
    const res: any = await FavouritesAPI.getFavourites();
    console.log("🚀 ~ file: Favourites.tsx:12 ~ getFavouriteList ~ res:", res);
    const list = res.map(
      (item: { userfavoritesStockCode: any }) => item.userfavoritesStockCode
    );
    setStockCodeList(list);
  }

  useEffect(() => {
    getFavouriteList();
    console.log(
      "🚀 ~ file: Favourites.tsx:16 ~ getFavouriteList ~ list:",
      stockCodeList
    );
  }, []);

  const colCount = stockCodeList.length;
  const cols = [];
  if (colCount === 0 || stockCodeList == null) {
     return( 
      <>
      <div className="flex justify-center">
     <img src={NullSVG} alt=""/>
    
     </div>
      <div className="text-center text-base text-gray-400">No favourites</div>
      </>
     )
  }
  else{
    for (let i = 0; i < colCount; i++) {
      cols.push(
        <Col
          key={i.toString()}
          sm={24}
          lg={12}
          xl={8}
          className="flex-auto px-0"
          style={{ width: "100%" }}
        >
          <StockCard
            stockData={{
              stockCode: stockCodeList[i],
              isFavourite: 1,
            }}
          ></StockCard>
        </Col>
      );
    }
  
    return (
      <>
        <ConfigProvider
          theme={{
            token: {
              screenXLMin: 1480, // for grid (row/col)
              screenXL: 1480,
            },
          }}
        >
          <Row gutter={[24, 24]} className="w-full" style={{ margin: "0 0" }}>
            {cols}
          </Row>
        </ConfigProvider>
      </>
    );
  }
}

export default Favorites;
