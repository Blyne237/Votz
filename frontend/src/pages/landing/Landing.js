import React from "react";
import { Typography, Toolbar, Box, useTheme } from "@mui/material";
import { LoginButton } from "../../assets/styles/Widgets";
import { Icon } from "@iconify/react";
import Background from "../../assets/img/Wallpaper.jpg";


const Landing = () => {
  const theme = useTheme();

  return (
    <>
      <Box
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
          height: `calc(100vh - ${theme.spacing(1)})`,
          bgcolor: "background.default",
          backgroundImage: `url(${Background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: 1,
          },
          "& > *": {
            position: "relative",
            zIndex: 2,
          },
        }}
      >
        <Toolbar />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              width: { xs: "80%", sm: "60%", md: "50%", lg: "40%" }, // Responsive width
              backgroundColor: "#fff",
              borderRadius: 5,
              padding: { xs: 2, sm: 3 },
              boxShadow: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                mb: 3,
                color: "#004143",
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" }, // Responsive font size
              }}
            >
              <Box
                sx={{
                  fontWeight: "700",
                  color: "#004143",
                }}
              >
                VOTZ
              </Box>
            </Typography>
            <Typography
              variant="h4"
              sx={{
                mb: 3,
                fontWeight: 600,
                fontSize: { xs: "1.25rem", sm: "1.5rem", md: "2rem" }, // Responsive font size
              }}
            >
              Welcome to Votz
            </Typography>
            <Typography
              color="textSecondary"
              textAlign={"center"}
              sx={{
                px: 2,
                fontSize: { xs: "0.875rem", sm: "1rem", md: "1.125rem" }, // Responsive font size
                fontWeight: 600,
                mb: 4,
              }}
            >
              Engage in shaping the future by exploring candidate profiles,
              checking election details, and managing your voting process all in
              one place. Choose from the options below to get started and make
              your vote count!
            </Typography>
            <Box
              sx={{
                width: { xs: "100%", sm: "70%", md: "50%" }, // Responsive width
                display: "flex",
                justifyContent: "center",
              }}
            >
              <LoginButton
                endIcon={
                  <Icon
                    icon="ic:baseline-arrow-forward"
                    style={{ color: "white" }}
                  />
                }
              >
                Vote Now
              </LoginButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Landing;
