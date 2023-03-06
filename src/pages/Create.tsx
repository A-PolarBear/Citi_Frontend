import { Button, Card, Form, Input} from "antd";
import StockAPI from "../api/Stock";
import { useState } from "react";

function Create() {
  const [issuccess, setIsSuccess] = useState(false);
  const onFinish = async (values: any) => {
    setIsSuccess(true);
    const res = await StockAPI.create({
      body: values,
    })
    setIsSuccess(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Card>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          disabled={issuccess}
        >
          <Form.Item
            label="StockSymbol"
            name="stockSymbol"
            rules={[
              { required: true, message: "Please input your stockSymbol!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="stockName"
            name="stockName"
            rules={[
              { required: true, message: "Please input your stockName!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
}

export default Create;
