var Mock = require("mockjs");

const data = Mock.mock({
  "stockList|200": [
    {
      sid: "@increment(1)",
      stockCode: "@last",
      stockName: "@title",
      date: "@date",
      value: "@float(2,500,2,2)",
      volume: "@float(2,500,2,2)",
      turnover: "@float(2,500,2,2)",
      open: "@float(2,500,2,2)",
      lastclose: "@float(2,500,2,2)",
      low: "@float(2,500,2,2)",
      high: "@float(2,500,2,2)",
      percent: "@float(2,500,2,2)",
    },
  ],
});

Mock.mock(RegExp("mock/stock/.*"), "get", (options) => {
    const stockCode = options.url.split("/").slice(-1).toString();
    const res = data.stockList.find(item=>item.stockCode===stockCode);
    if(res){
      return {
        code: 200,
        success: true,
        message: "获取用户列表成功",
        data: res,
        totalPage: data.stockList.length,
      };
    }
  });



Mock.mock(RegExp("mock/stock"), "get", (options) => {
  const body = JSON.parse(options.body);
  const pageSize = body.size;
  const currentPage = body.page;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = pageSize * currentPage;
  const totalPage = Math.ceil(data.stockList.length / pageSize);

  const newDataArr =
    currentPage > totalPage ? [] : data.stockList.slice(startIndex, endIndex)


  return {
    code: 200,
    success: true,
    message: "获取用户列表成功",
    data: newDataArr,
    totalPage: data.stockList.length,
  };
});
