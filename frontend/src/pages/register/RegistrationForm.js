import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  FormControl,
  OutlinedInput,
  InputAdornment,
  Link,
  Snackbar,
  Alert,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { LoginButton } from "../../assets/styles/Widgets";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ApiUrl from "../../utils/api/ApiUrl";

// import { StyledTextfield } from '../../assets/styles/Widgets'

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  const handleInputChange = (event, callback) => {
    callback(event.target.value);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const register = async () => {
      if (email.trim().length === 0) {
        setMessage("Please enter a valid email ");
        setSeverity("warning");
        setOpenAlert(true);
        return;
      }
      if (password.trim().length === 0) {
        setMessage("Please enter a valid password");
        setSeverity("warning");
        setOpenAlert(true);
        return;
      }
    if (password !== confirmPassword) {
      setMessage("Passwod don't match");
      setSeverity("warning");
      setOpenAlert(true);
      return;
    }

    const postData = {
      email: email,
      password: password,
      confirm_password: confirmPassword,
    };

    console.log(postData);
    console.log(`${ApiUrl.baseUrl}${ApiUrl.register}`);

    setOpenBackdrop(true);

    await axios
      .post(`${ApiUrl.baseUrl}${ApiUrl.register}`, postData)
      .then((res) => {
        setMessage(res.data.message);
        setSeverity("success");
        setOpenAlert(true);
        sleep(1000).then(() => {
          setOpenBackdrop(false);
          navigate("/auth/login/");
        });
      })
      .catch((err) => {
        setMessage(
          "Votre compte ne peut être créé, veuillez contacter l'administrateur"
        );
        setMessage(err.response.data.message);

        setOpenAlert(true);
        setOpenBackdrop(false);
        console.log(err);
      });
  };
  return (
    <>
      <Backdrop
        sx={{
          color: "primary.main",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={openBackdrop}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        open={openAlert}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
      <Box
        component="form"
        noValidate
        // onSubmit={handleSubmit}
        sx={{
          mt: 4,
          m: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography component="div">
          <Box
            sx={{
              textAlign: "left",
              fontWeight: "700",
              fontSize: "24px",
              m: 0,
            }}
          >
            Welcome !{" "}
          </Box>
        </Typography>
        <Typography component="div">
          <Box
            sx={{
              textAlign: "left",
              fontWeight: "400",
              fontSize: "14px",
              my: 1,
              color: "#9BA69C",
            }}
          >
            Create an account and start voting
          </Box>
        </Typography>

        <Typography component="div">
          <Box
            sx={{
              textAlign: "left",
              fontWeight: "500",
              fontSize: "14px",
              mt: 3,
            }}
          >
            Email
          </Box>
        </Typography>

        <FormControl sx={{ width: "100%", mt: 1, mb: 2 }} variant="outlined">
          <OutlinedInput
            fullWidth
            sx={{
              borderRadius: 1,
              height: "52px",
              "& input::placeholder": { fontSize: "14px" },
              "&:hover $notchedOutline": {
                borderColor: "primary",
              },
            }}
            id="number"
            autoComplete="number"
            placeholder="Enter your email"
            onChange={(event) => handleInputChange(event, setEmail)}
          />
        </FormControl>

        <Typography component="div">
          <Box
            sx={{
              textAlign: "left",
              fontWeight: "500",
              fontSize: "14px",
              mt: 0,
            }}
          >
            Password
          </Box>
        </Typography>

        <FormControl sx={{ width: "100%", mt: 1, mb: 2 }} variant="outlined">
          <OutlinedInput
            sx={{
              borderRadius: 1,
              height: "52px",
              "& input::placeholder": { fontSize: "14px" },
            }}
            id="password"
            type={showPassword ? "text" : "password"}
            fullWidth
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {/* {showPassword ? <Lock /> : <Lock />} */}
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            placeholder="Enter your password"
            onChange={(event) => handleInputChange(event, setPassword)}
          />
        </FormControl>
        <Typography component="div">
          <Box
            sx={{
              textAlign: "left",
              fontWeight: "500",
              fontSize: "14px",
              mt: 0,
            }}
          >
            Confirm password{" "}
          </Box>
        </Typography>
        <FormControl sx={{ width: "100%", mt: 1, mb: 2 }} variant="outlined">
          <OutlinedInput
            sx={{
              borderRadius: 1,
              height: "52px",
              "& input::placeholder": { fontSize: "14px" },
            }}
            id="comfirm password"
            type={showConfirmPassword ? "text" : "password"}
            fullWidth
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {/* {showPassword ? <Lock /> : <Lock />} */}
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            placeholder="Comfirm your password"
            onChange={(event) => handleInputChange(event, setConfirmPassword)}
          />
        </FormControl>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            mt: 1,
          }}
        >
          <Box sx={{ width: "100%" }}>
            <LoginButton onClick={() => register()}>Register</LoginButton>
          </Box>
        </Box>
        <Box sx={{ textAlign: "left", mt: 2 }}>
          Already have an account?{" "}
          <span>
            <strong>
              <Link
                // href="verify"
                onClick={() => navigate("/auth/login/")}
                variant="body2"
                fontWeight="bold"
                fontSize="16px"
                sx={{ cursor: "pointer" }}
              >
                {"Sign In"}
              </Link>
            </strong>
          </span>
        </Box>
      </Box>
    </>
  );
};

export default RegistrationForm;
