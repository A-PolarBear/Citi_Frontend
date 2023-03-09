import instance from "./index";

const StockAPI = {
  // {
  //   page:
  //   size:
  // }
  // return totalPage
  getAll: (pageOption: any) => instance.get("/stocks", { params: pageOption }),
  getByStockCode: (stockCode: string) => instance.get("/stocks/" + stockCode),
  create: (config: any) => instance.post("/stockhistories", { data: config }),
  getHistoryByStockCode: (stockCode: string) =>
    instance.get("/stockhistories/" + stockCode),
  find: (pageOption:any,value:any) => instance.get("/stocks/q",{ params: {...pageOption,...value}})
};

export default StockAPI;
