import { useMediaQuery } from "@material-ui/core";
import { closeModal, openModal } from "@redq/reuse-modal";
import LogoImageStick from "common/assets/image/webApp/header-logo-stick.svg";
import LogoImage from "common/assets/image/webApp/header-logo.svg";
import Box from "common/components/Box";
import Button from "common/components/Button";
import Drawer from "common/components/Drawer";
import HamburgMenu from "common/components/HamburgMenu";
import NavbarWrapper from "common/components/Navbar";
import ScrollSpyMenu from "common/components/ScrollSpyMenu";
import Container from "common/components/UI/Container";
import Logo from "common/components/UIElements/Logo";
import { DrawerContext } from "common/contexts/DrawerContext";
import { MENU_ITEMS } from "common/data/WebApp";
import LoginModal from "containers/App/LoginModal";
// import LoginModal from 'containers/App/LoginModal';
import Link from "next/link";
import PropTypes from "prop-types";
import React, { useContext } from "react";


const CloseModalButtonAlt = () => (
  <Button
    className="modalCloseBtn alt"
    variant="fab"
    onClick={() => closeModal()}
    icon={<i className="flaticon-plus-symbol" />}
  />
);

const Navbar = ({
  navbarStyle,
  logoStyle,
  button,
  row,
  menuWrapper,
  open,
  setOpen,
}) => {
  const { state, dispatch } = useContext(DrawerContext);
  const matches = useMediaQuery("(min-width:800px)");
  const CloseModalButton = () => (
    <Button
      className="modalCloseBtn"
      variant="fab"
      onClick={() => {
        setOpen(false);
        closeModal();
      }}
      icon={<i className="flaticon-plus-symbol" />}
    />
  );

  const handleLoginModal = () => {
    openModal({
      config: {
        className: "login-modal",
        disableDragging: true,
        width: "100%",
        height: "100%",
        animationFrom: { transform: "translateY(100px)" }, // react-spring <Spring from={}> props value
        animationTo: { transform: "translateY(0)" }, //  react-spring <Spring to={}> props value
        transition: {
          mass: 1,
          tension: 180,
          friction: 26,
        },
      },
      component: LoginModal,
      componentProps: {setOpen},
      closeComponent: CloseModalButton,
      closeOnClickOutside: false,
    });
  };

  // Toggle drawer
  const toggleHandler = () => {
    dispatch({
      type: "TOGGLE",
    });
  };

  return (
    <NavbarWrapper {...navbarStyle}>
      <Container>
        <Box {...row}>
          <Logo
            href="#"
            logoSrc={LogoImage}
            title="Agency"
            logoStyle={logoStyle}
            className="main-logo"
          />
          <Logo
            href="#"
            logoSrc={LogoImageStick}
            title="Agency"
            logoStyle={logoStyle}
            className="sticky-logo"
          />
          <Box {...menuWrapper} className="mainMenuWrapper">
            <ScrollSpyMenu
              className="main_menu"
              menuItems={MENU_ITEMS}
              offset={-70}
            />
            <Link href="">
              <a className="navbar_button">
                <Button
                  {...button}
                  title="Login Now"
                  onClick={() => {
                    setOpen(true);
                    handleLoginModal();
                  }}
                />
              </a>
            </Link>
            <Link href="#">
              <a className="navbar_button_two">
                <Button {...button} title="Join Free" />
              </a>
            </Link>
            {!matches && (
              <Button
                variant="textButton"
                onClick={handleLoginModal}
                icon={<i className="flaticon-user" />}
                aria-label="login"
              />
            )}
            <Drawer
              width="420px"
              placement="right"
              drawerHandler={<HamburgMenu barColor="#ff5f6d" />}
              open={state.isOpen}
              toggleHandler={toggleHandler}
            >
              <ScrollSpyMenu
                className="mobile_menu"
                menuItems={MENU_ITEMS}
                drawerClose={true}
                offset={-100}
              />
            </Drawer>
          </Box>
        </Box>
      </Container>
    </NavbarWrapper>
  );
};

Navbar.propTypes = {
  navbarStyle: PropTypes.object,
  logoStyle: PropTypes.object,
  button: PropTypes.object,
  row: PropTypes.object,
  menuWrapper: PropTypes.object,
};

Navbar.defaultProps = {
  navbarStyle: {
    className: "sassminimal_navbar",
    minHeight: "70px",
    display: "block",
  },
  row: {
    flexBox: true,
    alignItems: "center",
    width: "100%",
  },
  logoStyle: {
    maxWidth: ["126px", "126px"],
  },
  button: {
    type: "button",
    fontSize: "13px",
    fontWeight: "600",
    color: "white",
    borderRadius: "4px",
    pl: "15px",
    pr: "15px",
    colors: "primaryWithBg",
    minHeight: "auto",
    height: `${1}`,
  },
  menuWrapper: {
    flexBox: true,
    alignItems: "center",
  },
};

export default Navbar;
