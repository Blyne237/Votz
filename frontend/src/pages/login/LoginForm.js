import React, { useState } from "react";

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
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import ApiUrl from "../../utils/api/ApiUrl";
import { useDispatch } from "react-redux";
import {
  updateLocalUserInfo,
  reducerUserData,
} from "../../reducers/sessionReducer";
import { setCookie } from "cookies-next";
import { useSelector } from "react-redux";
import Loading from "../../utils/others/Loading";
import Toast from "../../utils/others/MuiToast";


const LoginForm = () => {
  const localUserData = useSelector(reducerUserData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleInputChange = (event, callback) => {
    callback(event.target.value);
  };
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const login = async () => {
    if (email.trim().length === 0) {
      setMessage("Please enter a valid email ");
      setSeverity("warning");
      setOpen(true);
      return;
    }
    if (password.trim().length === 0) {
      setMessage("Please enter a valid password");
      setSeverity("warning");
      setOpen(true);
      return;
    }

    const postData = {
      email: email,
      password: password,
    };

    setOpenBackdrop(true);

    await axios
      .post(`${ApiUrl.baseUrl}${ApiUrl.login}`, postData)
      .then((res) => {
        console.log(res.data);
        sessionStorage.setItem("userData", JSON.stringify(res.data.detail));
        dispatch(updateLocalUserInfo(res.data.detail));
        setCookie("token", res.data.detail.token, {
          maxAge: localUserData.expiresIn,
        });
        setCookie("role", res.data.detail.role);
        setMessage(res.data.message);
        setSeverity("success");
        setOpen(true);
        sleep(500).then(() => {
          setOpenBackdrop(false);
          navigate("/home");
        });
      })
      .catch((err) => {
        setMessage(err.response.data.message);
        setSeverity("error");
        setOpen(true);
        setOpenBackdrop(false);
      });
  };

  return (
    <>
      <Loading open={openBackdrop} />
      <Toast
        open={open}
        message={message}
        severity={severity}
        handleClose={handleClose}
      />
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
            Hello !
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
            Sign in to our voting platform
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
            Email address
          </Box>
        </Typography>

        <FormControl sx={{ width: "100%", mt: 1, mb: 2 }} variant="outlined">
          <OutlinedInput
            fullWidth
            sx={{
              borderRadius: 1,
              height: "52px",
              "& input::placeholder": { fontSize: "14px" },
              "&:hover": {
                bordercolor: "primary",
              },
            }}
            id="email"
            autoComplete="email"
            placeholder="Enter your email address"
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
              height: "52px",
              borderRadius: 1,

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
        {/* <FormControlLabel
          // sx={{ fontSize: "12px", }}
          value="end"
          control={
            <Checkbox
              sx={{ "& .MuiSvgIcon-root": { fontSize: 28, borderRadius: 3 } }}
            />
          }
          label={
            <Typography sx={{ fontSize: "14px", fontWeight: "500" }}>
              Se souvenir de moi
            </Typography>
          }
          labelPlacement="end"
        /> */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            mt: 5,
          }}
        >
          <Box sx={{ width: "50%" }}>
            <LoginButton onClick={() => login()}>Sign In</LoginButton>
          </Box>
          <Box sx={{ width: "50%", m: 0 }}>
            <Typography component="div">
              <Box
                sx={{
                  textAlign: "center",
                  fontWeight: "500",
                  fontSize: "14px",
                  mx: 0,
                }}
              >
                <Link
                  underline="none"
                  // href="verify"
                  onClick={() => navigate("/reset-password/")}
                  variant="body2"
                  fontWeight="500"
                  color={"#000000"}
                  sx={{ cursor: "pointer" }}
                >
                  {"Forgot Password ?"}
                </Link>
              </Box>
            </Typography>
          </Box>
        </Box>
        <Box sx={{ textAlign: "left", mt: 4 }}>
          Do not have an account yet?{" "}
          <span>
            <strong>
              <Link
                // href="verify"
                onClick={() => navigate("/auth/register/")}
                variant="body2"
                fontWeight="bold"
                fontSize="16px"
                sx={{ cursor: "pointer" }}
              >
                {"Register"}
              </Link>
            </strong>
          </span>
        </Box>
      </Box>
    </>
  );
};

export default LoginForm;
