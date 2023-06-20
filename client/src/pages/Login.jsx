import React from "react";
import classnames from "classnames";
import CartRightSideComponent from "../components/CartRightSideComponent";
import styles from "../css/Login.module.css";
import Footer from "../components/footer";
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
