import React from 'react'
import { Backdrop, CircularProgress } from '@mui/material'

const Loading = ({ openBackdrop }) => {
  return (
    <Backdrop
      sx={{
        color: "primary.main",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={openBackdrop}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loading