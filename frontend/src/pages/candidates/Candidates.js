import React from 'react'
import { Box, Toolbar } from "@mui/material";

const Candidates = () => {
    const candidates = [
      { id: 1, name: "Chanele", description: "La plus belle", vote_count: 10 },
      { id: 2, name: "Chanele", description: "La plus belle", vote_count: 10 },
      { id: 3, name: "Chanele", description: "La plus belle", vote_count: 10 },
      { id: 4, name: "Chanele", description: "La plus belle", vote_count: 10 },
      { id: 5, name: "Chanele", description: "La plus belle", vote_count: 10 },
      { id: 6, name: "Chanele", description: "La plus belle", vote_count: 10 },
      { id: 7, name: "Chanele", description: "La plus belle", vote_count: 10 },
      { id: 8, name: "Chanele", description: "La plus belle", vote_count: 10 },
      { id: 9, name: "Chanele", description: "La plus belle", vote_count: 10 },
      { id: 10, name: "Chanele", description: "La plus belle", vote_count: 10 },
      { id: 11, name: "Chanele", description: "La plus belle", vote_count: 10 },
      { id: 12, name: "Chanele", description: "La plus belle", vote_count: 10 },
    ];
  return (
    <>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <h3>Candidates</h3>
        {/* <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                pb: 5,
                gap: 1,
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  textTransform: "none",
                  height: "50px",
                  width: "25%",
                  fontSize: "16px",
                  color: "#0c7c59",
                  borderColor: "#0c7c59",
                  borderRadius: "6px",
                  fontWeight: 400,
                  "&:hover": {
                    background: "#DC143C",
                    color: "var(--White, #FFF)",
                    borderColor: "#DC143C",
                  },
                }}
                // onClick={deleteElectionVote}
              >
                Clear Vote
              </Button>
              <Button
                sx={{
                  textTransform: "none",
                  height: "50px",
                  width: "25%",
                  fontSize: "16px",
                  background: "#0c7c59",
                  color: "var(--White, #FFF)",
                  borderRadius: "6px",
                  fontWeight: 400,
                  "&:hover": {
                    background: "#0C684B",
                    color: "var(--White, #FFF)",
                  },
                }}
                // onClick={submitElectionVote}
              >
                Submit Vote
              </Button>
            </Box>
            <Grid
              container
              spacing={{ xs: 2, md: 4 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {candidates.map((candidate, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                  <Card elevation={0}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        // height={100}
                        image={Image}
                        alt="candidate image"
                      />
                      <CardContent
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box>
                          <Typography gutterBottom variant="h6" component="div">
                            Name
                          </Typography>
                          <Typography variant="body2" color="#0c7c59">
                            {`Total votes: 0`}
                          </Typography>
                        </Box>

                        <IconButton
                          aria-label="add to favorites"
                          // onClick={() => setCurrentCandidate({})}
                        >
                          <FavoriteIcon
                            sx={{
                              width: "50px",
                              height: "50px",
                              color: "#D8D8D8",
                              // candidate === currentCandidate
                              //   ? "#F86060"
                              //   : "#D8D8D8",
                            }}
                          />
                        </IconButton>
                      </CardContent>
                      <CardActions disableSpacing></CardActions>
                    </CardActionArea>
                  </Card>
                  <Button
                    sx={{
                      textTransform: "none",
                      height: "50px",
                      width: "100%",
                      fontSize: "16px",
                      background: "#0c7c59",
                      color: "var(--White, #FFF)",
                      borderRadius: "6px",
                      fontWeight: 400,
                      "&:hover": {
                        background: "#0C684B",
                        color: "var(--White, #FFF)",
                      },
                    }}
                    // onClick={() => handleClickVote(candidate, index)}
                  >
                    Vote
                  </Button>
                </Grid>
              ))}
            </Grid> */}
      </Box>
    </>
  );
};

export default Candidates