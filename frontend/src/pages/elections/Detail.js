import React from "react";
import {
  Box,
  Toolbar,
  Typography,
  Grid,
  Card,
  CardContent,
  Container,
  CardActionArea,
  CardMedia,
  IconButton,
  Button,
  CardActions,
  Fab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useLocation } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { getCookie } from "cookies-next";
import { useState, useEffect } from "react";
import ApiUrl from "../../utils/api/ApiUrl";
import axios from "axios";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { Zoom } from "@mui/material";
import Image from "../../assets/img/noCandidate.png";
import { useNavigate } from "react-router-dom";
import Toast from "../../utils/others/MuiToast";
import Loading from "../../utils/others/Loading";
import CandidateDetails from "./CandidateDetails";

const Detail = () => {
  const election = useLocation().state.election;
  // console.log(election.id);
  const role = getCookie("role");
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [description, setDescription] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [candidateToDelete, setCandidateToDelete] = useState(null);
  const [currentCandidate, setCurrentCandidate] = useState([]);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");
  const [openDetails, setOpenDetails] = useState(false);
  const [open, setOpen] = useState(false);
  const [voteId, setVoteId] = useState(0);
  const [openMenu, setOpenMenu] = useState(false);
  const [openDE, setOpenDE] = useState(false);

  const handleToggle = () => {
    setOpenMenu((prevOpen) => !prevOpen);
  };

  const handleOpenDetails = () => {
    setOpenDetails(true);
  };
  const handleCloseDetails = () => {
    setOpenDetails(false);
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleClickOpenDelete = (candidate) => {
    setCandidateToDelete(candidate);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const handleClickOpenDE = (candidate) => {
    setOpenDE(true);
  };

  const handleCloseDE = () => {
    setOpenDE(false);
  };

  // Function to sort candidates by vote count

  const getVotes = async () => {
    setOpenBackdrop(true);

    try {
      const response = await axios({
        url: `${ApiUrl.baseUrl}${ApiUrl.votes}`,
        method: "GET",
        headers: {
          authorization: `Token ${getCookie("token")}`,
        },
      });
      setCurrentCandidate(response.data[0].candidate);
      setVoteId(response.data[0].id);
      await getCandidates();
    } catch (error) {
      console.log(error.response);
    } finally {
      setOpenBackdrop(false);
    }
  };
  const vote = async (candidateId) => {
    const postData = {
      election_id: election.id,
      candidate_id: candidateId,
    };
    setOpenBackdrop(true);

    try {
      const response = await axios({
        url: `${ApiUrl.baseUrl}${ApiUrl.votes}`,
        method: "POST",
        data: postData,
        headers: {
          authorization: `Token ${getCookie("token")}`,
        },
      });

      setMessage(response.data.details);
      setSeverity("success");
      setOpen(true);
      await getVotes();
    } catch (error) {
      console.log(error.response);
      setMessage("Vote Error");
      setSeverity("error");
      setOpen(true);
    } finally {
      setOpenBackdrop(false);
    }
  };
  const createCandidate = async () => {
    const postData = {
      election: election.id,
      name: name,
      description: description,
    };
    setOpenBackdrop(true);

    try {
      const response = await axios({
        url: `${ApiUrl.baseUrl}${ApiUrl.candidates}`,
        method: "POST",
        data: postData,
        headers: {
          authorization: `Token ${getCookie("token")}`,
        },
      });
      // setElection(response.data.detail);
      await getCandidates();
      setMessage(response.data.message);
      setSeverity("success");
      setOpen(true);
      setName("");
      setDescription("");
    } catch (error) {
      console.log(error.response);
      setMessage(error.response.data.message);
      setSeverity("error");
      setOpen(true);
    } finally {
      setOpenBackdrop(false);
    }
  };
  const deleteElection = async () => {
    setOpenBackdrop(true);
    try {
      await axios({
        url: `${ApiUrl.baseUrl}${ApiUrl.elections}${election.id}/`,
        method: "DELETE",
        headers: {
          authorization: `Token ${getCookie("token")}`,
        },
      });

      navigate("/elections/");
      setMessage("Election deleted Successfully");
      setSeverity("success");
      setOpen(true);
    } catch (error) {
      console.log(error.response);
      setMessage("Failed to delete");
      setSeverity("error");
      setOpen(true);
    } finally {
      setOpenBackdrop(false);
    }
  };
  const deleteCandidate = async (candidateId) => {
    setOpenBackdrop(true);
    try {
      await axios({
        url: `${ApiUrl.baseUrl}${ApiUrl.candidates}${candidateId}/`,
        method: "DELETE",
        headers: {
          authorization: `Token ${getCookie("token")}`,
        },
      });
      await getCandidates();
      setMessage("Deleted Successfully");
      setOpen(true);
    } catch (error) {
      console.log(error.response);
      setMessage("Failed to delete");
      setSeverity("error");
      setOpen(true);
    } finally {
      setOpenBackdrop(false);
    }
  };
  const clearVote = async () => {
    setOpenBackdrop(true);
    try {
      await axios({
        url: `${ApiUrl.baseUrl}${ApiUrl.votes}${voteId}/`,
        method: "DELETE",
        headers: {
          authorization: `Token ${getCookie("token")}`,
        },
      });
      await getCandidates();
      setCurrentCandidate([]);
      setMessage("Cleared Successfully");
      setOpen(true);
    } catch (error) {
      console.log(error.response);
      setMessage("Failed to clear");
      setSeverity("error");
      setOpen(true);
    } finally {
      setOpenBackdrop(false);
    }
  };

  const getCandidates = async () => {
    setOpenBackdrop(true);

    try {
      const response = await axios({
        url: `${ApiUrl.baseUrl}${ApiUrl.elections}${election.id}/`,
        method: "GET",
        headers: {
          authorization: `Token ${getCookie("token")}`,
        },
      });
      setCandidates(response.data.detail.candidate_set);
    } catch (error) {
      console.log(error.response);
    } finally {
      setOpenBackdrop(false);
      handleClose();
      handleCloseDelete();
    }
  };

  useEffect(() => {
    getCandidates();
    getVotes();
  }, []);

  const sortedCandidates = [...candidates].sort(
    (a, b) => b.vote_count - a.vote_count
  );

  return (
    <>
      <Loading open={openBackdrop} />
      <Toast
        open={open}
        message={message}
        severity={severity}
        handleClose={handleCloseAlert}
      />
      <Box sx={{ width: "100%", height: "100%", bgcolor: "#fff" }}>
        <Container maxWidth="md" sx={{ height: "100%", bgcolor: "#fff" }}>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              bgcolor: "background.default",
              p: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              bgcolor: "#fff",
              height: "100%",
            }}
          >
            <Toolbar />
            <Typography variant="h3" sx={{ mt: 1, mb: 0, color: "004143" }}>
              <Box
                sx={{
                  fontWeight: "700",
                  color: "#004143",
                }}
              >
                {election.name}
              </Box>
            </Typography>
            <Typography
              variant="h5"
              gutterBottom
              align="center"
              sx={{
                fontWeight: "600",
              }}
            >
              {election.description}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              gutterBottom
              align="center"
            >
              Start Date: {new Date(election.start_date).toLocaleString()}
            </Typography>
            {election.end_date && (
              <Typography
                variant="body2"
                color="textSecondary"
                gutterBottom
                align="center"
              >
                End Date: {new Date(election.end_date).toLocaleString()}
              </Typography>
            )}

            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              align="center"
              sx={{ m: 4 }}
            >
              Candidates
            </Typography>

            {sortedCandidates.length === 0 ? (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <img src={Image} height={"300"} alt="No Candidates"></img>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  No Candidates
                </Typography>
              </Box>
            ) : (
              <Grid
                container
                spacing={{ xs: 2, md: 4 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                {sortedCandidates.map((candidate, index) => (
                  <Grid item xs={2} sm={4} md={4} key={index}>
                    <Card elevation={0}>
                      <CardActionArea onClick={() => handleOpenDetails()}>
                        <CardMedia
                          component="img"
                          image={
                            candidate.image ||
                            `https://via.placeholder.com/140?text=${candidate.name.charAt(0)}`
                          }
                          alt="candidate image"
                        />
                        {role !== "admin" ? null : (
                          <IconButton
                            aria-label="more options"
                            onClick={() => handleClickOpenDelete(candidate)}
                            sx={{
                              position: "absolute",
                              top: 0,
                              right: 0,
                            }}
                          >
                            <MoreVertIcon />
                          </IconButton>
                        )}
                        <CardContent
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Box>
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="div"
                            >
                              {candidate.name}
                            </Typography>
                            <Typography variant="body2" color="#0c7c59">
                              {`Total votes: ${candidate.vote_count}`}
                            </Typography>
                          </Box>

                          <FavoriteIcon
                            sx={{
                              width: "50px",
                              height: "50px",
                              color:
                                candidate.id === currentCandidate.id
                                  ? "#F86060"
                                  : "#D8D8D8",
                            }}
                          />
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
                        background: "#004143",
                        color: "var(--White, #FFF)",
                        borderRadius: "6px",
                        fontWeight: 400,
                        "&:hover": {
                          background: "#0C684B",
                          color: "var(--White, #FFF)",
                        },
                      }}
                      onClick={() => vote(candidate.id)}
                    >
                      Vote
                    </Button>
                  </Grid>
                ))}
              </Grid>
            )}

            {role !== "admin" ? (
              currentCandidate.length === 0 ||
              currentCandidate.election !== election.id ? null : (
                <Fab
                  variant="extended"
                  aria-label="add"
                  sx={{
                    position: "fixed",
                    top: 100,
                    right: 16,
                    textTransform: "none",
                    backgroundColor: "#F86060",
                    color: "#fff",
                    "&:hover": {
                      background: "#F04060",
                      color: "var(--White, #FFF)",
                    },
                  }}
                  onClick={clearVote}
                >
                  <AddIcon sx={{ mr: 1 }} />
                  Clear Vote
                </Fab>
              )
            ) : (
              <Box sx={{ position: "fixed", top: 100, right: 16 }}>
                <Zoom in={openMenu} unmountOnExit>
                  <Fab
                    variant="extended"
                    sx={{
                      textTransform: "none",
                      position: "fixed",
                      top: 160,
                      right: 16,
                    }}
                    color="primary"
                    aria-label="navigate"
                    onClick={handleClickOpen}
                  >
                    <PersonAddAlt1Icon sx={{ mr: 1 }} />
                    Add Candidate
                  </Fab>
                </Zoom>
                <Zoom in={openMenu} unmountOnExit>
                  <Fab
                    variant="extended"
                    sx={{
                      textTransform: "none",
                      position: "fixed",
                      top: 220,
                      right: 16,
                      backgroundColor: "#F86060",
                      color: "#fff",
                      "&:hover": {
                        background: "#F04060",
                        color: "var(--White, #FFF)",
                      },
                    }}
                    aria-label="edit"
                    onClick={handleClickOpenDE}
                  >
                    <DeleteForeverIcon sx={{ mr: 1 }} />
                    Delete Election
                  </Fab>
                </Zoom>
                <Fab
                  variant="extended"
                  color="primary"
                  aria-label="add"
                  sx={{
                    textTransform: "none",
                  }}
                  onClick={handleToggle}
                >
                  {openMenu ? (
                    <CloseIcon sx={{ mr: 1 }} />
                  ) : (
                    <AddIcon sx={{ mr: 1 }} />
                  )}
                  Actions
                </Fab>
              </Box>
            )}

            <Dialog open={openDialog} onClose={handleClose}>
              <DialogTitle>Create New Candidate</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please fill in the details of the new candidate.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Name"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  margin="dense"
                  label="Description"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={createCandidate}>Create</Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={openDE}
              onClose={handleCloseDE}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Delete Election"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to delete this {election.name}?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDE}>Cancel</Button>
                <Button onClick={deleteElection} color="primary">
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={openDelete}
              onClose={handleCloseDelete}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Delete Candidate"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to delete this {candidateToDelete?.name}
                  ?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDelete}>Cancel</Button>
                <Button
                  onClick={() => deleteCandidate(candidateToDelete?.id)}
                  color="primary"
                >
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
            <CandidateDetails
              open={openDetails}
              onClose={handleCloseDetails}
              candidate={currentCandidate}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Detail;
