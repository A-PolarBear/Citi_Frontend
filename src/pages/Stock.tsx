import { Button, Card, Modal, Space, Table } from "antd";
import { useEffect, useRef, useState } from "react";
import type { ColumnsType } from "antd/es/table/interface";
import Loading from "../components/Loading";
import { NavLink } from "react-router-dom";
import StockAPI from "../api/Stock";
import Star from "../components/Star";
import { TickerTape } from "react-ts-tradingview-widgets";

export interface StockDataType {
  sid: number;
  symbol: string;
  company: string;
  date: string;
  value: number;
  volume: number;
  turnover: number;
  open: number;
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
  const [islighttheme, setIslighttheme] = useState(() => {
    const storage = localStorage.getItem("isLightTheme");
    if (storage) return storage === "true" ? true : false;
    else return false;
  });
  const pageOption = useRef<any>({ page: 1, size: 10 });

  async function fetchStockData() {
    setIsLoading(true);
    const res: any = await StockAPI.getAll(pageOption.current);
    setStockList(res.data);
    setIsLoading(false);
    setTotal(res?.totalPage);
    console.log(res);
  }

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

  useEffect(() => {
    fetchStockData();
  }, []);

  useEffect(() => {
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
      title: "Company",
      dataIndex: "company",
      key: "company",
      // sorter: (a, b) => a.age - b.age,
      // sortOrder: sortedInfo.columnKey === 'age' ? sortedInfo.order : null,
      // ellipsis: true,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
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
      title: "Close",
      dataIndex: "close",
      key: "close",
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
      title: "Amplitude",
      dataIndex: "amplitude",
      key: "amplitude",
    },
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
      render: (_, record) => <Star />,
    },
  ];

  const loading_hamster = <Loading></Loading>;

  return (
    <div>
      <TickerTape colorTheme={islighttheme?"light":"dark"}></TickerTape>
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
            rowKey={(record) => record.sid}
          ></Table>
        </div>
      </Card>
    </div>
  );
}

export default Stock;
