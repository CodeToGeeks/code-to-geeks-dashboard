import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * @get  account action
 */
export const getAccount = createAsyncThunk(
  "account/get", async (_,thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    let response = await axios.get("/account");
    return { account: response.data.payload };
  } catch (err) {
    return rejectWithValue({ message:err.message});
  }
});

const initialState = {
  account: null,
  message: null,
  isLoading: false,
  isError: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    reset(state, action) {
      state.isError = false;
      state.message = null;
      state.account = null;
    },
  },
  extraReducers: {
    // get account

    [getAccount.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [getAccount.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.account = action.payload.account;
    },
    [getAccount.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload.message;
      state.account = null;
    },
  },
});

export default accountSlice;
