import instance from "./index"

const StockAPI = {
  // {
  //   page:
  //   size:
  // }
  // return totalPage
  getAll: (config:any) =>
    instance.get("/stock",{data:config}),
  getBySid:(sid: number) => 
    instance.get("/stock/"+sid),
  create:(config: any) =>
    instance.post("/stock", {data:config}),
};

export default StockAPI;
