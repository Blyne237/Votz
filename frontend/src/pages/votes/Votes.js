import React from 'react'
import { Box, Toolbar } from "@mui/material";

const Votes = () => {
  return (
    <>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <h3>Votes</h3>
      </Box>
    </>
  );
};


export default Votes