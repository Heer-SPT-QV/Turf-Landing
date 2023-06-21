import React, { useState, useEffect, useCallback, useContext } from "react";
import classnames from "classnames";
import axios from "axios";
import { BiCalendarWeek, BiTime } from "react-icons/bi";
import { toast } from "react-toastify";
import styles from "../css/Bookings.module.css";
import GroundImage from "../images/ground.png";
import GroundImageSelected from "../images/ground_selected.png";
import api from "../config/api";
import headerWithoutToken from "../config/headerWithoutToken";
import { Context } from "../data/context";
import SlotItems from "./SlotItems";
import {
  convertMinsToHrsMins,
  getMaxAllowedMonth,
} from "../utils/TimeConverter";
import { Link } from "react-router-dom";
import { filterData } from "../utils/filterData";
import { compareTime } from "../utils/compareTime";
import Loading from "./Loading";


const Bookings = () => {
  return (
  <div></div>
  );
};

export default Bookings;
