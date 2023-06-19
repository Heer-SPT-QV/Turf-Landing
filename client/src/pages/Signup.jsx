import React, { useContext, useRef } from "react";
import { Link, useLocation, useHistory, Redirect } from "react-router-dom";
import classnames from "classnames";
import {
  AiOutlineGoogle,
  AiFillFacebook,
  AiOutlineInstagram,
} from "react-icons/ai";
import { toast } from "react-toastify";
import { Context } from "../data/context";
import CartRightSideComponent from "../components/CartRightSideComponent";
import styles from "../css/Login.module.css";
import axios from "axios";
import api, { TurfMail } from "../config/api";
import headerWithoutToken from "../config/headerWithoutToken";
import { links } from "../config/socialLinks";
import Footer from "../components/footer";

// eslint-disable-next-line no-useless-escape
const EmailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const Signup = () => {
  const { state } = useLocation();
  const history = useHistory();

  const {
    isLoggedIn,
    setIsLoggedIn,
    setUserData,
    // cartId,
    setToken,
  } = useContext(Context);

  const fnameRef = useRef(null);
  const lnameRef = useRef(null);
  const unameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);


  const handleOnSignUpBtnClicked = () => {
    if (!fnameRef.current?.value.trim().length) {
      toast.error("First Name Cannot be empty");
      return;
    }
    if (!lnameRef.current?.value.trim().length) {
      toast.error("Last Name Cannot be empty");
      return;
    }

    if (!unameRef.current?.value.trim().length) {
      toast.error("User Name Cannot be empty");
      return;
    }
    if (!emailRef.current?.value.trim().length) {
      toast.error("Email Cannot be empty");
      return;
    }
    if (!EmailRegex.test(String(emailRef.current?.value).toLowerCase())) {
      toast.error("Email is not valid");
      return;
    }
    if (!phoneRef.current?.value.trim().length) {
      toast.error("Phone Number Cannot be empty");
      return;
    }
    if (!/^(0|91)?[6-9][0-9]{9}$/.test(phoneRef.current?.value.trim())) {
      toast.error('Phone Number is wrong');
      return;
    }


    const values = {
      businessId:2,
      firstname: fnameRef.current?.value,
      lastname: lnameRef.current?.value,
      username: unameRef.current?.value,
      email: emailRef.current?.value,
      phonenumber: Number(phoneRef.current?.value),
      // role: "USER",
      // cartId: cartId,
    };

    axios
      .post(api + "User", values, headerWithoutToken)
      .then(async (res) => {
        console.log(res)
        console.log(res.data)
        console.log(res.status)
        if (res.status === 200) {
          // await localStorage.setItem("token", res.data.body.token);  
          await localStorage.setItem("turfUserDetails",JSON.stringify(res.config.data));
          if (localStorage.getItem("turfCart") !== null) {
            localStorage.removeItem("turfCart");
          }
          // setToken(res.data.body.token);
          setUserData(res.data?.body?.user);
          // setIsLoggedIn(true);
          history.push(state?.from || "/");
        
        }else{
          console.warn('hello')
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message);
        toast.error("here's error:",err.message);
      });
  };

  const SignUpSideComponent = () => {
    return (
      <div className="my-5 mx-3">
        <p
          className={classnames(
            "subtitle is-1 is-capitalized has-text-white has-text-centered"
          )}
        >
          Sign up
        </p>
        <Link
          to={{
            pathname: "/login",
            state: {
              from: state?.from || "/",
            },
          }}
          className={classnames("subtitle is-capitalized has-text-white ")}
        >
          Already have an account ?
          <span className={classnames("has-text-info")}> Sign In !</span>
        </Link>

        <div className="field my-3">
          <div className="control">
            <input
              className={classnames("input", styles.LoginInputs)}
              type="text"
              placeholder="First Name"
              required
              ref={fnameRef}
            />
          </div>

          <div className="control">
            <input
              className={classnames("input", styles.LoginInputs)}
              type="text"
              placeholder="Last Name"
              required
              ref={lnameRef}
            />
          </div>

          <div className="control">
            <input
              className={classnames("input", styles.LoginInputs)}
              type="text"
              placeholder="User Name"
              required
              ref={unameRef}
            />
          </div>

          <div className="control">
            <input
              className={classnames("input", styles.LoginInputs)}
              type="email"
              placeholder="Email"
              required
              ref={emailRef}
            />
          </div>

          <div className="control">
            <input
              className={classnames("input", styles.LoginInputs)}
              type="number"
              placeholder="Phone Number"
              required
              ref={phoneRef}
            />
          </div>
        </div>

        <div className="has-text-centered my-6">
          <button
            onClick={() => handleOnSignUpBtnClicked()}
            className={classnames(styles.signInBtn, "is-clickable")}
          >
            Sign Up
          </button>
        </div>

        <div className={classnames(styles.dividerWrapper)}>
          <div className={classnames(styles.dividerLine)}></div>
          <p className={classnames("has-text-white subtitle")}>
            Or Sign Up With
          </p>
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
      <div className={classnames(styles.addRelationalBackground)} ></div>
      <div className={classnames("section", styles.LoginWrapper)}>
        <div
          className={classnames("container is-fluid", styles.overRideContainer)}
        >
          <div style={{ justifyContent: 'center', margin: 'auto', display: 'flex', maxWidth: '35%', flexDirection: 'column' }}>
            <div className={classnames(styles.LoginLeftWrapper)} >
              <SignUpSideComponent />
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

export default Signup;
