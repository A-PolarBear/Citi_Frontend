import ReactECharts from "echarts-for-react";
import { useEffect, useState } from "react";
import StockAPI from "../../api/Stock";
import { Skeleton } from "antd";

function CandleStickChart(props: any) {
  const { stockCode, getHistory } = props;
  const [stockData, setStockData] = useState([]);
  async function fetchStockHistoryData(stockCode: any) {
    const res: any = await StockAPI.getHistoryByStockCode(stockCode);
    console.log("🚀 ~ file: CandleStickChart.tsx:11 ~ fetchStockHistoryData ~ res:", res)
    setStockData(res);
  }

  useEffect(() => {
    fetchStockHistoryData(stockCode);
  }, [stockCode]);

  useEffect(()=>{
    getHistory(stockData);
  },[stockData])

  if (stockData === null || stockData === undefined) {
    return <Skeleton active />;
  } else {
    const dates = stockData.map((item: any) => item.stockrecordDate).reverse();
    const ohlc = stockData
      .map((item: any) => [
        +item.stockrecordOpenPrice,
        +item.stockrecordEndPrice,
        +item.stockrecordLow,
        +item.stockrecordHigh,
      ])
      .reverse();
    const options = {
      grid: { top: 8, right: 8, bottom: 24, left: 36 },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          animation: false,
          type: "cross",
          lineStyle: {
            color: "#376df4",
            width: 2,
            opacity: 1,
          },
        },
      },
      xAxis: {
        type: "category",
        data: dates,
        axisLine: { lineStyle: { color: "#8392A5" } },
      },
      yAxis: {
        scale: true,
        axisLine: { lineStyle: { color: "#8392A5" } },
        splitLine: { show: false },
      },
      dataZoom: [
        {
          textStyle: {
            color: "#8392A5",
          },
          handleIcon:
            "path://M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
          dataBackground: {
            areaStyle: {
              color: "#8392A5",
            },
            lineStyle: {
              opacity: 0.8,
              color: "#8392A5",
            },
          },
          brushSelect: true,
        },
        {
          type: "inside",
        },
      ],
      series: [
        {
          type: "candlestick",
          name: "Day",
          data: ohlc,
          itemStyle: {
            color: "#de453d",
            color0: "#37d14b",
            borderColor: "#de453d",
            borderColor0: "#37d14b",
          },
        },
      ],
    };
    return (
      <>
        <ReactECharts option={options} />
      </>
    );
  }
}

export default CandleStickChart;
