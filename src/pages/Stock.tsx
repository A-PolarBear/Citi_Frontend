import { Button, Card, Modal, Space, Table } from "antd";
import { useEffect, useRef, useState } from "react";
import type { ColumnsType } from "antd/es/table/interface";
import Loading from "../components/Loading";
import { NavLink } from "react-router-dom";
import StockAPI from "../api/Stock";
import Star from "../components/Star";
import { TickerTape } from "react-ts-tradingview-widgets";

<<<<<<< HEAD
export interface StockDataType {
  sid: number;
  symbol: string;
  company: string;
  date: string;
=======
// stock data type
export interface StockDataType {
  stockCode: string;
  stockName: string;
  datetime: string;
>>>>>>> cff4adf59b816ba678c0334a4f09e91748803321
  value: number;
  volume: number;
  turnover: number;
  open: number;
<<<<<<< HEAD
  close: number;
  low: number;
  high: number;
  amplitude: number;
  percent: number;
}

function Stock() {
  const [stockList, setStockList] = useState<StockDataType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [total, setTotal] = useState(10);
=======
  lastclose: number;
  low: number;
  high: number;
  percent: number;
}


function Stock() {
  const [stockList, setStockList] = useState<StockDataType[]>([]); //table data storage
  const [isLoading, setIsLoading] = useState(false); // table loading setup
  const [isModalOpen, setIsModalOpen] = useState(false); // filter modal to open
  // cotrol theme for ticker tape
>>>>>>> cff4adf59b816ba678c0334a4f09e91748803321
  const [islighttheme, setIslighttheme] = useState(() => {
    const storage = localStorage.getItem("isLightTheme");
    if (storage) return storage === "true" ? true : false;
    else return false;
  });
<<<<<<< HEAD
  const pageOption = useRef<any>({ page: 1, size: 10 });
=======

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
>>>>>>> cff4adf59b816ba678c0334a4f09e91748803321

  async function fetchStockData() {
    setIsLoading(true);
    const res: any = await StockAPI.getAll(pageOption.current);
    setStockList(res.data);
    setIsLoading(false);
    setTotal(res?.totalPage);
    console.log(res);
  }

<<<<<<< HEAD
  async function paginationChange(page: any, size: any) {
    pageOption.current = { page, size };
    console.log(
      "🚀 ~ file: Stock.tsx:44 ~ paginationChange ~ pageOption.current:",
      pageOption.current
    );

    fetchStockData();
  }

  const paginationProps = {
    total: total,
    current: pageOption.current.page,
    pageSize: pageOption.current.size,
    onChange: (current: any, size: any) => paginationChange(current, size), //分页切换的函数 在下面给到
  };

=======
>>>>>>> cff4adf59b816ba678c0334a4f09e91748803321
  useEffect(() => {
    fetchStockData();
  }, []);

  useEffect(() => {
<<<<<<< HEAD
    const item = localStorage.getItem("islighttheme")
    console.log("🚀 ~ file: Stock.tsx:70 ~ useEffect ~ item:", item)
}, [])

  const columns: ColumnsType<StockDataType> = [
    // {
    //   title: "Sid",
    //   dataIndex: "sid",
    //   key: "sid",
    // },
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
      render: (_, record) => (
        <Space size="middle">
          <NavLink to={`/stock/${record.sid}`}>{record.symbol}</NavLink>
=======
    localStorage.getItem("islighttheme");
  }, []);

  // table column setup
  const columns: ColumnsType<StockDataType> = [
    {
      title: "Symbol",
      dataIndex: "stockCode",
      key: "stockCode",
      render: (_, record) => (
        <Space size="middle">
          <NavLink to={`/stock/${record.stockCode}`}>{record.stockCode}</NavLink>
>>>>>>> cff4adf59b816ba678c0334a4f09e91748803321
        </Space>
      ),
      // filters: [
      //   { text: 'Joe', value: 'Joe' },
      //   { text: 'Jim', value: 'Jim' },
      // ],
      // filteredValue: filteredInfo.name || null,
      // onFilter: (value: string, record) => record.name.includes(value),
      // sorter: (a, b) => a.name.length - b.name.length,
      // sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
      // ellipsis: true,
    },
    {
<<<<<<< HEAD
      title: "Company",
      dataIndex: "company",
      key: "company",
=======
      title: "StockName",
      dataIndex: "stockName",
      key: "stockName",
>>>>>>> cff4adf59b816ba678c0334a4f09e91748803321
      // sorter: (a, b) => a.age - b.age,
      // sortOrder: sortedInfo.columnKey === 'age' ? sortedInfo.order : null,
      // ellipsis: true,
    },
    {
      title: "Date",
<<<<<<< HEAD
      dataIndex: "date",
      key: "date",
=======
      dataIndex: "datetime",
      key: "datetime",
>>>>>>> cff4adf59b816ba678c0334a4f09e91748803321
      // filters: [
      //   { text: 'London', value: 'London' },
      //   { text: 'New York', value: 'New York' },
      // ],
      // filteredValue: filteredInfo.address || null,
      // onFilter: (value: string, record) => record.address.includes(value),
      // sorter: (a, b) => a.address.length - b.address.length,
      // sortOrder: sortedInfo.columnKey === 'address' ? sortedInfo.order : null,
      // ellipsis: true,
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      // filters: [
      //   { text: 'London', value: 'London' },
      //   { text: 'New York', value: 'New York' },
      // ],
      // filteredValue: filteredInfo.address || null,
      // onFilter: (value: string, record) => record.address.includes(value),
      // sorter: (a, b) => a.address.length - b.address.length,
      // sortOrder: sortedInfo.columnKey === 'address' ? sortedInfo.order : null,
      // ellipsis: true,
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
<<<<<<< HEAD
      title: "Close",
      dataIndex: "close",
      key: "close",
=======
      title: "Prev Close",
      dataIndex: "lastclose",
      key: "lastclose",
>>>>>>> cff4adf59b816ba678c0334a4f09e91748803321
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
<<<<<<< HEAD
    {
      title: "Amplitude",
      dataIndex: "amplitude",
      key: "amplitude",
    },
=======
    // {
    //   title: "Amplitude",
    //   dataIndex: "amplitude",
    //   key: "amplitude",
    // },
>>>>>>> cff4adf59b816ba678c0334a4f09e91748803321
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
<<<<<<< HEAD
      render: (_, record) => <Star />,
    },
  ];

=======
      render: (_, record) => <Star height={"20px"} width={"20px"}/>,
    },
  ];

  // loading style
>>>>>>> cff4adf59b816ba678c0334a4f09e91748803321
  const loading_hamster = <Loading></Loading>;

  return (
    <div>
<<<<<<< HEAD
      <TickerTape colorTheme={islighttheme?"light":"dark"}></TickerTape>
=======
      <TickerTape colorTheme={islighttheme ? "light" : "dark"}></TickerTape>
>>>>>>> cff4adf59b816ba678c0334a4f09e91748803321
      <Card
        title="Stock"
        extra={<Button type="primary">导出excel</Button>}
        hoverable={true}
      >
        <div>
          <Button type="primary" onClick={() => setIsModalOpen(true)}>
            Open Modal
          </Button>
          <Modal
            title="Basic Modal"
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            footer={null}
          ></Modal>
          <Table
            columns={columns}
            dataSource={stockList}
            pagination={paginationProps}
            loading={isLoading ? { indicator: loading_hamster } : false}
<<<<<<< HEAD
            rowKey={(record) => record.sid}
=======
            rowKey={(record) => record.stockCode}
>>>>>>> cff4adf59b816ba678c0334a4f09e91748803321
          ></Table>
        </div>
      </Card>
    </div>
  );
}

export default Stock;
