import instance from "./index"

const StockAPI = {
  // {
  //   page:
  //   size:
  // }
  // return totalPage
  getAll: (pageOption:any) =>
    instance.get("/stocks",{params:pageOption}),
  getByStockCode:(stockCode: string) => 
    instance.get("/stocks/"+stockCode),
  create:(config: any) =>
    instance.post("/stocks", {data:config}),
  getHistoryByStockCode:(stockCode:string)=>
  instance.get("/stockhistories/"+stockCode),
};

export default StockAPI;
