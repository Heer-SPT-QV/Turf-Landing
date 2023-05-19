import React from "react";
import { Box, Container, Typography, Link, useMediaQuery } from "@material-ui/core";
import { border, style, zIndex } from "styled-system";
import sample from "../common/assets/image/sample.jpg";
import Sticky from "react-stickynode";
import { DrawerProvider } from "common/contexts/DrawerContext";
import { AppWrapper } from "containers/App/app.style";
import { GlobalStyle, ConditionWrapper } from "containers/App/app.style";
import { ThemeProvider } from "styled-components";
import Navbar from 'containers/SaasModern/Navbar';


import { useForm } from "react-hook-form";
import { CssBaseline, Avatar, TextField, Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { saasModernTheme } from "common/theme/saasModern";
import { ContentWrapper } from "containers/SaasModern/sassModern.style";

function login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const matches = useMediaQuery("(min-width:800px)");
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <ThemeProvider theme={saasModernTheme}>
        <ContentWrapper>
        <Sticky top={0} innerZ={9999} activeClass="sticky-nav-active">
            <DrawerProvider>
              <Navbar />
            </DrawerProvider>
          </Sticky>
          <div
            style={{
              paddingTop:'110px',
              height: "1000px",
              width: "100vw",
              backgroundImage:
                'url("http://localhost:3000/_next/static/media/banner-texture.9a3f9d1e.png"),linear-gradient(35deg,rgb(147,249,185) 0%,rgb(29,151,108) 100%) ',
              backgroundSize: "cover",
              display: "flex",
              justifyContent: "center",
              // overflow: "hidden",
            }}
          >
            <div
              style={{
                backgroundColor: "transparent",
                height: "650px",
                margin: "auto",
                width: matches?"80%":"90%",
                display: "flex",
                boxShadow: "0 5px 30px -10px rgba(0,0,0,.1)",
              }}
            >
              {matches && (
                <div
                  style={{
                    width: "50%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    borderRadius: "40px 0px 0px 40px",
                  }}
                >
                  <img style={{ height: "80%", width: "70%" }} src={sample} />
                </div>
              )}
              <div
                style={{
                  width: matches ? "50%": "100%",
                  backgroundColor: "#FFFFFF",
                  height: "100%",
                  borderRadius: "0px 40px 40px 0px",
                }}
              >
                <Container maxWidth="xs" style={{ position: "relative" }}>
                  <Avatar sx={{ m: "auto", bgcolor: "primary.main" }}>
                    <AccountCircleIcon />
                  </Avatar>
                  <Box
                    sx={{
                      my: 8,
                      mx: 4,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: "32px",
                        fontFamily: "Roboto,sans-serif",
                        fontWeight: "bold",
                        textAlign: "center",
                        marginTop: "20px",
                      }}
                    >
                      SIGN UP
                    </Typography>
                    <Box
                      component="form"
                      border={"2px solid red"}
                      onSubmit={handleSubmit(onSubmit)}
                      noValidate
                      sx={{ mt: 1 }}
                    >
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="firstname"
                        label="First name"
                        type="firstname"
                        id="firstname"
                        autoComplete
                        {...register("firstname", {
                          required: "First name is required",
                        })}
                        helperText={errors.firstname?.message}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="lastname"
                        label="Last name"
                        type="lastname"
                        id="lastname"
                        {...register("lastname", {
                          required: "Last name is required",
                        })}
                        helperText={errors.lastname?.message}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="businessname"
                        label="Business name"
                        type="businessname"
                        id="businessname"
                        {...register("businessname", {
                          required: "Business name is required",
                        })}
                        helperText={errors.businessname?.message}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: "This mail is invaild",
                          },
                        })}
                        helperText={errors.email?.message}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="phoneno"
                        type="tel"
                        label="Phone no"
                        name="phoneno"
                        {...register("phoneno", {
                          required: "Phone number is required",
                          minLength: {
                            value: 10,
                            message: "Please enter valid phone number",
                          },
                          maxLength: {
                            value: 10,
                            message: "Please enter valid phone number",
                          },
                        })}
                        helperText={errors.phoneno?.message}
                      />

                      <Box style={{ textAlign: "center" }}>
                        <Button
                          type="submit"
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                        >
                          Sign In
                        </Button>
                        <br />
                        <>If already register click on </>
                        <Link href="#" variant="body2">
                          {"Log in"}
                        </Link>
                      </Box>
                    </Box>
                  </Box>
                </Container>
              </div>
            </div>
          </div>
          </ContentWrapper>
      </ThemeProvider>
    </>
  );
}

export default login;
