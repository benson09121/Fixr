import React, { useEffect, useState } from "react";
import { Grid2, Box, Card, Stack, Typography } from "@mui/material";
import { Helmet, HelmetProvider } from "react-helmet-async";
import AuthLogin from "./auth/AuthLogin";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [cookies, setCookies, removeCookies] = useCookies(["admin_token"]);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (cookies.admin_token) {
      if (jwtDecode(cookies.admin_token)) {
        const decoded = jwtDecode(cookies.admin_token);
        if (decoded.account_type === "admin") {
          navigate("/admin/dashboard");
        }
      } else {
        removeCookies("admin_token");
      }
    } else {
      removeCookies("admin_token");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost/FIXR/API/admin/Authentication/adminLogin.php",
        credentials
      );
      if (response.data.status === 200) {
        const token = jwtDecode(response.data.data);
        if (token.account_type === "admin") {
          setCookies("admin_token", response.data.data, {});
          navigate("/admin/dashboard");
        }
      }
    } catch (error) {
      if (error.response.status === 401) {
        alert("Wrong Output!");
      }
      if (error.response.status === 404) {
        alert("Not Found!");
      }
    }
  };

  const handleInputChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Admin Login</title>
        </Helmet>
        <Box
          sx={{
            position: "relative",
            "&:before": {
              content: '""',
              background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
              backgroundSize: "400% 400%",
              animation: "gradient 15s ease infinite",
              position: "absolute",
              height: "100%",
              width: "100%",
              opacity: "0.3",
            },
          }}
        >
          <Grid2
            container
            spacing={0}
            justifyContent="center"
            sx={{ height: "100vh" }}
          >
            <Grid2 display="flex" justifyContent="center" alignItems="center">
              <Card
                elevation={9}
                sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px" }}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                ></Box>
                <AuthLogin
                  subtext={
                    <Typography
                      variant="subtitle1"
                      textAlign="center"
                      color="textSecondary"
                      mb={1}
                    >
                      Admin Login
                    </Typography>
                  }
                  subtitle={
                    <Stack
                      direction="row"
                      spacing={1}
                      justifyContent="center"
                      mt={3}
                    ></Stack>
                  }
                  credentials={credentials}
                  handleInputChange={handleInputChange}
                  handleLogin={handleLogin}
                />
              </Card>
            </Grid2>
          </Grid2>
        </Box>
      </HelmetProvider>
    </div>
  );
}
