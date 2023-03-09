import React, { useEffect, useState } from "react";
// import signUpCardImg from "../assets/images/signUp.png";
import signUpCardImg from "../assets/images/signBg-1.png"
// import signUpCardImg from "../assets/images/signBg-2.jpg"
import signUpLogo from "../assets/images/signLogo.png";
import backToSignIn from "../assets/images/back.png";
import signUpProtocalImg from "../assets/images/signUpProtocalImg.png"
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Input, Tooltip, Button, Checkbox, Divider, Modal, notification, Space } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { Link } from "react-router-dom";
import LoginAPI from "../api/Sign"




function SignUp(props: any) {
  // 没有勾选协议时的提示框：
  const openNotification = () => {
    notification.open({
      message: 'Notification',
      description:
        'You don\'t agree the Terms and Conditions  ',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };

  // input框数据的双向绑定:
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [emailNullTxtState, setEmailNullTxtState] = useState(false);
  const [pwdNullTxtState, setPwdNullTxtState] = useState(false);

  // 协议弹出框的状态：
  const [agreeState, setAgreeState] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
    console.log("isModalOpen", isModalOpen)
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // 勾选协议的复选框状态：
  const agreeChange = (e: CheckboxChangeEvent) => {
    console.log(`checked_box = ${e.target.checked}`);
    setAgreeState(e.target.checked)
  };


  // sign up按钮 - 提交【邮箱（用户名）】+【密码】数据：
  const SubmitData = () => {
    if (emailValue == '') {
      setEmailNullTxtState(true)
    }
    if (passwordValue == '') {
      setPwdNullTxtState(true)
    }
    else {
      if (!agreeState) {
        console.log("没勾协议！")
        openNotification()
      }
      else {
        console.log("开始提交数据了！")
        LoginAPI.signUp({ stocksystemuserName: emailValue, stocksystemuserPassword: passwordValue });
      }
    }
  };


  return (

    <div className="signUpPage">
      <div className="signUpCard">
        <div className="signUpCardLeft">
          <div className="LeftLittle">
            <div className="headerImgBox">
              <img src={signUpLogo} alt="" className="signUpLogoImg" />
              <Link to="/signIn">
                <img src={backToSignIn} alt="" className="backToSignInImg" />
              </Link>
            </div>
            <div className="LeftTXT1">Sign Up</div>
            <div className="LeftTXT2">Enter to get access to data & information.</div>

            <div className="inputUnit">
              <div className="infoTXT">Email *</div>
              <Input
                placeholder="Enter your mail address"
                prefix={<UserOutlined className="site-form-item-icon" />}
                suffix={
                  <Tooltip title="请输入邮箱地址">
                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                  </Tooltip>
                }
                className="Input"
                value={emailValue}
                onChange={e => {
                  setEmailValue(e.target.value);
                  console.log("emailValue", emailValue)
                }}
                status={emailNullTxtState ? "error" : ""}
              />
              <div className="emailNullTxt"
                style={emailNullTxtState ? { display: "" } : { display: "none" }}>Please input your email!</div>
            </div>

            <div className="inputUnit">
              <div className="infoTXT">Password *</div>
              <Input.Password placeholder="input password" className="Input" value={passwordValue}
                status={pwdNullTxtState ? "error" : ""}
                onChange={e => {
                  console.log("e.target.value", e.target.value)
                  setPasswordValue(e.target.value);
                }} />
              <div className="emailNullTxt" style={pwdNullTxtState ? { display: "" } : { display: "none" }}>Please input your password!</div>
            </div>

            <div className="remember">

              <Checkbox onChange={agreeChange} checked={agreeState}>
                I agree the{" "}
              </Checkbox>
              <span onClick={showModal} className="signUpProtocal">
                Terms and Conditions
              </span>
              {/* 协议内容： */}
              <Modal title="Terms and Conditions" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} className="protocalModal">
                <p>Hello !</p>
                <p>Welcome to visit our project!</p>
                <p>Here is group D- CJB, JGQ, XX, LJX! </p>
                <p>Made by SCU SE with Citi bank</p>
                <img src={signUpProtocalImg} alt="" className="signUpProtocalImg" />
              </Modal>

            </div>

            <Button type="primary" className="signUpButton" onClick={SubmitData}>Sign Up</Button>

            <div className="DividerLine">
              <Divider plain style={{ color: '#c2c2c2' }}>Or</Divider>
            </div>

            <Link to="/stock">
              <Button className="signUpThroughGoogle" >
                <div className="googleTXT">Back to frontPage</div>
              </Button>
            </Link>

          </div>
        </div>
        <div className="signUpCardRight">
          <img src={signUpCardImg} alt="" className="signUpCardImg" />
        </div>
      </div>
    </div >

  );
}

export default SignUp;