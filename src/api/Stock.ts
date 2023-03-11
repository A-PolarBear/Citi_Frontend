import instance from "./index";

const StockAPI = {
  // {
  //   page:
  //   size:
  // }
  // return totalPage
  find: (pageOption: any, value: any) =>
    instance.get("/stocks/q", { params: { ...pageOption, ...value } }),
  getByStockCode: (stockCode: string) => instance.get("/stocks/" + stockCode),
  create: (stockInfo: any) => instance.post("/stockhistories", stockInfo),
  getHistoryByStockCode: (stockCode: string) =>
    instance.get("/stockhistories/" + stockCode),
};

export default StockAPI;
