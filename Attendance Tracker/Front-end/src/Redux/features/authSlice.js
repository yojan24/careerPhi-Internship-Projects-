import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: JSON.parse(localStorage.getItem("userInfo")) || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logOut: (state, action) => {
      state.userInfo = null;
      localStorage.clear();
    },
  },
});

export const { setData, logOut } = authSlice.actions;

export default authSlice.reducer;
