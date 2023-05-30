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
    fName: "",
    lName: "",
    bName: "",
    email: "",
    mob: 0,
  });

  function caller() {
    let t = 35;
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
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");
  const [ferror, setFError] = useState("");
  const [lerror, setLError] = useState("");
  const [berror, setBError] = useState("");
  const [mailError, setMailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpS, setOtpS] = useState();
  const [timer, setTimer] = useState(35);

  function handleRegister() {
    setDefaultTab("loginForm");
    setActive(true);
    setNumber(content.mob);
    console.log(content.mob);
  }
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOtpS(false);
  };

  const LoginButtonGroup = () => (
    <Fragment>
      <Button
        className={status === "ph" ? "default2" : "default"}
        title={status === "ph" ? "REQUEST OTP" : "LOGIN"}
        {...btnStyle}
        disabled={number === "" || error !== "" || (status !== "ph" && otp === "")}
        onClick={() => {
          if (status === "ph") {
            setLoading(true);
            setTimeout(() => {
              setOtpS(true);
              setStatus("otp");
              setLoading(false);
              caller();
            }, [2000]);
          } else {
            router.push("/home");
            setOpen(false);
            closeModal();
          }
        }}
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
          content.fName === "" ||
          content.lName === "" ||
          content.bName === "" ||
          content.email === "" ||
          content.mob == "0" ||
          ferror !== null ||
          lerror !== null ||
          berror !== null ||
          mailError !== null||
          phoneError!==null
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
                    value={number}
                    onChange={(e) => {
                      const x = /^(0|91)?[6-9][0-9]{9}$/.test(e);

                      if (!x) {
                        setError("Enter Phone number");
                      } else {
                        setError("");
                        setNumber(e);
                      }

                      // if (e === "" || e.length === 10) {
                      //   if (e === "") {
                      //     setError("Enter Phone number");
                      //   } else {
                      //     setError("");
                      //     setNumber(e);
                      //   }
                      // } else if (x || e.length < 10 || e.length > 10) {
                      //   setError("Please enter only 10 digits");
                      // } else if (!x) {
                      //   setError("Please enter Only number");
                      // } else {
                      //   setNumber(e);
                      // }
                    }}
                  />
                  {error && <span style={{ color: 'red', position: 'absolute', top: '44px' }}>{error}</span>}
                  {error && <div style={{ height: '14px' }} />}
                </div>

                {loading && <CircularProgress />}
                {status !== "ph" && (
                  <>
                    {" "}
                    <Input
                      isMaterial
                      label="OTP"
                      onChange={(e) => {
                        setOtp(e);
                      }}
                    />
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
                    label="First name"
                    onChange={(e) => {
                      const nameRegex = /^[A-Z][a-z]*$/.test(e);
                      if (!nameRegex) {
                        setFError("First letter must be capital and only letters")
                      } else {
                        setFError(null)
                        setContent({ ...content, fName: e });
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
                    //   value={content.lName}
                    onChange={(e) => {
                      const nameRegex = /^[A-Z][a-z]*$/.test(e);
                      if (!nameRegex) {
                        setLError("First letter must be capital and only letters")
                      } else {
                        setLError(null)
                        // console.log(e);
                        setContent({ ...content, lName: e });
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
                    //   value={content.bName}
                    onChange={(e) => {
                      const nameRegex = /^[A-Z][a-z]*$/.test(e);
                      if (!nameRegex) {
                        setBError("First letter must be capital and only letters")
                      } else {
                        setBError(null)
                        // console.log(e)
                        setContent({ ...content, bName: e });

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
                    inputType="number"
                    isMaterial
                    label="Phone number"
                    onChange={(e) => {
                      const num = /^(0|91)?[6-9][0-9]{9}$/.test(e)

                      if (!num) {
                        setPhoneError('Enter Valid Phone number')
                      } else {
                        setPhoneError(null)
                        setContent({ ...content, mob: e });
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
            <Snackbar open={otpS} autoHideDuration={6000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                An OTP has been sent Sucessfully!!
              </Alert>
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
