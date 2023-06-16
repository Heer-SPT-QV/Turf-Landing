import React, { useContext, useRef } from "react";
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

const Login = () => {
  const { state } = useLocation();
  const history = useHistory();

  const { isLoggedIn, setIsLoggedIn, setUserData, cartId, setToken } =
    useContext(Context);
  const phoneRef = useRef(null);
  const otpRef = useRef(null);

  const handleSignInBtnClicked = () => {
    if (!phoneRef.current.value.trim().length) {
      toast.error("Phone Number Cannot be empty");
      return;
    }

    if(!/^(0|91)?[6-9][0-9]{9}$/.test(phoneRef.current.value.trim())){
      toast.error('Phone Number is wrong');
      return;
    }
    if (!otpRef.current.value.trim().length) {
      toast.error("OTP Cannot be empty");
      return;
    }

    const values = {
      number: phoneRef.current.value,
      otp: otpRef.current.value,
      cartId: cartId,
    };

          history.push(state?.from || "/");
          setIsLoggedIn(true);



  //   axios
  //     .post(api + "user/login", values, headerWithoutToken)
  //     .then(async (res) => {
  //       if (res.data.code === 200) {
  //         console.log(res.data);
  //         localStorage.setItem("token", res.data.body.token);
  //         localStorage.setItem(
  //           "turfUserDetails",
  //           JSON.stringify(res.data.body.user)
  //         );
  //         if (localStorage.getItem("turfCart") !== null) {
  //           localStorage.removeItem("turfCart");
  //         }
  //         setToken(res.data.body.token);
  //         setUserData(res.data?.body?.user);
  //         setIsLoggedIn(true);
  //         history.push(state?.from || "/");
  //       }
  //       if (res.data.code === 404) {
  //         toast.error(res.data.message);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       toast.error(err?.response?.data?.message);
  //       toast.error(err.message);
  //     });
  };

  const LoginSideComponent = () => {
    return (
      <div className="my-5 mx-3">
        <p
          className={classnames(
            "subtitle is-1 is-capitalized has-text-white has-text-centered"
          )}
        >
          Sign in
        </p>
        <div>
          <Link
            to={{
              pathname: "/signup",
              state: {
                from: state?.from || "/",
              },
            }}
            className={classnames("subtitle is-capitalized has-text-white ")}
          >
            New User?
            <span className={classnames("has-text-info")}>
              {" "}
              Create An Account
            </span>
          </Link>

          <div className="field my-3">
            <div className="control">
              <input
                className={classnames("input", styles.LoginInputs)}
                type="tel"
                placeholder="Phone Number"
                required
                ref={phoneRef}
              />
            </div>

            <div className="control">
              <input
                className={classnames("input mt-3", styles.LoginInputs)}
                type="number"
                placeholder="OTP"
                required
                ref={otpRef}
              />
            </div>

            <div className="control">
              <label className="checkbox has-text-white ">
                <input type="checkbox" />
                <span className="is-size-5 ml-3">Keep me signed in</span>
              </label>
            </div>
          </div>
        </div>

        <div className="has-text-centered my-6">
          <button
            onClick={() => handleSignInBtnClicked()}
            className={classnames(styles.signInBtn, "is-clickable")}
          >
            Sign In
          </button>
        </div>

        <div className={classnames(styles.dividerWrapper)}>
          <div className={classnames(styles.dividerLine)}></div>
          <p className={classnames("has-text-white subtitle")}>Follow Us @</p>
          <div className={classnames(styles.dividerLine)}></div>
        </div>

        <div className={classnames("my-6", styles.socialIconsWrapper)}>
          <AiOutlineGoogle
            className="is-clickable"
            size={40}
            color="#FFF"
            onClick={() => {
              window.open(`${links.google}`, "_blank");
            }}
          />
          <AiFillFacebook
            className="is-clickable"
            size={40}
            color="#FFF"
            onClick={() => {
              window.open(`${links.facebook}`, "_blank");
            }}
          />

          <AiOutlineInstagram
            className="is-clickable"
            size={40}
            color="#FFF"
            onClick={() => {
              window.open(`${links.instagram}`, "_blank");
            }}
          />
        </div>
      </div>
    );
  };

  if (isLoggedIn) {
    return <Redirect to={state?.from || "/"} />;
  }

  return (
    <>
      <div className={classnames(styles.addRelationalBackground)}></div>
      <div className={classnames("section", styles.LoginWrapper)}>
        <div
          className={classnames("container is-fluid", styles.overRideContainer)}
        >
          <div style={{justifyContent:'center',margin:'auto',display:'flex',maxWidth:'35%',flexDirection:'column'}}>
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
