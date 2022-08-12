import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { handleAuthJwt } from "../services/auth/Auth";

export const signOut = () => {
  localStorage.clear("");
};
let reload = false;
if (
  localStorage.getItem("token") != null ||
  localStorage.getItem("user") != null
) {
  reload = true;
  axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");
}

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (accountData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      let response = await axios.post("/auth/signin", accountData);
      await handleAuthJwt(response.data.payload.token);
      return { user: localStorage.getItem("user"), message: "succes signIn" };
    } catch (err) {
      let result = err.message;
      try {
        result =
          err.response.data.message +
          " with status code " +
          JSON.stringify(err.response.status);
      } catch (err) {}
      return rejectWithValue({
        message: result,
      });
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: reload ? localStorage.getItem("user") : null,
    message: null,
    isLoading: false,
    isError: false,
    isAuth: reload ? true : false,
  },
  reducers: {
    reset(state, action) {
      state.isError = false;
      state.user = null;
      state.isAuth = null;
    },
  },
  extraReducers: {
    [signIn.pending]: (state, action) => {
      state.isLoading = true;
    },
    [signIn.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isAuth = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
    },
    [signIn.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload.message;
    },
  },
});

export default authSlice;
