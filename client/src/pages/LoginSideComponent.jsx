import React, { useContext, useRef, useState } from "react";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import classnames from "classnames";
import {
    AiOutlineGoogle,
    AiFillFacebook,
    AiOutlineInstagram,
} from "react-icons/ai";
import { Context } from "../data/context";
import styles from "../css/Login.module.css";
import { toast } from "react-toastify";
import axios from "axios";
import api from "../config/api";
import headerWithoutToken from "../config/headerWithoutToken";
import { links } from "../config/socialLinks";
import Footer from "../components/footer";
import { CircularProgress } from "@mui/material";


function LoginSideComponent() {

    const [status, setStatus] = useState('ph')
    const [loading, setLoading] = useState(false);


    const { state } = useLocation();
    const history = useHistory();

    const { isLoggedIn, setIsLoggedIn, setUserData, cartId, setToken } =
        useContext(Context);
    // const phoneRef = useRef(null);
    // const otpRef = useRef(null);
    const [timer, setTimer] = useState(10);
    const [phone, setPhone] = useState(null)
    const [otp, setOtp] = useState(null)
    const [phoneError, setPhoneError] = useState()
    const [otpError, setOtpError] = useState()
    // const [content, setContent] = useState({
    //     businessId: 2,
    //     phoneNumber: 0,
    //     otp:0
    // });

    function caller() {
        let t = 5;
        const timerr = setInterval(() => {
            if (t === 0) {
                clearInterval(timerr);
            } else {
                t--;
            }

            setTimer(t);
        }, [1000]);
    }


    const handleSignInBtnClicked = () => {
        var num = Number(phone)
        axios
            .get(api+`Business/Login?PhoneNumber=${num}`, headerWithoutToken)
            .then(async (res) => {
                if (res.status === 200) {
                    if (res.data === 'OTP sent successfully') {
                        if (status === "ph") {
                            setLoading(true);
                            setTimeout(() => {
                                // setOtpS(true);
                                setStatus("otp");
                                setLoading(false);
                                caller();
                            }, 2000);
                        }
                        // localStorage.setItem("token", res.data);
                        // localStorage.setItem("turfUserDetails",JSON.stringify(res.data));
                        // if (localStorage.getItem("turfCart") !== null) {
                        //   localStorage.removeItem("turfCart");
                        // }
                        toast.success(res.data)
                        setUserData(res.data?.body?.user);

                    }else if(res.data==='User Not Found'){
                        toast.warn(res.data)
                    }else{
                        toast.warn('Please try again')
                    }
                }
                if (res.data.code === 404) {
                    toast.error(res.data.message);
                }
            })
            .catch((err) => {
                console.log("Here's an error", err);
                toast.error(err?.response?.data?.message);
                toast.error(err.message);
            });
    };


    const varify_Otp = () => {
        var var_otp = Number(otp)
        var num = Number(phone)

         axios
            .get(api+`Business/VerifyLogin?PhoneNumber=${num}&Otp=${var_otp}`, headerWithoutToken)
             .then(async (res) => {
                 console.log(res)
                 if (res.status === 200) {
                     console.log(res.data)
                     localStorage.setItem('token', res.data)
                     setIsLoggedIn(true);
                     history.push(state?.from || "/");
                 }
             })

    }
    if (isLoggedIn) {
        return <Redirect to={state?.from || "/"} />;
    }

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
                    <div >
                        <input
                            className={classnames("input", styles.LoginInputs)}
                            type="tel"
                            placeholder="Phone Number"
                            // required
                            // ref={phoneRef}
                            value={phone}
                            onChange={(e) => {
                                const num = /^(0|91)?[6-9][0-9]{9}$/.test(e.target.value)

                                if (!num) {
                                    setPhoneError('Enter Valid Phone number')
                                } else {
                                    setPhoneError(null)
                                }
                                setPhone(e.target.value)
                            }}

                        />
                        {phoneError && <span style={{ color: 'red', top: '44px' }}>{phoneError}</span>}
                        {phoneError && <div style={{ height: '14px' }}></div>}
                    </div>

                    {loading && <CircularProgress />}
                    {status !== 'ph' && <div className="control">
                        <input
                            className={classnames("input mt-3", styles.LoginInputs)}
                            type="tel"
                            placeholder="OTP"
                            required
                            // ref={otpRef}
                            value={otp}
                            onChange={(e) => {

                                const otp_check = /^\d{4}$/.test(e.target.value)
                                if (!otp_check) {
                                    setOtpError('Enter valid OTP')
                                } else {
                                    setOtpError(null)
                                }
                                setOtp(e.target.value)
                            }
                            }

                        />
                        {otpError && <span style={{ color: 'red', top: '44px' }}>{otpError}</span>}
                        {otpError && <div style={{ height: '14px' }}></div>}
                    </div>}


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
                    onClick={status === 'ph' ? handleSignInBtnClicked : varify_Otp}
                    className={classnames(styles.signInBtn)}
                    disabled={phoneError || phone === null}
                >
                    {status === 'ph' ? 'Request OTP' : 'Sign In'}
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
    )
}

export default LoginSideComponent