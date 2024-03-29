import { Button, Card, Form, Input, Space, Table } from "antd";
import { useEffect, useRef, useState } from "react";
import type { ColumnsType } from "antd/es/table/interface";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import StockAPI from "../api/Stock";
import Star from "../components/Star";
import { formatNumber, numFormat } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";

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
  const findRef = useRef<any>({ stockCode: "", stockName: "" });
  const pageOption = useRef<any>({ page: 1, size: 5 });
  const paginationProps = {
    responsive: true,
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
      console.log(findRef);
      if (findRef.current.stockCode === undefined)
        findRef.current.stockCode = "";
      if (findRef.current.stockName === undefined)
        findRef.current.stockName = "";
      const res: any = await StockAPI.find(pageOption.current, findRef.current);
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

  async function fetchRealTimeStockData() {
    try {
      console.log(findRef);
      if (findRef.current.stockCode === undefined)
        findRef.current.stockCode = "";
      if (findRef.current.stockName === undefined)
        findRef.current.stockName = "";
      const res: any = await StockAPI.find(pageOption.current, findRef.current);
      const data = res.data.stockVOList.map((value: any, index: any) => {
        return {
          ...res.data.stockVOList[index],
          ...res.data.finnhubList[index],
        };
      });
      setStockList(data);
      setTotal(res.data.total);
    } catch (error) {
      setStockList([]);
    }
  }

  useEffect(() => {
    fetchStockData();
    const timerId = setInterval(() => {
      fetchRealTimeStockData();
    }, 15 * 1000 + Math.floor(Math.random() * 5));
    return () => clearTimeout(timerId);
  }, []);

  // table column setup
  const columns: ColumnsType<StockDataType> = [
    {
      title: "Symbol",
      dataIndex: "stockCode",
      key: "stockCode",
      width: "120px",
      render: (_, record) => (
        <div style={{ wordWrap: "break-word", wordBreak: "break-word" }}>
          <Space size="small">
            <img
              src={record.svg}
              style={{ width: "32px", height: "32px", borderRadius: "16px" }}
              alt=""
            />
            <Link to={`/stock/${record.stockCode}`}>{record.stockCode}</Link>
          </Space>
        </div>
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
      render: (_, record) => numFormat(record.volume, 3),
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
    <div className="mt-2">
      <Card hoverable={true}>
        <div>
          <Form
            style={{ display: "flex", justifyContent: "space-between" }}
            className="items-center"
            onValuesChange={(e, all) => {
              findRef.current = all;
            }}
          >
            <div className="flex mr-2">
              <Form.Item
                label="Symbol"
                name="stockCode"
                style={{
                  display: "inline-block",
                  marginRight: "12px",
                }}
                className="w-1/2 md:w-1/2"
              >
                <Input prefix={<FontAwesomeIcon icon={faMagnifyingGlass}/>}/>
              </Form.Item>
              <Form.Item
                label="StockName"
                name="stockName"
                style={{ display: "inline-block" }}
                className="w-1/2 md:w-1/2"
              >
                <Input prefix={<FontAwesomeIcon icon={faMagnifyingGlass}/>} />
              </Form.Item>
            </div>
            <Form.Item
              style={{ display: "inline-block", textAlign: "right" }}
              className="pt-8 sm:pt-0"
            >
              <Button
                htmlType="submit"
                type="primary"
                style={{ backgroundColor: "#1677ff" }}
                onClick={fetchStockData}
              >
                <span style={{ paddingLeft: "4px" }}>Filter</span>
              </Button>
            </Form.Item>
          </Form>
          <Table
            scroll={{ x: "max-content" }}
            columns={columns}
            dataSource={stockList}
            pagination={paginationProps}
            loading={isLoading ? { indicator: loading_DIY } : false}
            rowKey={(record) => record.stockCode}
            className="overflow-auto"
          ></Table>
        </div>
      </Card>
    </div>
  );
}

export default Stock;
