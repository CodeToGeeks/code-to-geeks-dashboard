import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * @get  logs action
 */
export const getLogs = createAsyncThunk(
  "tags/getPageTags",
  async (params, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      let response = await axios.get("/sys/log", { params: params });
      console.log(response.data)
      return { logs: response.data.payload.logs, total: response.data.payload.total };
    } catch (err) {
      return rejectWithValue({ message: err.message });
    }
  }
);

const initialState = {
  logs: [],
  total: 0,
  message: null,
  isLoading: false,
  isError: false,
};

const logsSlice = createSlice({
  name: "logs",
  initialState,
  reducers: {
    reset(state, action) {
      state.isError = false;
      state.message = null;
    },
  },
  extraReducers: {
    // get all posts

    [getLogs.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [getLogs.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.logs = action.payload.logs;
      state.total = action.payload.total;
    },
    [getLogs.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload.message;
      state.logs = [];
    },
  },
});

export default logsSlice;
