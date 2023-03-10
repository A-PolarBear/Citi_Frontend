import { Card } from "antd";
import { useEffect, useReducer, useRef } from "react";
import QuotePanel from "./QuotePanel";
import Profile from "./Profile";
import Star from "../Star";
import QuoteChart from "./QuoteChart";
import { NavLink } from "react-router-dom";
import StockAPI from "../../api/Stock";
import axios from "axios";

function StockCard(props: any) {
  const { stockData } = props;
  const firstUpload = useRef(true);
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
    } else if (action.type === "fetch/previous") {
      newState = {
        ...state,
        previous: action.payload,
      };
    } else if (action.type === "fetch/intraday") {
      newState = { ...state, intraday: action.payload };
    }
    return newState;
  };

  const [states, dispatch] = useReducer(reducer, initState);

  const { profile, quote, previous, intraday } = states;

  // Real-time panel data fetch 15s/per
  async function fetchStockDetailData(stockCode: any, dispatch: any) {
    try {
      const res: any = await StockAPI.getByStockCode(stockCode);
      if (firstUpload.current) {
        firstUpload.current = false;
        dispatch({ type: "fetch/profile", payload: res.data.stockVO });
        dispatch({ type: "fetch/quote", payload: res.data.finnhub });
      } else {
        dispatch({ type: "fetch/quote", payload: res.data.finnhub });
      }
    } catch (error) {
      dispatch({ type: "fetch/quote", payload: {} });
    }
  }

  // Preclose & predate data fetch
  async function fetchStockPrevious(stockCode: any, dispatch: any) {
    const baseURL = `https://finnhub.io/api/v1/stock/candle?symbol=${stockCode}&resolution=D&token=cfsnhmpr01qgkckhjua0cfsnhmpr01qgkckhjuag`;
    try {
      axios.get(baseURL).then((response) => {
        const data = response.data;
        const res = {
          preClose: data.c[data.c.length - 1],
          date: data.t[data.c.length - 1],
        };
        dispatch({ type: "fetch/previous", payload: res });
      });
    } catch (error) {
      dispatch({ type: "fetch/previous", payload: {} });
    }
  }

  // Intraday data fetch 15s/per
  async function fetchStockIntraday(
    stockCode: any,
    from: any,
    to: any,
    dispatch: any
  ) {
    const baseURL = `https://finnhub.io/api/v1/stock/candle?symbol=${stockCode}&resolution=1&from=${from}&to=${to}&token=cfsnhmpr01qgkckhjua0cfsnhmpr01qgkckhjuag`;
    try {
      axios.get(baseURL).then((response) => {
        const data = response.data;
        console.log("🚀 ~ file: StockCard.tsx:90 ~ axios.get ~ data:", data);
        const res = data.c.map((item: any, index: string | number) => ({
          close: Number(data.c[index]).toFixed(2),
          timestamp: new Date(data.t[index] * 1000).toUTCString(),
        }));
        dispatch({ type: "fetch/intraday", payload: res });
      });
    } catch (error) {
      dispatch({ type: "fetch/intraday", payload: null });
    }
  }

  //
  useEffect(() => {
    console.log("useEffect => fetchQuote");
    if (quote !== null) {
      const timerId = setInterval(() => {
        fetchStockDetailData(stockData.stockCode, dispatch);
      }, 15 * 1000 + Math.floor(Math.random() * 5));
      return () => clearTimeout(timerId);
    } else {
      fetchStockDetailData(stockData.stockCode, dispatch);
    }
  }, [quote]);

  useEffect(() => {
    console.log("useEffect => fetchPrevious");
    fetchStockPrevious(stockData.stockCode, dispatch);
  }, [stockData.stockCode]);

  useEffect(() => {
    console.log("useEffect => fetchIntraday");
    if (previous !== null) {
      const date = new Date(previous.date * 1000);
      const date_to = date.setDate(date.getDate() + 1).valueOf() / 1000;
      const date_from = previous.date;
      fetchStockIntraday(stockData.stockCode, date_from, date_to, dispatch);
      const timerId = setInterval(() => {
        const date = new Date(previous.date * 1000);
        const date_to = date.setDate(date.getDate() + 1).valueOf() / 1000;
        const date_from = previous.date;
        fetchStockIntraday(stockData.stockCode, date_from, date_to, dispatch);
      }, 15 * 1000 + Math.floor(Math.random() * 5));
      return () => clearTimeout(timerId);
    }
  }, [previous]);

  return (
    <>
      <Card className={"quoteCard"} hoverable={true}>
        <NavLink to={`/stock/${stockData.stockCode}`}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "8px",
              }}
            >
              <Profile profile={profile} />
              <QuotePanel quote={quote}></QuotePanel>
            </div>
            <div
              style={{
                width: "100%",
                height: "100px",
                marginTop: "12px",
              }}
              className="md:px-5"
            >
              <QuoteChart
                data={intraday}
                quote={quote}
                stock={stockData.stockCode}
              />
            </div>
          </div>
        </NavLink>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Star status={true} stockCode={stockData.stockCode} />
        </div>
      </Card>
    </>
  );
}

export default StockCard;
