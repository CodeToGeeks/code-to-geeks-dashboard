import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * @get  one tag by id action
 */
export const getOneTagById = createAsyncThunk(
  "tags/getOneTagById",
  async (_id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      let response = await axios.get(`/tag/${_id}`);
      return { tag: response.data.tag };
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

const initialState = {
  tag: null,
  message: null,
  isLoading: false,
  isError: false,
};

const oneTagSlice = createSlice({
  name: "oneTag",
  initialState,
  reducers: {
    reset(state, action) {
      state.isError = false;
      state.message = null;
      state.tag = null;
    },
  },
  extraReducers: {
    // get one tag by id
    [getOneTagById.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [getOneTagById.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.tag = action.payload.tag;
    },
    [getOneTagById.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload.message;
      state.tag = null;
    },
  },
});

export default oneTagSlice;
