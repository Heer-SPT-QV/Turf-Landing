import { DrawerProvider } from "common/contexts/DrawerContext";
import ResetCSS from "common/assets/css/style";
import Navbar from "containers/WebApp/Navbar";
import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "common/theme/webApp";
import GlobalStyle, {
  AppWrapper,
  ContentWrapper,
} from "containers/WebApp/webApp.style";
import Sticky from "react-stickynode";
import Banner2 from "containers/WebApp/Banner";

function Home() {
  const [open, setOpen] = useState(false);
  return (
    <ThemeProvider theme={theme}>
      <ResetCSS />
      <GlobalStyle />
      <AppWrapper>
        <Sticky top={0} innerZ={9999} activeClass="sticky-nav-active">
          <DrawerProvider>
            <Navbar open={open} setOpen={setOpen} />
          </DrawerProvider>
        </Sticky>
        <ContentWrapper>
          <Banner2 />
        </ContentWrapper>
      </AppWrapper>
    </ThemeProvider>
  );
}

export default Home;
