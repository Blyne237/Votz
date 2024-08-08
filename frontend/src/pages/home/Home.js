import React from "react";
import { Typography, Toolbar, Box, Button, IconButton } from "@mui/material";
import Card from "@mui/material/Card";

import GroupIcon from "@mui/icons-material/Group";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PersonIcon from "@mui/icons-material/Person";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import { reducerUserData } from "../../reducers/sessionReducer";
import { getCookie } from "cookies-next";
import Background from "../../assets/img/Wallpaper.jpg";



const HomePage = () => {
  const navigate = useNavigate();
  const localUserData = useSelector(reducerUserData);
  console.log(localUserData);

  const role = getCookie("role");
  const data = [
    {
      icon: <LocalOfferIcon sx={{ color: "#004143" }} />,
      label: "Elections",
      description: "View the profiles and details of the candidates.",
      url: "/elections",
    },
    {
      icon: <GroupIcon sx={{ color: "#004143" }} />,
      label: "Candidates",
      description:
        "Find information on upcoming elections and voting procedures.",
      url: "/candidates",
    },
    {
      icon: <PersonIcon sx={{ color: "#004143" }} />,
      label: "My Vote",
      description: "Manage your voting registration and cast your vote.",
      url: "/votes",
    },
  ];

   const filteredData =
     role === "user"
       ? data.filter((item) => item.label !== "Candidates")
       : data;

  const StatsCard = ({ icon, label, description, onClick }) => (
    <Card
      elevation={0}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: 2,
        height: "100%",

        boxShadow: 2,
        justifyContent: "center",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.12)",
        },
      }}
    >
      <CardActionArea
        disableRipple
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 2,
          height: "100%",
          justifyContent: "center",
          p: 2,
        }}
        onClick={onClick}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 70,
            height: 70,
            borderRadius: "50%",
            backgroundColor: "rgb(0, 65, 67, .1)",
            mb: 2,
          }}
        >
          {icon}
        </Box>
        <Typography variant="h6" sx={{ pb: 1 }}>
          {label}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          textAlign="center"
          sx={{ px: 2 }}
        >
          {description}
        </Typography>
      </CardActionArea>
    </Card>
  );

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          height: "100vh",
          display: "flex",
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
            pt: 3,
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", sm: "80%", md: "70%", lg: "70%", xl: "70%" },
              // height: "auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              p: "100px",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                backgroundColor: "#fff",
                borderRadius: 2,
                p: 3,
                boxShadow: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
                mb: 2,
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Welcome to VOTZ
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mb: 3,
                  fontWeight: 600,
                  textAlign: "center",
                  fontSize: "18px",
                }}
              >
                Here, you can participate in shaping the future by casting your
                vote. Choose from the options below to get started.
              </Typography>
              <Grid container spacing={2} sx={{ height: "80%", display:"flex", justifyContent:"center" }}>
                {filteredData.map((item, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <StatsCard
                      icon={item.icon}
                      label={item.label}
                      description={item.description}
                      onClick={() => navigate(item.url)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
