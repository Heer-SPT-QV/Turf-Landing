import Box from "common/components/Box";
import Text from "common/components/Text";
import Heading from "common/components/Heading";
import Input from "common/components/Input";
import Button from "common/components/Button";
import React, { Fragment, useState } from "react";
import "rc-tabs/assets/index.css";
import PropTypes from "prop-types";
import LoginModalWrapper from "../../containers/App/LoginModal/loginModal.style";
import LoginImage from "common/assets/image/agency/login-bg.jpg";
import Image from "common/components/Image";
import ResetCSS from "common/assets/css/style";
// import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "common/theme/webApp";
import GlobalStyle, {
    AppWrapper,
    ContentWrapper,
} from "containers/WebApp/webApp.style";
// import BannerArea from "containers/WebApp/Banner/banner.style";
import styles from "../../containers/WebApp/Banner/banner2.module.css";
import { display } from "styled-system";
import BannerArea from "containers/WebApp/Banner/banner2.style";
// import BannerArea, { Col } from "./banner.style";
// import styles from "./banner2.module.css";
// import { ThemeProvider } from "styled-components";
// import { theme } from "common/theme/webApp";

import Banner2 from "containers/WebApp/Banner/indexH";

// import { Box } from "@mui/material";

function ExtraDetails(row, col, btnStyle, contentWrapper) {
    const [content, setContent] = useState({
        gst: "",
        rpayapi: "",
        rpaykey: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
    });

    const [gstError, setgstError] = useState(null);
    const [apiError, setapiError] = useState(null);
    const [keyError, setkeyError] = useState(null);
    const [addressError, setAddressError] = useState(null);
    const [cityError, setCityError] = useState(null);
    const [stateError, setstateError] = useState(null);
    const [pincodeError, setpincodeError] = useState(null);

    const SubmitButtonGrp = () => (
        <Button
            className="default"
            title="Submit"
            {...btnStyle}
            // onClick={handleRegister}
            disabled={
                content.gst === "" ||
                content.rpayapi === "" ||
                content.rpaykey === "" ||
                content.address === "" ||
                content.city === "" ||
                content.state === "" ||
                content.pincode === ""
            }
        />
    );
    return (
        <ThemeProvider theme={theme}>
            <ResetCSS />
            <GlobalStyle />
            <AppWrapper>
                <ContentWrapper >
                    <BannerArea id="banner_section">
                        <LoginModalWrapper >
                            <Box style={{ display: 'flex' }}>
                                <Box
                                    className="col imageCol"
                                    style={{ width: "50%" ,flex:1}}
                                    {...col}

                                >
                                    <Image
                                        className="patternImage"
                                        src={LoginImage?.src}
                                        alt="Login Banner"
                                    />
                                </Box>
                                <Box className="col tabCol" {...col} style={{flex:1}}>
                                    <Box {...contentWrapper} style={{ paddingLeft: '30px',padding:'40px' }}>
                                        <h1 style={{ paddingBottom: "10px" }}>Extra details</h1>

                                        <div style={{ position: "relative" }}>
                                            <Input
                                                isMaterial
                                                label="GST No"
                                                onChange={(e) => {
                                                    const gst =
                                                        /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(
                                                            e
                                                        );
                                                    if (!gst || e === "") {
                                                        setgstError("Invaild GSTIN");
                                                    } else {
                                                        setgstError(null);
                                                        setContent({ ...content, gst: e });
                                                    }
                                                }}
                                            />
                                            {gstError && (
                                                <span
                                                    style={{
                                                        color: "red",
                                                        position: "absolute",
                                                        top: "40px",
                                                    }}
                                                >
                                                    {gstError}
                                                </span>
                                            )}
                                            {gstError && <div style={{ height: "25px" }} />}
                                        </div>

                                        <div style={{ position: "relative", paddingTop: "30px" }}>
                                            <Input
                                                isMaterial
                                                label="RazerPay API"
                                                onChange={(e) => {
                                                    const apiValid =
                                                        /^rzp_test_[0-9a-zA-Z]{30}$|^rzp_live_[0-9a-zA-Z]{30}$/;

                                                    if (!apiValid || e === "") {
                                                        setapiError("Invaild API");
                                                    } else {
                                                        setapiError(null);
                                                    }
                                                    setContent({ ...content, rpayapi: e });
                                                }}
                                            />
                                            {apiError && (
                                                <span
                                                    style={{
                                                        color: "red",
                                                        position: "absolute",
                                                        top: "72px",
                                                    }}
                                                >
                                                    {apiError}
                                                </span>
                                            )}
                                            {apiError && <div style={{ height: "25px" }} />}
                                        </div>

                                        <div style={{ position: "relative", paddingTop: "30px" }}>
                                            <Input
                                                isMaterial
                                                label="RazerPay key"
                                                onChange={(e) => {
                                                    const keyValid =
                                                        /^rzp_test_[0-9a-zA-Z]{30}$|^rzp_live_[0-9a-zA-Z]{30}$/;

                                                    if (!keyValid || e === "") {
                                                        setkeyError("Invaild GSTIN");
                                                    } else {
                                                        setkeyError(null);
                                                    }
                                                    setContent({ ...content, rpaykey: e });
                                                }}
                                            />
                                            {keyError && (
                                                <span
                                                    style={{
                                                        color: "red",
                                                        position: "absolute",
                                                        top: "72px",
                                                    }}
                                                >
                                                    {keyError}
                                                </span>
                                            )}
                                            {keyError && <div style={{ height: "25px" }} />}
                                        </div>

                                        <div style={{ position: "relative", paddingTop: "30px" }}>
                                            <Input
                                                isMaterial
                                                label="Address"
                                                onChange={(e) => {
                                                    if (e === "") {
                                                        setAddressError("Enter Address");
                                                    } else {
                                                        setAddressError(null);
                                                        setContent({ ...content, address: e });
                                                    }
                                                }}
                                            />
                                            {addressError && (
                                                <span
                                                    style={{
                                                        color: "red",
                                                        position: "absolute",
                                                        top: "72px",
                                                    }}
                                                >
                                                    {addressError}
                                                </span>
                                            )}
                                            {addressError && <div style={{ height: "25px" }} />}
                                        </div>

                                        <div style={{ position: "relative", paddingTop: "30px" }}>
                                            <Input
                                                isMaterial
                                                label="City"
                                                onChange={(e) => {
                                                    if (e === "") {
                                                        setCityError("Enter City");
                                                    } else {
                                                        setCityError(null);
                                                        setContent({ ...content, city: e });
                                                    }
                                                }}
                                            />
                                            {cityError && (
                                                <span
                                                    style={{
                                                        color: "red",
                                                        position: "absolute",
                                                        top: "72px",
                                                    }}
                                                >
                                                    {cityError}
                                                </span>
                                            )}
                                            {cityError && <div style={{ height: "25px" }} />}
                                        </div>

                                        <div style={{ position: "relative", paddingTop: "30px" }}>
                                            <Input
                                                isMaterial
                                                label="State"
                                                onChange={(e) => {
                                                    if (e === "") {
                                                        setstateError("Enter state");
                                                    } else {
                                                        setstateError(null);
                                                        setContent({ ...content, state: e });
                                                    }
                                                }}
                                            />
                                            {stateError && (
                                                <span
                                                    style={{
                                                        color: "red",
                                                        position: "absolute",
                                                        top: "72px",
                                                    }}
                                                >
                                                    {stateError}
                                                </span>
                                            )}
                                            {stateError && <div style={{ height: "25px" }} />}
                                        </div>

                                        <div style={{ position: "relative", paddingTop: "30px" }}>
                                            <Input
                                                isMaterial
                                                label="Pincode"
                                                onChange={(e) => {
                                                    const pin = /^\d{6}$/.test(e);
                                                    if (!pin) {
                                                        setpincodeError("Enter valid pincode");
                                                    } else {
                                                        setpincodeError(null);
                                                        setContent({ ...content, pincode: e });
                                                    }
                                                }}
                                            />
                                            {pincodeError && (
                                                <span
                                                    style={{
                                                        color: "red",
                                                        position: "absolute",
                                                        top: "72px",
                                                    }}
                                                >
                                                    {pincodeError}
                                                </span>
                                            )}
                                            {pincodeError && <div style={{ height: "10px" }} />}
                                        </div>

                                        <Box paddingTop="30px">
                                            <SubmitButtonGrp />
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </LoginModalWrapper>
                    </BannerArea>
                </ContentWrapper>
            </AppWrapper>
        </ThemeProvider>
    );

    return (
        <ThemeProvider theme={theme}>
            <ResetCSS />
            <GlobalStyle />
            <AppWrapper>
                <ContentWrapper>
                    <LoginModalWrapper>
                        <Box className="row" style={{ display: 'flex' }}>
                            <Box className="col imageCol" style={{ width: '70%', flex: 1 }}  >
                                <Image
                                    className="patternImage"
                                    src={LoginImage?.src}
                                    alt="Login Banner" />
                            </Box>
                            <Box className="col tabCol" {...col} style={{ border: '2px solid red', flex: 1 }}>
                                <Box {...contentWrapper} style={{ width: '400px', padding: '30px' }}>

                                    <h1 style={{ paddingBottom: '10px' }}>Extra details</h1>

                                    <div style={{ position: 'relative' }}>
                                        <Input
                                            isMaterial
                                            label="GST No"
                                            onChange={(e) => {
                                                const gst = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(e)
                                                if (!gst || e === "") {
                                                    setgstError("Invaild GSTIN")
                                                } else {
                                                    setgstError(null)
                                                    setContent({ ...content, gst: e });
                                                }

                                            }}
                                        />
                                        {gstError && <span style={{ color: 'red', position: 'absolute', top: '40px' }}>{gstError}</span>}
                                        {gstError && <div style={{ height: '25px' }} />}</div>

                                    <div style={{ position: 'relative', paddingTop: '30px' }}>
                                        <Input
                                            isMaterial
                                            label="RazerPay API"
                                            onChange={(e) => {
                                                const apiValid = /^rzp_test_[0-9a-zA-Z]{30}$|^rzp_live_[0-9a-zA-Z]{30}$/

                                                if (!apiValid || e === "") {
                                                    setapiError("Invaild API")
                                                } else {
                                                    setapiError(null)
                                                }
                                                setContent({ ...content, rpayapi: e });
                                            }}
                                        />
                                        {apiError && <span style={{ color: 'red', position: 'absolute', top: '72px' }}>{apiError}</span>}
                                        {apiError && <div style={{ height: '25px' }} />}</div>

                                    <div style={{ position: 'relative', paddingTop: '30px' }}>
                                        <Input
                                            isMaterial
                                            label="RazerPay key"
                                            onChange={(e) => {
                                                const keyValid = /^rzp_test_[0-9a-zA-Z]{30}$|^rzp_live_[0-9a-zA-Z]{30}$/

                                                if (!keyValid || e === "") {
                                                    setkeyError("Invaild GSTIN")
                                                } else {
                                                    setkeyError(null)
                                                }
                                                setContent({ ...content, rpaykey: e });
                                            }}
                                        />
                                        {keyError && <span style={{ color: 'red', position: 'absolute', top: '72px' }}>{keyError}</span>}
                                        {keyError && <div style={{ height: '25px' }} />}</div>

                                    <div style={{ position: 'relative', paddingTop: '30px' }}>
                                        <Input
                                            isMaterial
                                            label="Address"
                                            onChange={(e) => {
                                                if (e === "") {
                                                    setAddressError('Enter Address')
                                                } else {
                                                    setAddressError(null)
                                                    setContent({ ...content, address: e });
                                                }
                                            }}
                                        />
                                        {addressError && <span style={{ color: 'red', position: 'absolute', top: '72px' }}>{addressError}</span>}
                                        {addressError && <div style={{ height: '25px' }} />}

                                    </div>

                                    <div style={{ position: 'relative', paddingTop: '30px' }}>
                                        <Input
                                            isMaterial
                                            label="City"
                                            onChange={(e) => {
                                                if (e === "") {
                                                    setCityError('Enter City')
                                                } else {
                                                    setCityError(null)
                                                    setContent({ ...content, city: e });
                                                }
                                            }}
                                        />
                                        {cityError && <span style={{ color: 'red', position: 'absolute', top: '72px' }}>{cityError}</span>}
                                        {cityError && <div style={{ height: '25px' }} />}</div>

                                    <div style={{ position: 'relative', paddingTop: '30px' }}>

                                        <Input
                                            isMaterial
                                            label="State"
                                            onChange={(e) => {
                                                if (e === "") {
                                                    setstateError('Enter state')
                                                } else {
                                                    setstateError(null)
                                                    setContent({ ...content, state: e });
                                                }
                                            }}
                                        />
                                        {stateError && <span style={{ color: 'red', position: 'absolute', top: '72px' }}>{stateError}</span>}
                                        {stateError && <div style={{ height: '25px' }} />}</div>


                                    <div style={{ position: 'relative', paddingTop: '30px' }}>
                                        <Input
                                            isMaterial
                                            label="Pincode"
                                            onChange={(e) => {
                                                const pin = /^\d{6}$/.test(e)
                                                if (!pin) {
                                                    setpincodeError('Enter valid pincode')
                                                } else {
                                                    setpincodeError(null)
                                                    setContent({ ...content, pincode: e });
                                                }
                                            }}
                                        />
                                        {pincodeError && <span style={{ color: 'red', position: 'absolute', top: '72px' }}>{pincodeError}</span>}
                                        {pincodeError && <div style={{ height: '10px' }} />}</div>


                                    <Box paddingTop='30px'>
                                        <SubmitButtonGrp />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>

                    </LoginModalWrapper>
                </ContentWrapper>

            </AppWrapper>
        </ThemeProvider>
    )
}

// ExtraDetails style props
ExtraDetails.propTypes = {
    row: PropTypes.object,
    col: PropTypes.object,
    logoStyle: PropTypes.object,
    titleStyle: PropTypes.object,
    hintTextStyle: PropTypes.object,
    contentWrapper: PropTypes.object,
    descriptionStyle: PropTypes.object,
    googleButtonStyle: PropTypes.object,
};

// ExtraDetails default style
ExtraDetails.defaultProps = {
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

export default ExtraDetails;
