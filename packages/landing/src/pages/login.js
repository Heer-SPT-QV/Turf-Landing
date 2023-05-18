import React from "react";
import { Box, Container, Typography } from "@material-ui/core";
import { style, zIndex } from "styled-system";
import signup from '../common/assets/image/signup.jpg'
import Sticky from "react-stickynode";
import { DrawerProvider } from "common/contexts/DrawerContext";
import { AppWrapper } from "containers/App/app.style";
import { appTheme } from 'common/theme/app';
import {
  GlobalStyle,
  ConditionWrapper,
} from 'containers/App/app.style';
import { ThemeProvider } from "styled-components";
import Navbar from "containers/Agency/Navbar";

function login() {
  return (
    <>
     <ThemeProvider theme={appTheme}>
     <AppWrapper>
     <Sticky top={0} innerZ={9999} activeClass="sticky-nav-active">
            <DrawerProvider>
              <Navbar/>  
            </DrawerProvider>
          </Sticky>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          backgroundImage:
            'url("http://localhost:3000/_next/static/media/banner-texture.9a3f9d1e.png"),linear-gradient(35deg,rgb(147,249,185) 0%,rgb(29,151,108) 100%) ',
          backgroundSize: "cover",
          display: "flex",
          justifyContent: "center",
          overflow:'hidden'
        }}
    
      >
        <div
          style={{
            backgroundColor: "transparent",
            height: "500px",
            margin: "auto",
            width: "80%",
            display: "flex",
            boxShadow: "0 5px 30px -10px rgba(0,0,0,.1)",
          }}
        >
          <div
            style={{
              width: "50%",
              backgroundColor: "#32A97A",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              borderRadius: "40px 0px 0px 40px",
            }}
          >
            <img
            style={{ height: "80%", width: "70%" }}
            src='../common/assets/image/signup.jpg'
          ></img>
          </div>
          <div
            style={{
              width: "50%",
              backgroundColor: "#57C191",
              height: "100%",
              borderRadius: "0px 40px 40px 0px",
            }}
          >
            <Typography
              style={{
                fontSize: "32px",
                color: "white",
                fontFamily: "Roboto,sans-serif",
                fontWeight: "bold",
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              SIGN UP
            </Typography>
          </div>
        </div>

      </div>
      </AppWrapper>
      </ThemeProvider>
    </>
  );
}

export default login;
