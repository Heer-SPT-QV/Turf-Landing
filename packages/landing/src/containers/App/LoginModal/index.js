import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs, { TabPane } from "rc-tabs";
// import TabContent from 'rc-tabs/lib/TabContent';
// import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
import Box from "common/components/Box";
import Text from "common/components/Text";
import Heading from "common/components/Heading";
import Input from "common/components/Input";
// import CheckBox from 'common/components/Checkbox/index';
import Button from "common/components/Button";
import Image from "common/components/Image";
import LoginModalWrapper from "./loginModal.style";
import "rc-tabs/assets/index.css";
import LogoImage from "common/assets/image/agency/logo.png";
import LoginImage from "common/assets/image/agency/login-bg.jpg";

import { useRouter } from "next/router";
import { closeModal } from "@redq/reuse-modal";
import { Alert, CircularProgress, Snackbar, Typography } from "@mui/material";
// import GoogleLogo from 'common/assets/image/agency/google-icon.jpg';

const LoginModal = ({
  row,
  col,
  btnStyle,
  logoStyle,
  titleStyle,
  contentWrapper,
  outlineBtnStyle,
  descriptionStyle,
  googleButtonStyle,
  setOpen,
}) => {
  const [content, setContent] = useState({
    firstName: "",
    lastName: "",
    businessName: "",
    email: "",
    phoneNumber: 0,
  });

  function caller() {
    let t = 10;
    const timerr = setInterval(() => {
      if (t === 0) {
        clearInterval(timerr);
      } else {
        t--;
      }

      setTimer(t);
    }, [1000]);
  }

  const [defaultTab, setDefaultTab] = useState("loginForm");
  const [active, setActive] = useState(false);
  const [number, setNumber] = useState("");
  const [status, setStatus] = useState("ph");
  const [userCreate, setUserCreate] = useState(false)
  const [notUser, setNotUser] = useState(false)
  const [alreadyUser, setAlreadyUser] = useState(false)
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");
  const [ferror, setFError] = useState("");
  const [lerror, setLError] = useState("");
  const [berror, setBError] = useState("");
  const [mailError, setMailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [otpError, setotpError] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpS, setOtpS] = useState();
  const [otpF, setOtpF] = useState();
  const [timer, setTimer] = useState(10);
  const [condition, setCondition] = useState(false);

  useEffect(()=>{
    var token_check=localStorage.getItem('user-info');
    if(token_check){
      router.push('/home/ExtraDetails')

    }
  },[])

  async function logIn() {
    const num = Number(number)

    const result = await fetch(`http://192.168.1.19/api/Business/Login?PhoneNumber=${num}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'accept': '*/*',
        },
        // body: JSON.stringify(item)
      });
    try {
      var responseBody = await result.text();

      // Check if the response body is valid JSON
      if (responseBody.startsWith("{") || responseBody.startsWith("[")) {
        var response = JSON.parse(responseBody);
        // Handle the parsed JSON response as needed
      } else {
        // Handle the response body directly if it's not valid JSON
        console.log("Response body:", responseBody);
      }
    } catch (error) {
      console.log("Error reading response:", error);
    }

    if (result.ok) {
      //   try {
      //     localStorage.setItem("user-info", JSON.stringify(response));
      //   } catch (error) {
      //     console.error("Error storing data in local storage:", error);
      //   }

      if (status === "ph") {
        setLoading(true);
        setTimeout(() => {
          setOtpS(true);
          setStatus("otp");
          setLoading(false);
          caller();
        }, 2000);
      }
    } else {
      // Handle error here
      console.error("Phone number not sent successfully");
      setOtpF(true);
    }
  }
  var varify_otp = async () => {
    const num = Number(number)
    const var_otp = Number(otp)
    const varify = await fetch(`http://192.168.1.19/api/Business/VerifyLogin?PhoneNumber=${num}&Otp=${var_otp}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'accept': '*/*',
      }
    })
    try {
      var responseBodyOtp = await varify.text();

      // Check if the response body is valid JSON
      if (responseBodyOtp.startsWith("{") || responseBodyOtp.startsWith("[")) {
        var responseOtp = JSON.parse(responseBodyOtp);
        // Handle the parsed JSON response as needed
      } else {
        // Handle the response body directly if it's not valid JSON
        console.log("Response body:", responseBodyOtp);
      }
    } catch (error) {
      console.log("Error reading response:", error);
    }

    if (varify.ok) {
      if (responseBodyOtp !== 'Wrong Otp') {
        try {
          router.push("/home/ExtraDetails");
          setOpen(false);
          closeModal();
          try {
            localStorage.setItem("user-info", JSON.stringify(responseBodyOtp));
          } catch (error) {
            console.error("Error storing data in local storage:", error);
          }
        } catch (error) {
          console.warn(`varification error`, error)
        }
      } else {
        setotpError('Wrong OTP')
      }
    }
  }
  async function handleRegister() {
    // setDefaultTab("loginForm");
    // setActive(true);
    // setNumber(content.phoneNumber);

    const items = { content }
    const convertedData = {
      ...content,
      phoneNumber: Number(content.phoneNumber)
    };
    try {
      const response = await fetch('http://192.168.1.19/api/Business/SignUp', {
        method: 'POST',
        body: JSON.stringify(convertedData),
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
          // 'Access-Control-Allow-Origin': 'https://j5z79vvz-80.asse.devtunnels.ms/api/Business/SignUp'

        }
      })

      console.log(convertedData)

      // result = await result.json()
      // console.log(result)
      if (response.ok) {
        // Request successful

        const result = await response.json();
        if (result === 'User Create Successfully') {
          console.log('result', result);
          setUserCreate(true)
          setDefaultTab("loginForm");
          setActive(true);
          setNumber(content.phoneNumber);
        } else if (result === "User Alredy Register") {
          setAlreadyUser(true)
        } else {
          console.log('error')
        }

      } else {
        // Request failed
        console.error('Error:', response.status);
        setNotUser(true)
      }
    } catch (error) {
      console.log('Error:', error)
    }
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOtpS(false);
    setOtpF(false);
    setUserCreate(false);
    setNotUser(false);
    setAlreadyUser(false)
  };



  const LoginButtonGroup = () => (
    <Fragment>
      <Button
        className={status === "ph" ? "default2" : "default"}
        title={status === "ph" ? "REQUEST OTP" : "LOGIN"}
        {...btnStyle}
        disabled={number === "" || error !== "" || (status !== "ph" && otp === "")}
        onClick={status === 'ph' ? logIn : varify_otp}

      />
      {/* <Button
				title="Forget Password"
				variant="textButton"
				{...outlineBtnStyle}
			/> */}
    </Fragment>
  );
  const SignupButtonGroup = () => (
    <Fragment>
      <Button
        className="default"
        title="REGISTER"
        {...btnStyle}
        onClick={handleRegister}
        disabled={
          content.firstName === "" ||
          content.lastName === "" ||
          content.businessName === "" ||
          content.email === "" ||
          content.phoneNumber == "" ||
          ferror !== null ||
          lerror !== null ||
          berror !== null ||
          mailError !== null ||
          phoneError !== null
        }
      />
    </Fragment>
  );

  return (
    <LoginModalWrapper>
      <Box className="row" {...row}>
        <Box className="col imageCol" {...col}>
          <Image
            className="patternImage"
            src={LoginImage?.src}
            alt="Login Banner"
          />
        </Box>
        <Box className="col tabCol" {...col}>
          <Box {...contentWrapper}>
            <Image src={LogoImage?.src} {...logoStyle} alt="Logo" />
            <Tabs
              defaultActiveKey={defaultTab}
              animated={{ tabPane: true }}
              onTabClick={(e) => {
                if (e === "registerForm") {
                  setDefaultTab("registerForm");
                } else {
                  setDefaultTab("loginForm");
                }
              }}
              activeKey={defaultTab}
            // renderTabBar={() => <ScrollableInkTabBar />}
            // renderTabContent={() => <TabContent />}
            >
              <TabPane tab="LOGIN" key="loginForm">
                <Heading content="Welcome Folk" {...titleStyle} />
                <Text
                  content="Welcome to Turf Family. Please login with your personal account information letter."
                  {...descriptionStyle}
                />
                <br />
                <br />
                <div style={{ position: 'relative' }}>
                  <Input
                    isMaterial
                    label="Phone number"
                    autocomplete="off"
                    value={number}
                    onChange={(e) => {
                      const x = /^(0|91)?[6-9][0-9]{9}$/.test(e);

                      if (!x) {
                        setError("Enter Phone number");
                      } else {
                        setError("");
                        setNumber(e);
                      }
                    }}
                  />
                  {error && <span style={{ color: 'red', position: 'absolute', top: '44px' }}>{error}</span>}
                  {error && <div style={{ height: '14px' }} />}
                </div>

                {loading && <CircularProgress />}
                {status !== "ph" && (
                  <>
                    {" "}

                    <div style={{ position: 'relative' }}>
                      <Input
                        isMaterial
                        label="OTP"
                        autocomplete="off"
                        onChange={(e) => {
                          setOtp(e);
                        }}
                      />
                      {otpError && <span style={{ color: 'red', position: 'absolute', top: '44px' }}>{otpError}</span>}
                      {otpError && <div style={{ height: '14px' }}></div>}
                    </div>
                    {timer !== 0 && (
                      <Typography
                        style={{ textAlign: "right", fontSize: "10px" }}
                      >
                        00:{timer < 10 ? 0 : ""}
                        {timer}
                      </Typography>
                    )}
                    {timer === 0 && (

                      <Typography
                        onClick={() => {
                          caller();
                          setOtpS(true);
                        }}
                        sx={{
                          ":hover": {
                            color: "red",
                            cursor: "pointer",
                          },
                          fontSize: "22px",
                        }}
                        style={{
                          textAlign: "right",
                          fontSize: "10px",
                          color: "blue",  

                        }}
                      >
                        Resend OTP
                      </Typography>

                    )}
                  </>
                )}

                <div>{!loading && <LoginButtonGroup />}</div>
              </TabPane>
              <TabPane tab="REGISTER" key="registerForm">
                <Heading content="Welcome Folk" {...titleStyle} />
                <Text
                  content="Welcome to Turf Family. Please login with your personal account information letter."
                  {...descriptionStyle}
                />
                <br />
                <br />
                <div style={{ position: 'relative' }}>
                  <Input
                    isMaterial
                    value={content.firstName}
                    autocomplete="off"
                    label="First name"
                    onChange={(e) => {
                      const nameRegex = /^[A-Z][a-z]*$/.test(e);
                      if (!nameRegex) {
                        setFError("First letter must be capital and only letters")
                      } else {
                        setFError(null)
                        setContent({ ...content, firstName: e });
                      }
                    }}
                  />
                  {ferror && <span style={{ color: 'red', position: 'absolute', top: '44px' }}>{ferror}</span>}
                  {ferror && <div style={{ height: '14px' }}></div>}
                </div>

                <div style={{ position: 'relative' }}>
                  <Input
                    isMaterial
                    label="Last name"
                    //   value={content.lastName}
                    autocomplete="off"
                    onChange={(e) => {
                      const nameRegex = /^[A-Z][a-z]*$/.test(e);
                      if (!nameRegex) {
                        setLError("First letter must be capital and only letters")
                      } else {
                        setLError(null)
                        // console.log(e);
                        setContent({ ...content, lastName: e });
                      }
                    }}
                  />
                  {lerror && <span style={{ color: 'red', position: 'absolute', top: '44px' }}>{lerror}</span>}
                  {lerror && <div style={{ height: '14px' }}></div>}
                </div>

                <div style={{ position: 'relative' }}>
                  <Input
                    isMaterial
                    label="Business name"
                    //   value={content.businessName}
                    autocomplete="off"
                    onChange={(e) => {
                      const nameRegex = /^[A-Z][a-z]*$/.test(e);
                      if (!nameRegex) {
                        setBError("First letter must be capital and only letters")
                      } else {
                        setBError(null)
                        // console.log(e)
                        setContent({ ...content, businessName: e });

                      }
                    }}
                  />
                  {berror && <span style={{ color: 'red', position: 'absolute', top: '44px' }}>{berror}</span>}
                  {berror && <div style={{ height: '14px' }}></div>}
                </div>


                <div style={{ position: 'relative' }}>
                  <Input
                    inputType="email"
                    isMaterial
                    autocomplete="off"
                    label="Email Address"
                    //   value={content.email}
                    onChange={(e) => {
                      const x = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(e)

                      if (!x) {
                        // console.log('invaild')
                        setMailError('Invaild mail')
                      } else {
                        setMailError(null)
                        // console.log('valid')
                        setContent({ ...content, email: e });
                      }

                    }}
                  />
                  {mailError && <span style={{ color: 'red', position: 'absolute', top: '44px' }}>{mailError}</span>}
                  {mailError && <div style={{ height: '14px' }}></div>}
                </div>

                <div style={{ position: 'relative' }}>
                  <Input
                    isMaterial
                    label="Phone number"
                    autocomplete="off"
                    onChange={(e) => {
                      const num = /^(0|91)?[6-9][0-9]{9}$/.test(e)

                      if (!num) {
                        setPhoneError('Enter Valid Phone number')
                      } else {
                        setPhoneError(null)
                        setContent({ ...content, phoneNumber: e });
                      }
                    }}
                  />
                  {phoneError && <span style={{ color: 'red', position: 'absolute', top: '44px' }}>{phoneError}</span>}
                  {phoneError && <div style={{ height: '14px' }}></div>}
                </div>

                <div>
                  <SignupButtonGroup />
                </div>
              </TabPane>
            </Tabs>
            <Snackbar open={otpS} autoHideDuration={4000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                An OTP has been sent Sucessfully!!
              </Alert>
            </Snackbar>
            <Snackbar open={otpF} autoHideDuration={4000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: "100%" }}
              >An OTP has not been sent Sucessfully!!</Alert>
            </Snackbar>
            <Snackbar open={userCreate} autoHideDuration={4000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
              >An account created Sucessfully!!</Alert>
            </Snackbar>
            <Snackbar open={notUser} autoHideDuration={4000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: "100%" }}
              >An account not created Sucessfully!!</Alert>
            </Snackbar>
            <Snackbar open={alreadyUser} autoHideDuration={4000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity="warning"
                sx={{ width: "100%" }}
              >User is already Exist!!</Alert>
            </Snackbar>
          </Box>
        </Box>
      </Box>
    </LoginModalWrapper>
  );
};

