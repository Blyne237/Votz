import toast from "react-hot-toast";
// import { CircularProgress } from "@mui/material";

class CustomToast {
  static showSuccess(message) {
    toast.success(message, {
      position: "top-right",
      duration: 5000,
    });
  }

  static showError(message) {
    toast.error(message, {
      position: "top-right",
      duration: 5000,
    });
  }

  static showWarnin(message) {
    toast(message, {
      position: "top-right",
      icon: "⚠️",
      duration: 5000,
    });
  }

//   static showLoading(message) {
//     const toastId = toast.loading(message, {
//       position: "top-right",
//       duration: 0,
//       icon: <CircularProgress variant="success" />,
//     });

//     return toastId;
//   }

  static hideLoading(toastId) {
    toast.dismiss(toastId);
  }
}

export default CustomToast;
