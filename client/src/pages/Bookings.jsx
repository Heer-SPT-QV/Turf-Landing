import React, { useEffect } from "react";
import classnames from "classnames";
import Bookings from "../components/Bookings";
import styles from "../css/BookingPage.module.css";
import LandingPage from "../components/LandingPage";
import Footer from "../components/footer";

const Home = () => {
  useEffect(() => {
    document.querySelector(".navbar").style.display = "none";
  }, []);
  // useEffect(() => {
  //   document.querySelector(".footer").style.display = "none";
  // }, []);
  return (
    <>
      <div className={classnames(styles.addRelationalBackground)}></div>
      <div className={classnames(styles.addHomeBackground)}>
        <div
          className={classnames("container is-fluid", styles.overRideContainer)}
        >
          <LandingPage />
          <Bookings />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
