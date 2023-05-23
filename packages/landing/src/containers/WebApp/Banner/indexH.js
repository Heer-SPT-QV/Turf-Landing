import Box from "common/components/Box";
import Heading from "common/components/Heading";
import Text from "common/components/Text";
import Container from "common/components/UI/Container";
import { BANNER_DATA } from "common/data/WebApp";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Icon } from "react-icons-kit";
import { androidArrowForward } from "react-icons-kit/ionicons/androidArrowForward";
import BannerArea, { Col } from "./banner.style";
import styles from "./banner2.module.css";
import sample from "../../../common/assets/image/sample.jpg";
import { Badge, Chip, Grid, Typography } from "@mui/material";
import { margin } from "styled-system";

const Banner2 = () => {
  const s = [1, 2, 3];
  const { title, text, button, image, tagline } = BANNER_DATA;
  return (
    <BannerArea id="banner_section">
      <Container className="Container">
        <Grid container justifyContent="center" spacing={5}>
          {s.map(() => {
            return (
              <>
                <Grid item>
                  <div className={styles.container}>
                    <div className={styles.card}>
                      <div className={styles.front}>
                        <div
                          style={{
                            height: "70%",

                            borderRadius: "16px",
                            backgroundImage: 'url("/trial2.jpg")',
                            backgroundSize: "cover",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <div
                            className={styles.badge}
                            style={{
                              width: "35%",
                              height: "10%",
                              borderRadius: "0px 0px 10px 10px",
                            }}
                          >
                            <Typography
                              style={{
                                fontSize: "18px",
                                fontFamily: "DM Sans,sans-serif",
                                color: "white",
                              }}
                            >
                              Basic
                            </Typography>
                          </div>
                        </div>
                        <div
                          style={{
                            textAlign: "center",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <div>
                            <Typography
                              style={{
                                fontSize: "22px",
                                fontWeight: "bold",
                                color: "white",
                              }}
                            >
                              Platinum Plan
                            </Typography>
                            <div
                              style={{
                                width: "75%",
                                height: "1px",
                                border: "3px solid white ",
                                margin: "auto",
                                borderRadius: "50px",
                              }}
                            ></div>
                          </div>
                        </div>
                        <div
                          style={{
                            position: "absolute",
                            bottom: "0px",
                            right: "0px",
                            margin: "20px",
                          }}
                        >
                          <Chip
                            label="Rs. 30,000 / yr"
                            style={{
                              backgroundColor: "white",
                              color: "#FF776F",
                              fontWeight: "bold",
                            }}
                          />
                        </div>
                      </div>
                      <div
                        className={styles.back}
                        style={{
                          height: "70%",
                          borderRadius: "16px",
                          background: "transparent",
                        }}
                      >
                        <div
                          style={{
                            height: "30%",
                            borderRadius: "16px",
                            backgroundImage: 'url("/trial2.jpg")',
                            backgroundSize: "cover",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </Grid>
              </>
            );
          })}
        </Grid>
      </Container>
    </BannerArea>
  );
};

export default Banner2;
