import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
// import ResetPasswordPage from "./pages/reset-password";
// import OtpPage from "./pages/reset-password/OTP";
// import NewPasswordPage from "./pages/reset-password/NewPassword";
import BasicLayout from "./components/layouts/BasicLayout";
import HomePage from "./pages/home/Home";

import { Provider } from "react-redux";
import store from "./reducers";
import Landing from "./pages/landing/Landing";
import Elections from "./pages/elections/Elections";
import Votes from "./pages/votes/Votes";
import Candidates from "./pages/candidates/Candidates";
import Detail from "./pages/elections/Detail";

const theme = createTheme({
  palette: {
    primary: {
      main: "#004143",
      light: "#FFE4C4",
    },
    secondary: {
      main: "#FF7900",
    },
    ternary: {
      main: "#F86060",
    },
    // background: {
    //   default: "#eafafb",
    // },
  },
  typography: {
    fontFamily: ["Poppins"].join(","),
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<BasicLayout />}>
              <Route index element={<Landing />} />
              <Route path="home/" element={<HomePage />} />
              <Route path="elections/" element={<Elections />} />
              <Route path="votes/" element={<Votes />} />
              <Route path="candidates/" element={<Candidates />} />
              <Route path="election-detail/" element={<Detail />} />
              <Route path="*" element={<p>404 NOT FOUND</p>} />
            </Route>

            <Route path="/auth" element={<Outlet />}>
              <Route path="login/" element={<LoginPage />} />
              <Route path="register/" element={<RegisterPage />} />
            </Route>
            {/* 
            <Route path="reset-password/" element={<ResetPasswordPage />} />
            <Route path="otp/" element={<OtpPage />} />
            <Route path="new-password/" element={<NewPasswordPage />} /> */}
            <Route path="*" element={<p>404 NOT FOUND</p>} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
