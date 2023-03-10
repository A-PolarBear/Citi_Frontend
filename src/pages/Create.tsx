import { Button, Input, notification, Calendar, theme, Popover } from "antd";
import StockAPI from "../api/Stock";
import { useState } from "react";
import React from "react";
import createPageImg from "../assets/images/createPageImg.jpg";
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';
import type { Dayjs } from 'dayjs';

// 日历组件：
const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
  console.log(value.format('YYYY-MM-DD'), mode);
};


function Create() {
  // 1.1 input的双向绑定：
  const [stockIdValue, setStockIdValue] = useState("");
  const [volumeValue, setVolumeValue] = useState("");
  const [dateValue, setDateValue] = useState('');
  const [dateStampValue, setDateStampValue] = useState('');
  const [highValue, setHighValue] = useState("");
  const [lowValue, setLowValue] = useState("");
  const [endValue, setEndValue] = useState("");
  const [openValue, setOpenValue] = useState("");
  // 1.2 字段空状态：
  const [stockIdNullState, setStockIdTxtState] = useState(false);
  const [volumeNullState, setVolumeNullState] = useState(false);
  const [dateNullState, setDateNullState] = useState(false);
  const [highValueNullState, setHighValueNullState] = useState(false);
  const [lowValueNullState, setLowValueNullState] = useState(false);
  const [endValueNullState, setEndValueNullState] = useState(false);
  const [openValueNullState, setOpenValueNullState] = useState(false);




  // 2.日历组件：
  const { token } = theme.useToken();

  const wrapperStyle: React.CSSProperties = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  // 2.1 接收用户选择的当前的日历日期的值-calendarSelect事件：
  const calendarSelect = (e: any) => {
    console.log("所选择的当前日期-e.$d：", e.$d)
    // 2.1.1 转化为时间戳(number),需要转为字符串才能赋给dateStampValue，随后才能发给后端：
    console.log((new Date(e.$d)).getTime())
    setDateStampValue(String((new Date(e.$d)).getTime()))

    // 2.1.2 显示在页面上Input框中内容的格式整理：
    const originalDate = new Date(e.$d);
    const year = originalDate.getFullYear();
    const month = (originalDate.getMonth() + 1).toString().padStart(2, "0");
    const day = originalDate.getDate().toString().padStart(2, "0");
    const hours = originalDate.getHours().toString().padStart(2, "0");
    const minutes = originalDate.getMinutes().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
    console.log("formattedDate", formattedDate);
    setDateValue(formattedDate)
  }

  // 2.2 选择日期弹出的气泡框：
  const selectDatePopoverContent = (
    <div style={wrapperStyle}>
      <Calendar fullscreen={false} onPanelChange={onPanelChange} onSelect={calendarSelect} />
    </div>
  );


  // 3. 提交数据：
  const submitData = () => {
    if (stockIdValue === "") {
      setStockIdTxtState(true)
    }
    if (volumeValue === "") {
      setVolumeNullState(true)
    }
    if (dateValue === '') {
      setDateNullState(true)
    }
    if (highValue === "") {
      setHighValueNullState(true)
    }
    if (lowValue === "") {
      setLowValueNullState(true)
    }
    if (endValue === "") {
      setEndValueNullState(true)
    }
    if (openValue === "") {
      setOpenValueNullState(true)
    }
    else {
      // 调用API，发送数据：
      StockAPI.create({
        stockCode: stockIdValue,
        stockrecordDate: Number(dateStampValue),
        stockrecordOpenPrice: Number(openValue),
        stockrecordEndPrice: Number(endValue),
        stockrecordLow: Number(lowValue),
        stockrecordHigh: Number(highValue),
        stockrecordVolume: Number(volumeValue)
      }).then((response: any) => {
        console.log("🚀 ~ file: SignIn.tsx:103 ~ SubmitData ~ response:", response)
        if (response.state === 5000) {
          notification.error({
            message: "Error",
            description: "Error occurred",
            placement: "topRight",
          });
        }
        else {
          notification.success({
            message: "Success",
            description: "Submit success",
            placement: "topRight",
            duration: 1.5,
          });
        }

      }).catch(
        (error) => {
          console.log(error);
        }
      )
    }
  }

  // 重置：
  const reset = () => {
    setStockIdValue("");
    setDateValue("");
    setEndValue("");
    setLowValue("");
    setOpenValue("");
    setVolumeValue("");
    setHighValue("");
    setStockIdTxtState(false)
    setVolumeNullState(false)
    setDateNullState(false)
    setHighValueNullState(false)
    setLowValueNullState(false)
    setEndValueNullState(false)
    setOpenValueNullState(false)
  };

  return (
    <>
      <div className="createPage">
        {/* 1. 卡片左侧： */}
        <div className="createLeftBox flex-auto">
          <div className="createLittleLeftBox">
            {/* 1.1 左侧竖栏： */}
            <div className="LeftColumn">
              <div className="inputUnit">
                <div className="infoTXT">Stock Code *</div>
                <Input
                  placeholder="Enter the stock code"
                  className="Input"
                  value={stockIdValue}
                  status={stockIdNullState ? "error" : ""}
                  onChange={(e) => {
                    console.log("e.target.value", e.target.value);
                    setStockIdValue(e.target.value);
                    setStockIdTxtState(false)
                  }}
                />
                <div className="emailNullTxt" style={stockIdNullState ? { display: "" } : { display: "none" }}>Please input the stock code!</div>
              </div>

              <div className="inputUnit">
                <div className="infoTXT">Open *</div>
                <Input
                  placeholder="Enter the open price"
                  className="Input"
                  value={openValue}
                  status={openValueNullState ? "error" : ""}
                  onChange={(e) => {
                    console.log("e.target.value", e.target.value);
                    setOpenValueNullState(false)
                    setOpenValue(e.target.value);
                  }}
                />
                <div className="emailNullTxt" style={openValueNullState ? { display: "" } : { display: "none" }}>Please input the open price!</div>
              </div>

              <div className="inputUnit">
                <div className="infoTXT">Low *</div>
                <Input
                  className="Input"
                  value={lowValue}
                  placeholder="Enter the low price"
                  status={lowValueNullState ? "error" : ""}
                  onChange={(e) => {
                    console.log("e.target.value", e.target.value);
                    setLowValueNullState(false)
                    setLowValue(e.target.value);
                  }}
                />
                <div className="emailNullTxt" style={lowValueNullState ? { display: "" } : { display: "none" }}>Please input the low price!</div>
              </div>

              <Popover content={selectDatePopoverContent} title="Calendar" placement="left">
                <div className="inputUnit">
                  <div className="infoTXT">Date *</div>
                  <Input
                    placeholder="Select the date"
                    className="Input"
                    value={dateValue}
                    status={dateNullState ? "error" : ""}
                    onChange={(e) => {
                      console.log("e.target.value", e.target.value);
                      setDateNullState(false)
                      setDateValue(e.target.value);
                    }}
                  />
                  <div className="emailNullTxt" style={dateNullState ? { display: "" } : { display: "none" }}>Please input the update date!</div>
                </div>
              </Popover>



            </div>
            {/* 1.2 右侧竖栏： */}
            <div className="RightColumn">
              <div style={{ display: "flex", flexDirection: "column" }}>

                <div className="inputUnit">
                  <div className="infoTXT">Volume *</div>
                  <Input
                    placeholder="Enter the volume"
                    className="Input"
                    value={volumeValue}
                    status={volumeNullState ? "error" : ""}
                    onChange={(e) => {
                      console.log("e.target.value", e.target.value);
                      setVolumeNullState(false)
                      setVolumeValue(e.target.value);
                    }}
                  />
                  <div className="emailNullTxt" style={volumeNullState ? { display: "" } : { display: "none" }}>Please input the volume!</div>
                </div>

                <div className="inputUnit">
                  <div className="infoTXT">Close *</div>
                  <Input
                    placeholder="Enter the close price"
                    className="Input"
                    value={endValue}
                    status={endValueNullState ? "error" : ""}
                    onChange={(e) => {
                      console.log("e.target.value", e.target.value);
                      setEndValueNullState(false)
                      setEndValue(e.target.value);
                    }}
                  />
                  <div className="emailNullTxt" style={endValueNullState ? { display: "" } : { display: "none" }}>Please input the close price!</div>
                </div>


                <div className="inputUnit">
                  <div className="infoTXT">High *</div>
                  <Input
                    placeholder="Enter the high price"
                    className="Input"
                    value={highValue}
                    status={highValueNullState ? "error" : ""}
                    onChange={(e) => {
                      console.log("e.target.value", e.target.value);
                      setHighValueNullState(false)
                      setHighValue(e.target.value);
                    }}
                  />
                  <div className="emailNullTxt" style={highValueNullState ? { display: "" } : { display: "none" }}>Please input the high price!</div>
                </div>
                <div style={{ marginTop: "20%" }} className="flex flex-col justify-start sm:items-center sm:flex-row">
                  <Button type="primary" className="createSubmitButton mb-2 w-16 sm:mb-0 sm:mr-3" onClick={submitData}>
                    submit
                  </Button>
                  <Button
                    type="default"
                    className="creatResetButton"
                    onClick={reset}
                  >
                    reset
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. 卡片右侧 */}
        <div className="createRIghtBox hidden  md:block">
          <img src={createPageImg} className="createPageImg" alt="" />
        </div>
      </div>
    </>
  );
}

export default Create;
