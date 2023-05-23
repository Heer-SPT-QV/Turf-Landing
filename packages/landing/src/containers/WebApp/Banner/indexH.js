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
import { Badge, Button, Chip, Grid, Typography } from "@mui/material";
import { justifyContent, margin } from "styled-system";

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
                              backgroundColor: "#1976d2",
                              color: "white",
                              fontWeight: "bold",
                            }}
                          />
                        </div>
                      </div>
                      <div
                        className={styles.back}
                        style={{
                          height: "100%",
                          borderRadius: "16px",
                          background: "transparent",
                        }}
                      >
                        <div
                          style={{
                            height: "20%",
                            borderRadius: "16px",
                            backgroundImage: 'url("/trial2.jpg")',
                            backgroundSize: "cover",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        ></div>
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
                                color: "#1976d2",
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
                            margin: "20px",
                            color: "gray",
                            textAlign: "justify",
                          }}
                        >
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu
                          fugiat nulla pariatur. 

                          <Typography style={{color:'#1976d2', fontWeight:'bold', marginTop:'10%'}}>Validity: 2 Years</Typography>
                          <Typography style={{color:'#1976d2', fontWeight:'bold', marginTop:'2%'}}>Subscription Fee: Rs. 60,000</Typography>
                        </div>
                        

                        <div style={{width:'100%', display:'flex', justifyContent:'center', position:'absolute', bottom:'5%'}}>
                          <Button variant="contained" style={{ width: "80%" }}>
                            Subscribe
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Grid>
              </>
            );
          })}
        </Grid>
      </Container>
      <Box className="bannerImage">
        {image.map(({ src }, index) => (
          <Image src={src} alt="" key={`banner-image-key-${index}`} />
        ))}
      </Box>
    </BannerArea>
  );
};

export default Banner2;
