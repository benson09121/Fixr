import React from "react";
import { Grid2, Box, Card, Stack, Typography } from "@mui/material";
import { Helmet, HelmetProvider } from "react-helmet-async";
import AuthLogin from "./auth/AuthLogin";

export default function AdminLogin() {
  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Admin Login</title>  
        </Helmet>
        <Box
        sx={{
          position: 'relative',
          '&:before': {
            content: '""',
            background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
            position: 'absolute',
            height: '100%',
            width: '100%',
            opacity: '0.3',
          },
        }}
      >
        <Grid2 container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
          <Grid2
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '500px' }}>
              <Box display="flex" alignItems="center" justifyContent="center">
            
              </Box>
              <AuthLogin
                subtext={
                  <Typography variant="subtitle1" textAlign="center" color="textSecondary" mb={1}>
                    Admin Login
                  </Typography>
                }
                subtitle={
                  <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
                  </Stack>
                }
              />
            </Card>
          </Grid2>
        </Grid2>
      </Box>
      </HelmetProvider>
    </div>
  );
}
