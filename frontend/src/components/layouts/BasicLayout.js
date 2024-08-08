import * as React from "react";
import {
  Typography,
  AppBar,
  Stack,
  Avatar,
  CssBaseline,
  Drawer,
  Box,
  Toolbar,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Outlet, useNavigate } from "react-router-dom";
import Logo from "../../assets/img/Jevebara.png";
import SearchIcon from "@mui/icons-material/Search";
import { Icon } from "@iconify/react";
import { AppBarButton } from "../../assets/styles/Widgets";
import { useState, useEffect, useCallback } from "react";
import { reducerUserData } from "../../reducers/sessionReducer";
import { useSelector } from "react-redux";
// import { jwtDecode } from "jwt-decode";
import { getCookie } from "cookies-next";
import { deleteCookie } from "cookies-next";

const drawerWidth = 240;

export default function BasicLayout(props) {
  const { window } = props;
  const navigate = useNavigate();
  const localUserData = useSelector(reducerUserData);
  const token = getCookie("token");
  const time = localUserData.expiresIn;

  const checkUserSession = useCallback(() => {
    const expiryTime = new Date(time).getTime();
    const currentTime = new Date().getTime();

    if (!token) {
      navigate("/");
      return;
    } else if (currentTime > expiryTime) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    checkUserSession();
  },[token]);

  const deleteLocalData = async () => {
    deleteCookie("token")
    localStorage.removeItem("userData");
    sessionStorage.removeItem("token");
  };

  const logout = async () => {
    try {
      await deleteLocalData();
      navigate("auth/login/");
      // reload();
    } catch (err) {
      console.error(err);
    }
  };

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const LogOutNavItems = [
    {
      name: "About",
      url: "",
    },
    {
      name: "Contact Us",
      url: "",
    },
  ];

  const LogInNavItems = [
    {
      name: "Home",
      url: "/home",
    },
    {
      name: "About",
      url: "",
    },
    {
      name: "Contact Us",
      url: "",
    },
  ];

  const navItems = token ? LogInNavItems : LogOutNavItems;

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        VOTZ
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={() => {
                navigate(item.url);
              }}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
        {token === null ? (
          <ListItem key={"signin"} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={() => navigate("/auth/login/")}
            >
              <ListItemText primary={"Sign in"} />
            </ListItemButton>
          </ListItem>
        ) : (
          <ListItem key={"logout"} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }} onClick={logout}>
              <ListItemText primary={"Log Out"} />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" elevation={0}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "block" },
                pl: { xs: "none", sm: 20 },
              }}
            >
              VOTZ
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2, pr: 5 }}>
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  sx={{ color: "#fff", textTransform: "none" }}
                  onClick={() => {
                    navigate(item.url);
                  }}
                >
                  {item.name}
                </Button>
              ))}

              {token ? (
                <Button
                  sx={{
                    textTransform: "none",
                    fontSize: "16px",
                    background: "#008A8E",
                    color: "var(--White, #FFF)",
                    borderRadius: "6px",
                    fontWeight: 400,
                    "&:hover": {
                      background: "#06797D",
                      color: "var(--White, #FFF)",
                    },
                  }}
                  onClick={logout}
                >
                  Log out
                </Button>
              ) : (
                <Button
                  sx={{
                    textTransform: "none",
                    fontSize: "16px",
                    background: "#008A8E",
                    color: "var(--White, #FFF)",
                    borderRadius: "6px",
                    fontWeight: 400,
                    "&:hover": {
                      background: "#06797D",
                      color: "var(--White, #FFF)",
                    },
                  }}
                  onClick={() => navigate("/auth/login/")}
                >
                  Sign In
                </Button>
              )}
            </Box>
          </Toolbar>
        </AppBar>
        <nav>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </nav>

        <Box component="main" sx={{ width: "100%", mt: 1 , }}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
}
