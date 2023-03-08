import { Button, Input } from "antd";
import StockAPI from "../api/Stock";
import { useState } from "react";
import type { FormInstance } from "antd/es/form";
import React from "react";
import createPageImg from "../assets/images/createPageImg.jpg";

function Create() {
  const [stockIdValue, setStockIdValue] = useState("");
  const [value, setValue] = useState("");
  const [turnoverValue, setTurnoverValue] = useState("");
  const [lowValue, setLowValue] = useState("");
  const [percentValue, setPercentValue] = useState("");
  const [volumeValue, setVolumeValue] = useState("");
  const [highValue, setHighValue] = useState("");

  // 重置：
  const reset = () => {
    setStockIdValue("");
    setValue("");
    setTurnoverValue("");
    setLowValue("");
    setPercentValue("");
    setVolumeValue("");
    setHighValue("");
  };

  return (
    <>
      <div className="createPage">
        {/* 1. 卡片左侧： */}
        <div className="createLeftBox">
          <div className="createLittleLeftBox">
            {/* 1.1 左侧竖栏： */}
            <div className="LeftColumn">
              <div className="inputUnit">
                <div className="infoTXT">Stock Id *</div>
                <Input
                  placeholder="Please input your stock id"
                  className="Input"
                  value={stockIdValue}
                  // status={pwdNullTxtState ? "error" : ""}
                  onChange={(e) => {
                    console.log("e.target.value", e.target.value);
                    setStockIdValue(e.target.value);
                  }}
                />
                {/* <div className="emailNullTxt" style={pwdNullTxtState ? { display: "" } : { display: "none" }}>Please input your password!</div> */}
              </div>

              <div className="inputUnit">
                <div className="infoTXT">Value *</div>
                <Input
                  placeholder="Please input the value"
                  className="Input"
                  value={value}
                  // status={pwdNullTxtState ? "error" : ""}
                  onChange={(e) => {
                    console.log("e.target.value", e.target.value);
                    setValue(e.target.value);
                  }}
                />
                {/* <div className="emailNullTxt" style={pwdNullTxtState ? { display: "" } : { display: "none" }}>Please input your password!</div> */}
              </div>

              <div className="inputUnit">
                <div className="infoTXT">Turnover *</div>
                <Input
                  placeholder="Please input the turnover"
                  className="Input"
                  value={turnoverValue}
                  // status={pwdNullTxtState ? "error" : ""}
                  onChange={(e) => {
                    console.log("e.target.value", e.target.value);
                    setTurnoverValue(e.target.value);
                  }}
                />
                {/* <div className="emailNullTxt" style={pwdNullTxtState ? { display: "" } : { display: "none" }}>Please input your password!</div> */}
              </div>

              <div className="inputUnit">
                <div className="infoTXT">Low *</div>
                <Input
                  placeholder="Please input the low price"
                  className="Input"
                  value={lowValue}
                  // status={pwdNullTxtState ? "error" : ""}
                  onChange={(e) => {
                    console.log("e.target.value", e.target.value);
                    setLowValue(e.target.value);
                  }}
                />
                {/* <div className="emailNullTxt" style={pwdNullTxtState ? { display: "" } : { display: "none" }}>Please input your password!</div> */}
              </div>
            </div>
            {/* 1.2 右侧竖栏： */}
            <div className="RightColumn">
              <div style={{display:"flex",flexDirection:"column"}}>
                <div className="inputUnit">
                  <div className="infoTXT">Percent *</div>
                  <Input
                    placeholder="Please input the percent"
                    className="Input"
                    value={percentValue}
                    // status={pwdNullTxtState ? "error" : ""}
                    onChange={(e) => {
                      console.log("e.target.value", e.target.value);
                      setPercentValue(e.target.value);
                    }}
                  />
                  {/* <div className="emailNullTxt" style={pwdNullTxtState ? { display: "" } : { display: "none" }}>Please input your password!</div> */}
                </div>

                <div className="inputUnit">
                  <div className="infoTXT">Volume *</div>
                  <Input
                    placeholder="Please input the volume"
                    className="Input"
                    value={volumeValue}
                    // status={pwdNullTxtState ? "error" : ""}
                    onChange={(e) => {
                      console.log("e.target.value", e.target.value);
                      setVolumeValue(e.target.value);
                    }}
                  />
                  {/* <div className="emailNullTxt" style={pwdNullTxtState ? { display: "" } : { display: "none" }}>Please input your password!</div> */}
                </div>

                <div className="inputUnit">
                  <div className="infoTXT">High *</div>
                  <Input
                    placeholder="Please input the high price"
                    className="Input"
                    value={highValue}
                    // status={pwdNullTxtState ? "error" : ""}
                    onChange={(e) => {
                      console.log("e.target.value", e.target.value);
                      setHighValue(e.target.value);
                    }}
                  />
                  {/* <div className="emailNullTxt" style={pwdNullTxtState ? { display: "" } : { display: "none" }}>Please input your password!</div> */}
                </div>
                <div style={{ marginTop:"20%"}}>
                  <Button type="primary" className="createSubmitButton">
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
        <div className="createRIghtBox">
          <img src={createPageImg} className="createPageImg" alt="" />
        </div>
      </div>
    </>
  );
}

export default Create;
