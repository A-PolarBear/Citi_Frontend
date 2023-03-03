import { Button, Card, Modal, Space, Table } from "antd";
import { useEffect, useState } from "react";
import type { ColumnsType } from "antd/es/table/interface";
import Loading from "../components/Loading";
import { NavLink } from "react-router-dom";
import StockAPI from "../api/Stock";
import Star from "../components/Star";

export interface StockDataType {
  sid: number;
  symbol: string;
  company: string;
  date: string;
  value: number;
  volume: number;
  turnover: number;
  open:number,
  close:number,
  low: number;
  high: number;
  amplitude: number;
  percent: number;
}

function Stock() {
  const [stockList, setStockList] = useState<StockDataType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchStockData() {
      setIsLoading(true);
      const res: any = await StockAPI.getAll();
      setStockList(res.data);
      setIsLoading(false);
      console.log(res);
    }
    fetchStockData();
  }, []);

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
          <NavLink to={`/stock/${record.symbol}`}>{record.symbol}</NavLink>
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
      <Card title="Stock" extra={<Button type="primary">导出excel</Button>} hoverable={true}>
        <div>
          <Button type="primary" onClick={()=>setIsModalOpen(true) }>
            Open Modal
          </Button>
          <Modal title="Basic Modal" open={isModalOpen} onCancel={()=>setIsModalOpen(false)}  footer={null}></Modal>
          <Table
            columns={columns}
            dataSource={stockList}
            pagination={{ hideOnSinglePage: true, defaultPageSize: 10 }}
            loading={isLoading ? { indicator: loading_hamster } : false}
            rowKey={(record) => record.sid}
          ></Table>
        </div>
      </Card>
    </div>
  );
}

export default Stock;
