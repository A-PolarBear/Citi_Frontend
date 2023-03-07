import { Button, Card, Space, Table } from "antd";
import { useEffect, useRef, useState } from "react";
import type { ColumnsType } from "antd/es/table/interface";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import StockAPI from "../api/Stock";
import Star from "../components/Star";

// stock data type
export interface StockDataType {
  stockCode: string;
  stockName: string;
  date: string;
  current: number;
  volume: number;
  open: number;
  preClose: number;
  low: number;
  high: number;
  percent: number;
  isFavourite: number;
  svg: string;
}

function Stock() {
  const [stockList, setStockList] = useState<StockDataType[]>([]); //table data storage
  const [isLoading, setIsLoading] = useState(false); // table loading setup
  //page query setup
  const [total, setTotal] = useState(10);
  const pageOption = useRef<any>({ page: 1, size: 5 });
  const paginationProps = {
    total: total,
    current: pageOption.current.page,
    pageSize: pageOption.current.size,
    onChange: (current: any, size: any) => paginationChange(current, size), //分页切换的函数 在下面给到
  };

  async function paginationChange(page: any, size: any) {
    pageOption.current = { page, size };
    fetchStockData();
  }

  async function fetchStockData() {
    setIsLoading(true);
    try{
      const res: any = await StockAPI.getAll(pageOption.current);
      console.log("🚀 ~ file: Stock.tsx:57 ~ fetchStockData ~ res:", res);
      const data = res.stockVOList.map((value: any, index: any) => {
        return { ...res.stockVOList[index], ...res.finnhubList[index] };
      });
      setStockList(data);
      setTotal(res?.total);
      setIsLoading(false);
    }
    catch(error) {
      setIsLoading(false);
      setStockList([]);
    }
    // const res: any = await StockAPI.getAll(pageOption.current);
    // console.log("🚀 ~ file: Stock.tsx:57 ~ fetchStockData ~ res:", res);
  }

  useEffect(() => {
    fetchStockData();
  }, []);

  // table column setup
  const columns: ColumnsType<StockDataType> = [
    {
      title: "Symbol",
      dataIndex: "stockCode",
      key: "stockCode",
      render: (_, record) => (
        <Space size="middle">
          <img
            src={record.svg}
            style={{ width: "32px", height: "32px", borderRadius: "16px" }}
            alt=""
          />
          <Link to={`/stock/${record.stockCode}`} state={record}>
            {record.stockCode}
          </Link>
        </Space>
      ),
    },
    {
      title: "StockName",
      dataIndex: "stockName",
      key: "stockName",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Value",
      dataIndex: "current",
      key: "current",
    },
    {
      title: "Volume",
      dataIndex: "volume",
      key: "volume",
    },
    {
      title: "Open",
      dataIndex: "open",
      key: "open",
    },
    {
      title: "Prev Close",
      dataIndex: "preClose",
      key: "preClose",
    },
    {
      title: "Low",
      dataIndex: "low",
      key: "low",
    },
    {
      title: "High",
      dataIndex: "high",
      key: "high",
    },
    {
      title: "Percent",
      dataIndex: "percent",
      key: "percent",
      render: (_, record) => (
        <div className={record.percent >= 0 ? "price-up" : "price-down"}>
          {record.percent.toFixed(2).toString() + "%"}
        </div>
      ),
    },
    {
      title: "Watchlists",
      dataIndex: "",
      key: "x",
      align: "center",
      width: "16px",
      render: (_, record) => (
        <Star
          height={"20px"}
          width={"20px"}
          status={record.isFavourite ? true : false}
        />
      ),
    },
  ];

  // loading style
  const loading_DIY = <Loading></Loading>;

  return (
    <div>
      <Card
        title="Stock"
        extra={<Button type="primary">导出excel</Button>}
        hoverable={true}
      >
        <div>
          <Table
            columns={columns}
            dataSource={stockList}
            pagination={paginationProps}
            loading={isLoading ? { indicator: loading_DIY } : false}
            rowKey={(record) => record.stockCode}
          ></Table>
        </div>
      </Card>
    </div>
  );
}

export default Stock;
