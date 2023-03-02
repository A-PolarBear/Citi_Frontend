import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:4523/m1/2376896-0-default",
  headers: {
    "Content-Type": "application/json",
  },
});

const getDelayConfig = () => ({
  params: {},
});

const StockAPI = {
  getAll: (config: any) =>
    instance.get("/stock", Object.assign(getDelayConfig(), config)),
  getBySymbol:(config: any,symbol: string) => 
  instance.get("/stock/"+symbol, Object.assign(getDelayConfig(), config)),
};

export default StockAPI;
