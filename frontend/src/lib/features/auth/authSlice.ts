import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, accessToken: null },
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
    },
    logOut: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const getCurrentUser = (state: any) => state.auth.user;
export const getCurrentAccessToken = (state: any) => state.auth.accessToken;
