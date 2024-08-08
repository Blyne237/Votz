import React, { useEffect, useState } from "react";
import {
  Box,
  Toolbar,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Backdrop,
  CircularProgress,
  Fab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import Background from "../../assets/img/Wallpaper.jpg";
import ApiUrl from "../../utils/api/ApiUrl";
import { getCookie } from "cookies-next";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Loading from "../../utils/others/Loading";
import Toast from "../../utils/others/MuiToast";


const Elections = () => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null);
  const [election, setElection] = useState([]);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const role = getCookie("role");

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

  const handleDateChange = (newValue) => {
    const formattedDate = dayjs(newValue).format("YYYY-MM-DD");
    setDate(formattedDate);
    console.log(formattedDate);
  };

  const getElections = async () => {
    setOpenBackdrop(true);
    try {
      const response = await axios({
        url: `${ApiUrl.baseUrl}${ApiUrl.electionList}`,
        method: "GET",
        headers: {
          authorization: `Token ${getCookie("token")}`,
        },
      });
      setElection(response.data.detail);
    } catch (error) {
      console.log(error.response);
    } finally {
      setOpenBackdrop(false);
    }
  };

  const createElection = async () => {
    const postData = {
      name: name,
      description: description,
      end_date: date,
    };
    setOpenBackdrop(true);

    try {
      const response = await axios({
        url: `${ApiUrl.baseUrl}${ApiUrl.elections}`,
        method: "POST",
        data: postData,
        headers: {
          authorization: `Token ${getCookie("token")}`,
        },
      });
      // setElection(response.data.detail);
      console.log(response);
      await getElections();
      setMessage(response.data.message);
      setSeverity("success")
      setOpen(true)
      setName("");
      setDescription("");
      setDate(null);
    } catch (error) {
      console.log(error.response);
       setMessage();
       setSeverity("error");
      setOpen(true);

    } finally {
      setOpenBackdrop(false);
      handleClose();
    }
  };

  useEffect(() => {
    getElections();
  }, []);

  const goToDetails = (election) => {
    let path = "/election-detail";
    navigate(path, { state: { election: election } });
  };

  return (
    <>
      <Loading open={openBackdrop} />
      <Toast
        open={open}
        message={message}
        severity={severity}
        handleClose={handleCloseAlert}
      />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Box sx={{ width: "60%", display: "flex", flexDirection: "column" }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Elections
            </Typography>
            <Grid container spacing={2}>
              {election.map((election) => (
                <Grid item xs={12} sm={6} md={4} key={election.id}>
                  <Card
                    sx={{
                      transition: "transform 0.2s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                    }}
                    onClick={() => goToDetails(election)}
                  >
                    <CardMedia
                      component="img"
                      alt={election.name}
                      height="140"
                      image={Background}
                    />
                    <CardContent
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Box>
                        <Typography variant="h5" component="div">
                          {election.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Number of Candidates: {election.candidate_set.length}
                        </Typography>
                      </Box>
                      {/* {role !== "admin" ? null : (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 45,
                            height: 45,
                            borderRadius: "50%",
                            backgroundColor: "rgb(0, 65, 67, .1)",
                            mb: 2,
                          }}
                        >
                          <DeleteIcon
                            sx={{ color: "#004143" }}
                            onClick={() => deleteElection(election.id)}
                          />
                        </Box>
                      )} */}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
        {role !== "admin" ? null : (
          <Fab
            variant="extended"
            color="primary"
            aria-label="add"
            sx={{
              position: "fixed",
              top: 100,
              right: 16,
              textTransform: "none",
            }}
            onClick={handleClickOpen}
          >
            <AddIcon sx={{ mr: 1 }} />
            Create Election
          </Fab>
        )}
        <Dialog open={openDialog} onClose={handleClose}>
          <DialogTitle>Create New Election</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please fill in the details of the new election.
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ mt: 1 }}
                value={date ? dayjs(date) : null}
                onChange={handleDateChange}
              />
            </LocalizationProvider>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={createElection}>Create</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default Elections;
