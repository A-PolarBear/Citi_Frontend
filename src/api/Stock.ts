import instance from "./index"

// const instance = axios.create({
//   // baseURL: "http://127.0.0.1:4523/m1/2376896-0-default",
//   baseURL:"http://localhost:3000/",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

const StockAPI = {
  getAll: () =>
    instance.get("/stock"),
  getBySymbol:(symbol: string) => 
    instance.get("/stock/"+symbol),
  create:(config: any) =>
    instance.post("/stock", Object.assign(config)),
};

export default StockAPI;
