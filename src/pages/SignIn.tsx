import { useState } from "react";
import signUpCardImg from "../assets/images/signBg-3.png"
import signUpLogo from "../assets/images/signLogo.png";
import backToSignIn from "../assets/images/back.png";
import { Cookies } from "react-cookie";

import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Input, Tooltip, Button, Switch, Modal, Form, Alert, notification } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import LoginAPI from "../api/Sign"

const cookie = new Cookies();

// 修改密码-气泡框中的表单布局：
type LayoutType = Parameters<typeof Form>[0]['layout'];

function SignIn(props: any) {
    // 0.验证forget pwd时输入的email是否有效：
    const [twoNewPwdNotSame, setTwoNewPwdNotSame] = useState(false);
    const navigate = useNavigate();

    // 1. input框数据的双向绑定:
    const [emailValue, setEmailValue] = useState(() => {
        const item = localStorage.getItem('emailValue');
        return item !== null ? item : "";
    });
    const [passwordValue, setPasswordValue] = useState(() => {
        const item = localStorage.getItem('passwordValue');
        return item !== null ? item : "";
    });
    const [changePwdEmail, setChangePwdEmail] = useState('');
    const [oldPwdValue, setOldPwdValue] = useState('');

    const [emailNullTxtState, setEmailNullTxtState] = useState(false);
    const [pwdNullTxtState, setPwdNullTxtState] = useState(false);

    // 2. 是否记住密码-开关状态：
    const [rememberPwdState, setRememberPwdState] = useState(true);

    const switchChange = (checked: boolean) => {
        console.log(`switch to ${checked}`);
        setRememberPwdState(checked)
        // 存入的Boolean值自动变成了字符串:
        localStorage.setItem("rememberPwdState", checked.toString())
    }

    // 3. 修改密码-控制弹出气泡框：
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    // 3.1 气泡框中的-表单布局：
    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState<LayoutType>('horizontal');
    const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
        setFormLayout(layout);
    };
    // 3.2 获取输入的两次新密码的值：
    const [newPwdValue1, setNewPwdValue1] = useState('');
    const [newPwdValue2, setNewPwdValue2] = useState('');
    // 3.3 输入完毕，点击气泡框的OK按钮：
    const handleModalOk = () => {
        form.submit();
        if (changePwdEmail != "" && oldPwdValue != "" && newPwdValue1 != '' && newPwdValue2 != "") {
            if (newPwdValue1 === newPwdValue2) {
                console.log("所有数据已填，且两次密码一致，要发送新密码了！")
                LoginAPI.changePwd({ email: changePwdEmail, oldPwd: oldPwdValue, newPwd: newPwdValue2 })
                setTwoNewPwdNotSame(false);
                form.resetFields();
                // console.log("newPwdValue1", newPwdValue1)
                setIsModalOpen(false);
                setEmailValue(changePwdEmail)
                setPasswordValue(newPwdValue1)
            }
            else {
                console.log("两次密码不一致")
                setTwoNewPwdNotSame(true)
            }
        }
        else {
            console.log("存在数据未填写")
            setTwoNewPwdNotSame(false)
        }
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        setTwoNewPwdNotSame(false)
    };


    // 4. sign up按钮 - 提交【邮箱（用户名）】+【密码】数据：
    const SubmitData = () => {
        // console.log("emailValue", emailValue)
        if (emailValue === '') {
            setEmailNullTxtState(true)
        }
        if (passwordValue === '') {
            setPwdNullTxtState(true)
        }
        else {
            if (rememberPwdState) {
                // 记住密码-存localstorage:
                localStorage.setItem("emailValue", emailValue)
                localStorage.setItem("passwordValue", passwordValue)
            }

            console.log("开始提交数据了！")
            LoginAPI.login({ email: emailValue, pwd: passwordValue }).then(
                (response: any) => {
                    console.log("🚀 ~ file: SignIn.tsx:103 ~ SubmitData ~ response:", response)
                    if (response.state === 5000) {
                        notification.error({
                            message: "Error",
                            description: response.message,
                            placement: "topRight",
                        });
                    }
                    else {
                        cookie.set("token", response.data);
                        notification.success({
                            message: "Success",
                            description: "login success",
                            placement: "topRight",
                            duration: 1.5,
                        });

                        localStorage.setItem("current_user_emailValue", emailValue.toString())
                        setTimeout(() => {
                            navigate("/");
                        }, 1500);
                    }
                }).catch(
                    (error) => {
                        console.log(error);
                    }
                )
        }
    };


    return (

        <div className="signUpPage">
            <div className="signUpCard">
                <div className="signUpCardLeft">
                    <div className="LeftLittle">
                        <div className="headerImgBox">
                            <img src={signUpLogo} alt="" className="signUpLogoImg" />
                            <Link to="/stock">
                                <img src={backToSignIn} alt="" className="backToSignInImg" />
                            </Link>
                        </div>
                        <div className="LeftTXT1">Sign In</div>
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
                                    setEmailNullTxtState(false)
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
                                    setPwdNullTxtState(false)
                                }} />
                            <div className="emailNullTxt" style={pwdNullTxtState ? { display: "" } : { display: "none" }}>Please input your password!</div>
                        </div>

                        <div className="toolbox">
                            <div className="rememberPasswordBox">
                                <Switch defaultChecked onChange={switchChange} />
                                <span className="rememberPasswordTXT">Remember me</span>
                            </div>
                            <div className="ForgetPwd" onClick={showModal}>Change password?</div>
                        </div>
                        <Modal title="Change password? " open={isModalOpen} onOk={handleModalOk} onCancel={handleCancel}>
                            <div className="modalValidBox" >
                                <Form
                                    layout={"vertical"}
                                    form={form}
                                    initialValues={{ layout: formLayout }}
                                    onValuesChange={onFormLayoutChange}
                                    style={{ maxWidth: 600 }}
                                    className="NewPwdForm"
                                >

                                    <Form.Item label="Email" name="Email" rules={[{ required: true, message: 'Please input your email address!' }]}>
                                        <Input
                                            placeholder="Enter your mail address"
                                            prefix={<UserOutlined className="site-form-item-icon" />}
                                            suffix={
                                                <Tooltip title="请输入邮箱地址">
                                                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                                </Tooltip>
                                            }
                                            value={changePwdEmail}
                                            onChange={e => {
                                                console.log("changePwdEmail", e.target.value);
                                                setChangePwdEmail(e.target.value);
                                            }}
                                        />
                                    </Form.Item>

                                    <Form.Item label="Old Password" name="Old Password" rules={[{ required: true, message: 'Please input your old password!' }]}>
                                        <Input.Password placeholder="input old password" value={oldPwdValue}
                                            onChange={e => {
                                                console.log("oldPwdValue", e.target.value);
                                                setOldPwdValue(e.target.value);
                                            }} />
                                    </Form.Item>



                                    <Form.Item label="New Password" name="New Password" rules={[{ required: true, message: 'Please input your new password!' }]}>

                                        <Input.Password placeholder="input new password" value={newPwdValue1}
                                            onChange={e => {
                                                console.log("newPwdValue1", e.target.value);
                                                setNewPwdValue1(e.target.value);
                                            }} />
                                    </Form.Item>

                                    <Form.Item label="New Password" name="Enter New Password again" rules={[{ required: true, message: 'Please input your new password again!' }]}>
                                        <Input.Password placeholder="please input again" value={newPwdValue2}
                                            onChange={e => {
                                                console.log("newPwdValue2", e.target.value);
                                                setNewPwdValue2(e.target.value);
                                            }} />
                                    </Form.Item>

                                    <Alert
                                        message="Two passwords do not match. Please check again."
                                        type="warning"
                                        closable
                                        showIcon
                                        style={twoNewPwdNotSame ? { display: "" } : { display: "none" }}
                                    />
                                </Form>
                            </div>
                        </Modal>


                        <Button type="primary" className="signUpButton" onClick={SubmitData}>Sign In</Button>

                        <div className="SignUpReminderBox">
                            Don't have an account?
                            <Link to="/signUp" className="SignUpReminder">Sign Up</Link>
                        </div>

                    </div>
                </div>
                <div className="signUpCardRight">
                    <img src={signUpCardImg} alt="" className="signUpCardImg" />
                </div>
            </div>
        </div >

    );
}

export default SignIn;