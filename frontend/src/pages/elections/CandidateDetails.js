import React from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Card,
  CardMedia,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

const CandidateDetails = ({ open, onClose, candidate }) => {
  
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        fullWidth="md"
        open={open}
        onClose={onClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>Candidate's Details</Typography>
          <IconButton aria-label="more options" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Card elevation={0}>
            <CardMedia
              component="img"
              image={
                // candidate.image ||
                `https://via.placeholder.com/140?text=Candidate`
              }
              alt="candidate image"
            />
          </Card>

          <Box>
            <Typography gutterBottom variant="h6" component="div">
              {candidate.name}
            </Typography>
            <Typography variant="body2" color="#0c7c59">
              {`Total votes: ${candidate.vote_count}`}
            </Typography>
          </Box>

          <DialogContentText>
            {candidate.description}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CandidateDetails;
