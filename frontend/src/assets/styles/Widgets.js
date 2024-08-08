import { styled ,} from '@mui/material/styles';
import { Button } from "@mui/material";

export const LoginButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  height: "56px",
  width: "100%",
  fontSize: "18px",
  background: "#004143",
  color: "var(--White, #FFF)",
  borderRadius: "25px",
  fontWeight: 400,
  "&:hover": { background: "#008A8E", color: "var(--White, #FFF)" },
}));

export const ResetPasswordButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  height: "56px",
  width: "100%",
  fontSize: "18px",
  background: "#00833D",
  color: "var(--White, #FFF)",
  borderRadius: "5px",
  fontWeight: 400,
  "&:hover": { background: "#FF7900", color: "var(--White, #FFF)" },
}));

export const AppBarButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  height: "42px",
  width: "167px",
  fontSize: "16px",
  background: "#00833D",
  color: "var(--White, #FFF)",
  borderRadius: "6px",
  fontWeight: 400,
  "&:hover": { background: "#FF7900", color: "var(--White, #FFF)" },
}));


export const StyledOutlinedInput = styled(Button)(({ theme }) => ({
  height: "52px",
  " &:hover": {
    borderColor: "#FC7900",
  },
}));

// export const Search = styled("div")(({ theme }) => ({
//   position: "relative",
//   border:"10px",
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   "&:hover": {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: 0,
//   width: "100%",
//   [theme.breakpoints.up("sm")]: {
//     marginLeft: theme.spacing(3),
//     width: "auto",
//   },
// }));

// export const SearchIconWrapper = styled("div")(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: "100%",
//   position: "absolute",
//   pointerEvents: "none",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// }));

// export const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: "inherit",
//   "& .MuiInputBase-input": {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create("width"),
//     width: "100%",
//     [theme.breakpoints.up("md")]: {
//       width: "20ch",
//     },
//   },
// }));
