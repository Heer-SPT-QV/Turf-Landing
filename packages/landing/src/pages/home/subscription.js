import ResetCSS from "common/assets/css/style";
import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "common/theme/webApp";
import GlobalStyle, {
  AppWrapper,
  ContentWrapper,
} from "containers/WebApp/webApp.style";
import Banner2 from "containers/WebApp/Banner/indexH";
import styles from "./subscription.module.css";
import { Box } from "@mui/material";

function Subscription() {
  return (
    <ThemeProvider theme={theme}>
      <ResetCSS />
      <GlobalStyle />
      <AppWrapper>
        <ContentWrapper>
          <Banner2 />
       
        
        </ContentWrapper>
      </AppWrapper>
    </ThemeProvider>
  );
}

export default Subscription;
