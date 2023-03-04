import { Card } from "antd";
import { useReducer } from "react";
import QuotePanel from "./QuotePanel";
import Profile from "./Profile";
import Star from "../Star";
import transformData from "../../tests/mock/data";
import QuoteChart from "./QuoteChart";
import { NavLink } from "react-router-dom";

function StockCard() {
  const initState = {
    profile: null,
    quote: null,
    previous: null,
    intraday: null,
  };

  const reducer = (state: any, action: any) => {
    let newState = { ...state };
    if (action.type === "fetch/profile") {
      newState = { ...state, profile: action.payload };
    } else if (action.type === "fetch/quote") {
      newState = { ...state, quote: action.payload };
    } else if (action.type === "fetch/intraday-init") {
      newState = {
        ...state,
        previous: action.payload.previous,
        intraday: action.payload.quote,
      };
    }
    // } else if (action.type === "fetch/intraday-delta") {
    //     if (Array.isArray(action.payload)) {
    //         if (action.payload.length > 0) {
    //             newState = { ...state, intraday: [ ...state.intraday, ...action.payload] };
    //         } else if (action.since === `${config.tradeDate.format('YYYY-MM-DD')}T15:59:00`) {
    //             newState = { ...state, intraday: [] };
    //         }
    //     }
    // }
    return newState;
  };

  const [states, dispatch] = useReducer(reducer, initState);

  const { profile, quote, previous, intraday } = states;

  const data = transformData();

  return (
    <>
      <Card className={"quoteCard"} hoverable={true}>
        <NavLink to={`/stock/AAPL`}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "8px",
              }}
            >
              <Profile
                profile={{
                  svg: "https://s3-symbol-logo.tradingview.com/apple.svg",
                  stockCode: "AAPL",
                  stockName: "Apple Inc.",
                }}
              />
              <QuotePanel
                quote={{
                  latestPrice: 223,
                  change: 0.1,
                  changePercent: 12,
                  previousClose: 1231,
                }}
              ></QuotePanel>
            </div>
            <div style={{width:"100%",height:"100px", padding:"0 30px",marginTop:"12px"}}>
            <QuoteChart data={data} />
            </div>
          </div>
        </NavLink>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Star />
        </div>
      </Card>
    </>
  );
}

export default StockCard;
