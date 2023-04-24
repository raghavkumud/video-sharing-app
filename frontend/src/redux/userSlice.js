import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
  theme: {
    darkMode: false,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logOutRequest: (state) => {
      state.loading = true;
    },
    logoutSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    logOutFailure: (state) => {
      state.error = true;
      state.loading = false;
    },
    subscription: (state, action) => {
      if (state.currentUser.subscribers.includes(action.payload)) {
        state.currentUser.subscribers.splice(
          state.currentUser.subscribers.findIndex(
            (channelId) => channelId === action.payload
          ),
          1
        );
      } else {
        state.currentUser.subscribers.push(action.payload);
      }
    },
    setTheme: (state) => {
      state.theme.darkMode = !state.theme.darkMode;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logOutFailure,
  logOutRequest,
  subscription,
  setTheme,
} = userSlice.actions;

export default userSlice.reducer;
