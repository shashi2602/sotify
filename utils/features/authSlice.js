import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: null,
};
export const authslice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: () => {
      return initialState;
    },
  },
});

export const { login, logout } = authslice.actions;
export default authslice.reducer;
