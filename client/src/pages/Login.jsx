import React, { useContext, useRef, useState } from "react";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import classnames from "classnames";
import {
  AiOutlineGoogle,
  AiFillFacebook,
  AiOutlineInstagram,
} from "react-icons/ai";
import { Context } from "../data/context";
import CartRightSideComponent from "../components/CartRightSideComponent";
import styles from "../css/Login.module.css";
import { toast } from "react-toastify";
import axios from "axios";
import api from "../config/api";
import headerWithoutToken from "../config/headerWithoutToken";
import { links } from "../config/socialLinks";
import Footer from "../components/footer";
import { CircularProgress } from "@mui/material";
import LoginSideComponent from "./LoginSideComponent";



const Login = () => {
 
  return (
    <>
      <div className={classnames(styles.addRelationalBackground)}></div>
      <div className={classnames("section", styles.LoginWrapper)}>
        <div
          className={classnames("container is-fluid", styles.overRideContainer)}
        >
          <div style={{ justifyContent: 'center', margin: 'auto', display: 'flex', maxWidth: '35%', flexDirection: 'column' }}>
            <div className={classnames(styles.LoginLeftWrapper)}>
              <LoginSideComponent />
            </div>
            <div
              className={classnames(
                "column is-two-thirds",
                styles.LoginCartWrapper
              )}
            >
              <CartRightSideComponent />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
