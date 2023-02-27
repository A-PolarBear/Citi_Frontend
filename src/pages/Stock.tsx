import { Card, Table } from "antd";
import type { ColumnsType} from 'antd/es/table/interface';
import React from "react";

interface DataType {
  symbol: string;
  company: string;
  date: string;
  value: string;
}

function Stock() {

  const columns: ColumnsType<DataType> = [
    {
      title: 'Symbol',
      dataIndex: 'symbol',
      key: 'symbol',
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
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
      // sorter: (a, b) => a.age - b.age,
      // sortOrder: sortedInfo.columnKey === 'age' ? sortedInfo.order : null,
      // ellipsis: true,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
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
  ];
  
  return (
    <>
      <Card>
        <div>
          <title>Stock</title>
        </div>
        <div>
          <Table></Table>
        </div>
      </Card>
    </>
  );
}

export default Stock;
