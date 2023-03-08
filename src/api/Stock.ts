import instance from "./index"

// const instance = axios.create({
//   // baseURL: "http://127.0.0.1:4523/m1/2376896-0-default",
//   baseURL:"http://localhost:3000/",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

const StockAPI = {
  // {
  //   page:
  //   size:
  // }
  // return totalPage
<<<<<<< HEAD
  getAll: (config:any) =>
    instance.get("/stocks",{data:config}),
  getBySid:(sid: number) => 
    instance.get("/stocks/"+sid),
  create:(config: any) =>
    instance.post("/stocks", {data:config}),
=======
  getAll: (pageOption:any) =>
    instance.get("/stocks",{params:pageOption}),
  getByStockCode:(stockCode: string) => 
    instance.get("/stocks/"+stockCode),
  create:(config: any) =>
    instance.post("/stocks", {data:config}),
  getHistoryByStockCode:(stockCode:string)=>
  instance.get("/stockhistories/"+stockCode),
>>>>>>> fix
};

export default StockAPI;