// LoginModal style props
LoginModal.propTypes = {
  row: PropTypes.object,
  col: PropTypes.object,
  logoStyle: PropTypes.object,
  titleStyle: PropTypes.object,
  hintTextStyle: PropTypes.object,
  contentWrapper: PropTypes.object,
  descriptionStyle: PropTypes.object,
  googleButtonStyle: PropTypes.object,
};

// LoginModal default style
LoginModal.defaultProps = {
  // Team member row default style
  row: {
    flexBox: true,
    flexWrap: "wrap",
  },
  // Team member col default style
  col: {
    width: [1, 1 / 2],
  },
  // Default logo size
  logoStyle: {
    width: "128px",
    height: "auto",
    ml: "15px",
  },
  // Title default style
  titleStyle: {
    fontSize: ["22px", "36px", "50px"],
    fontWeight: "400",
    color: "#20201D",
    letterSpacing: "-0.025em",
    mt: "35px",
    mb: "10px",
  },
  // Description default style
  descriptionStyle: {
    color: "rgba(52, 61, 72, 0.8)",
    fontSize: "15px",
    lineHeight: "26px",
    letterSpacing: "-0.025em",
    mb: "23px",
    ml: "1px",
  },
  // Content wrapper style
  contentWrapper: {
    pt: ["32px", "56px"],
    pl: ["17px", "32px", "38px", "40px", "56px"],
    pr: "32px",
    pb: ["32px", "56px"],
  },
  // Default button style
  btnStyle: {
    minWidth: "156px",
    fontSize: "14px",
    fontWeight: "500",
  },
  // Outline button outline style
  outlineBtnStyle: {
    minWidth: "156px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#10ac84",
  },
  // Google button style
  googleButtonStyle: {
    bg: "#ffffff",
    color: "#343D48",
  },
};

export default LoginModal;
