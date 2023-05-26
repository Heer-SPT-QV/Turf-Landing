import Box from "common/components/Box";
import Text from "common/components/Text";
import Heading from "common/components/Heading";
import Input from "common/components/Input";
import Button from "common/components/Button";
import React, { Fragment, useState } from 'react'
import "rc-tabs/assets/index.css";
import PropTypes from "prop-types";
import LoginModalWrapper from "../../containers/App/LoginModal/loginModal.style";

function ExtraDetails(
    row,
    col,
    btnStyle,
    contentWrapper,
    outlineBtnStyle,
    descriptionStyle,
    googleButtonStyle,
    setOpen,
) {
    const [content, setContent] = useState({
        gst: "",
        rpayapi: "",
        rpaykey: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
    });
    const SubmitButtonGrp = () => (
        <Fragment>
            <Button
                className="default"
                title="Submit"
                {...btnStyle}
                // onClick={handleRegister}
                disabled={
                    content.gst === "" &&
                    content.rpayapi === "" &&
                    content.rpaykey === "" &&
                    content.address === "" &&
                    content.city === "" &&
                    content.state === "" &&
                    content.pincode === ""
                }
            />
        </Fragment>
    )

    return (
        <LoginModalWrapper>
                <div style={{border:'2px solid red',padding:'30px'}}>
                    <Input
                        isMaterial
                        label="GST No"
                        onChange={(e) => {
                            setContent({ ...content, gst: e });
                        }}
                    />
                    <Input
                        isMaterial
                        label="RazerPay API"
                        onChange={(e) => {
                            setContent({ ...content, rpayapi: e });
                        }}
                    />
                    <Input
                        isMaterial
                        label="RazerPay key"
                        onChange={(e) => {
                            setContent({ ...content, rpaykey: e });
                        }}
                    />
                    <Input
                        isMaterial
                        label="Address"
                        onChange={(e) => {
                            setContent({ ...content, address: e });
                        }}
                    />
                    <Input
                        isMaterial
                        label="City"
                        onChange={(e) => {
                            setContent({ ...content, city: e });
                        }}
                    />
                    <Input
                        isMaterial
                        label="State"
                        onChange={(e) => {
                            setContent({ ...content, state: e });
                        }}
                    />
                    <Input
                        isMaterial
                        label="Pincode"
                        onChange={(e) => {
                            setContent({ ...content, pincode: e });
                        }}
                    />
                </div>
                <Box>
                    <SubmitButtonGrp />
                </Box>
                        
        </LoginModalWrapper>
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

  
export default ExtraDetails