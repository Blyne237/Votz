import { createSlice } from "@reduxjs/toolkit";

const userDataSlice = createSlice({
  name: "userDataSlice",
  initialState: {
    id: null,
    expiresIn: null,
    role: null,
    email: null,
    token: null,
  },
  reducers: {
    deleteLocalUserInfo: (state) => {
      state.id = null;
      state.token = null;
      state.expiresIn = null;
      state.role = null;
      state.email = null;
    },
    updateLocalUserInfo: (state, action) => {
      if (action.payload == null) {
           state.id = null;
           state.token = null;
           state.expiresIn = null;
           state.role = null;
           state.email = null;
      } else {
           state.id = action.payload.id;
           state.token = action.payload.token;
           state.expiresIn = action.payload.expired_in;
           state.role = action.payload.role;
           state.email = action.payload.email;
      }
    },
  },
});

export const { deleteLocalUserInfo, updateLocalUserInfo } =
  userDataSlice.actions;

export const reducerUserData = (state) => state.userDataSlice;

export default userDataSlice;
