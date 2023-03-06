import instance from "./index"

<<<<<<< HEAD
// const instance = axios.create({
//   // baseURL: "http://127.0.0.1:4523/m1/2376896-0-default",
//   baseURL:"http://localhost:3000/",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

=======
>>>>>>> cff4adf59b816ba678c0334a4f09e91748803321
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
