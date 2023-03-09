import { Button, Card, Form, Input, Space, Table } from "antd";
import { useEffect, useRef, useState } from "react";
import type { ColumnsType } from "antd/es/table/interface";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import StockAPI from "../api/Stock";
import Star from "../components/Star";
import { formatNumber } from "../utils";

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
    try {
      const res: any = await StockAPI.getAll(pageOption.current);
      console.log("🚀 ~ file: Stock.tsx:57 ~ fetchStockData ~ res:", res);
      const data = res.data.stockVOList.map((value: any, index: any) => {
        return {
          ...res.data.stockVOList[index],
          ...res.data.finnhubList[index],
        };
      });
      setStockList(data);
      setTotal(res.data.total);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setStockList([]);
    }
  }

  useEffect(() => {
    fetchStockData();
  }, []);

  const findHandler = async (e:any,all:any)=>{
    setIsLoading(true);
    try {
      const res: any = await StockAPI.find(pageOption.current,all);
      const data = res.data.stockVOList.map((value: any, index: any) => {
        return {
          ...res.data.stockVOList[index],
          ...res.data.finnhubList[index],
        };
      });
      setStockList(data);
      // setTotal(res.data.total);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setStockList([]);
    }
  }

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
          <Link to={`/stock/${record.stockCode}`}>{record.stockCode}</Link>
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
      render: (_, record) => formatNumber(record.current.toFixed(2)),
    },
    {
      title: "Volume",
      dataIndex: "volume",
      key: "volume",
      // render:(_,record)=>formatNumber(record.volume)
    },
    {
      title: "Open",
      dataIndex: "open",
      key: "open",
      render: (_, record) => formatNumber(record.open.toFixed(2)),
    },
    {
      title: "Prev Close",
      dataIndex: "preClose",
      key: "preClose",
      render: (_, record) => formatNumber(record.preClose.toFixed(2)),
    },
    {
      title: "Low",
      dataIndex: "low",
      key: "low",
      render: (_, record) => formatNumber(record.low.toFixed(2)),
    },
    {
      title: "High",
      dataIndex: "high",
      key: "high",
      render: (_, record) => formatNumber(record.high.toFixed(2)),
    },
    {
      title: "Percent",
      dataIndex: "percent",
      key: "percent",
      render: (_, record) => (
        <div className={record.percent >= 0 ? "price-up" : "price-down"}>
          {record.percent >= 0
            ? "+" + record.percent.toFixed(2).toString() + "%"
            : record.percent.toFixed(2).toString() + "%"}
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
          stockCode={record.stockCode}
          status={record.isFavourite ? true : false}
        />
      ),
    },
  ];

  // loading style
  const loading_DIY = <Loading></Loading>;

  return (
    <div>
      <Card title="Stock" hoverable={true}>
        <div>
          <Form style={{display:"flex",justifyContent:"space-between"}} onValuesChange={findHandler}>
          <div style={{flex:"1 auto"}}>
            <Form.Item
              label="Symbol"
              name="stockCode"
              rules={[
                { required: false, message: "Please input Symbol" },
              ]}
              style={{
                display: "inline-block",
                width: "calc(25% - 24px)",
                marginRight: "12px",
              }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="StockName"
              name="stockName"
              rules={[
                { required: false, message: "Please input stock name!" },
              ]}
              style={{ display: "inline-block", width: "calc(25% - 8px)" }}
            >
              <Input />
            </Form.Item>
            </div>
            <Form.Item style={{ display: "inline-block", textAlign: "right" }}>
              <Button htmlType="submit" type="primary" style={{backgroundColor: "#1677ff"}}>
                Submit
              </Button>
            </Form.Item>
          </Form>
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
