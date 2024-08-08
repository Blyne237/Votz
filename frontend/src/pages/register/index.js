import { Box, Grid, CssBaseline, Typography } from "@mui/material";
import React from "react";
import Background from "../../assets/img/background.jpg";
import Logo from "../../assets/img/logo.png";
import RegistrationForm from "./RegistrationForm";
import {
  Timeline,
  TimelineSeparator,
  TimelineConnector,
  TimelineDot,
  TimelineContent,
} from "@mui/lab";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";

const RegisterPage = () => {
  return (
    <>
      <Grid
        container
        component="main"
        sx={{ height: "100vh", bgcolor: "#fff" }}
        width={"100%"}
      >
        <CssBaseline />
        <Grid
          item
          width={"55%"}
          elevation={0}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Box
            sx={{
              my: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
              width: "60%",
            }}
          >
            <Typography variant="h2" sx={{ mt: 5, mb: 0, color: "004143" }}>
              <Box
                sx={{
                  fontWeight: "700",
                  color: "#004143",
                }}
              >
                VOTZ
              </Box>
            </Typography>
            <Box sx={{ alignItems: "center", mt: 4 }}>
              <RegistrationForm />
            </Box>
          </Box>
        </Grid>

        <Grid
          item
          width={"45%"}
          sx={{
            backgroundImage: `url(${Background})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              //   alignItems: "left",
              width: "100%",
            }}
          >
            {/* <Box
              sx={{
                width: "80%",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                margin: "40px 40px"
              }}
            >
             <Box sx={{ p:2 }}>
             <Typography>
                <Box
                  sx={{
                    textAlign: "left",
                    fontWeight: "700",
                    fontSize: "24px",
                    mb: 0,
                    color: "#FF7900",
                  }}
                >
                  Lorem ipsum
                </Box>
              </Typography>
              <Typography>
                <Box
                  sx={{
                    textAlign: "left",
                    fontWeight: "300",
                    fontSize: "24px",
                    mt: 0,
                    color: "#FFF",
                  }}
                >
                  2023
                </Box>
              </Typography>
             </Box>
              <Box>
                <Timeline
                  position="right"
                  sx={{
                    
                    [`& .${timelineItemClasses.root}:before`]: {
                      flex: 0,
                      padding: 0,
                    },
                  }}
                >
                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineDot />
                      <TimelineConnector sx={{ height: "241px" }} />
                    </TimelineSeparator>
                    <TimelineContent
                      sx={{
                        fontSize: "24px",
                        fontWeight: "300",
                        py: 0,
                        px: 2,
                        color: "#FFF",
                      }}
                    >
                      09 Février
                      <Typography>
                        <Box
                          sx={{
                            textAlign: "left",
                            fontWeight: "200",
                            fontSize: "16px",
                            my: 1,
                            width: "70%",
                            color: "##F9F9F9",
                          }}
                        >
                          At vero eos et accusamus et iusto odio dignissimos
                          ducimus qui blanditiis praesentium voluptatum deleniti
                          atque corrupti quos dolores et quas molestias
                          excepturi sint occaecati cupiditate non provident.
                        </Box>
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineDot />
                    </TimelineSeparator>
                    <TimelineContent
                      sx={{
                        fontSize: "24px",
                        fontWeight: "300",
                        py: 0,
                        px: 2,
                        color: "#FFF",
                        display: "inline",
                      }}
                    >
                      10 Février
                    </TimelineContent>
                  </TimelineItem>
                </Timeline>
              </Box>
            </Box> */}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default RegisterPage;
