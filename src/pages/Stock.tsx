import { Button, Card, Modal, Space, Table } from "antd";
import { useEffect, useRef, useState } from "react";
import type { ColumnsType } from "antd/es/table/interface";
import Loading from "../components/Loading";
import { NavLink } from "react-router-dom";
import StockAPI from "../api/Stock";
import Star from "../components/Star";
import { TickerTape } from "react-ts-tradingview-widgets";

// stock data type
export interface StockDataType {
  stockCode: string;
  stockName: string;
  datetime: string;
  value: number;
  volume: number;
  turnover: number;
  open: number;
  lastclose: number;
  low: number;
  high: number;
  percent: number;
  isFavourite: number;
  svg: string;
}

function Stock() {
  const [stockList, setStockList] = useState<StockDataType[]>([]); //table data storage
  const [isLoading, setIsLoading] = useState(false); // table loading setup
  const [isModalOpen, setIsModalOpen] = useState(false); // filter modal to open
  // cotrol theme for ticker tape
  const [islighttheme, setIslighttheme] = useState(() => {
    const storage = localStorage.getItem("isLightTheme");
    if (storage) return storage === "true" ? true : false;
    else return false;
  });

  //page query setup
  const [total, setTotal] = useState(10);
  const pageOption = useRef<any>({ page: 1, size: 10 });
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
    const res: any = await StockAPI.getAll(pageOption.current);
    console.log("🚀 ~ file: Stock.tsx:57 ~ fetchStockData ~ res:", res);
    if (res === undefined) {
      setIsLoading(false);
      setStockList([]);
    } else {
      setStockList(res.stockVOList);
      setTotal(res?.total);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchStockData();
  }, []);

  useEffect(() => {
    localStorage.getItem("islighttheme");
  }, [islighttheme]);

  // table column setup
  const columns: ColumnsType<StockDataType> = [
    {
      title: "Symbol",
      dataIndex: "stockCode",
      key: "stockCode",
      render: (_, record) => (
        <Space size="middle">
          <img src={record.svg} style={{width:"32px",height:"32px",borderRadius:"16px"}} alt="" />
          <NavLink to={`/stock/${record.stockCode}`}>
            {record.stockCode}
          </NavLink>
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
      dataIndex: "datetime",
      key: "datetime",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
    },
    {
      title: "Volume",
      dataIndex: "volume",
      key: "volume",
    },
    {
      title: "Turnover",
      dataIndex: "turnover",
      key: "turnover",
    },
    {
      title: "Open",
      dataIndex: "open",
      key: "open",
    },
    {
      title: "Prev Close",
      dataIndex: "lastclose",
      key: "lastclose",
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
    // {
    //   title: "Amplitude",
    //   dataIndex: "amplitude",
    //   key: "amplitude",
    // },
    {
      title: "Percent",
      dataIndex: "percent",
      key: "percent",
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
      <TickerTape colorTheme={islighttheme ? "light" : "dark"}></TickerTape>
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
