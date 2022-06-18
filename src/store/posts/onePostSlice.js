import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * @get one post by id action
 */
export const getOnePostById = createAsyncThunk(
  "posts/getOnePostById",
  async (_id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      let response = await axios.get(`/post/id/${_id}`);
      return { post: response.data.post };
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
  post: null,
  message: null,
  isLoading: false,
  isError: false,
};

const onePostSlice = createSlice({
  name: "onePosts",
  initialState,
  reducers: {
    reset(state, action) {
      state.isError = false;
      state.message = null;
      state.post = null;
    },
  },
  extraReducers: {
    // get one post by id
    [getOnePostById.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [getOnePostById.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.post = action.payload.post;
    },
    [getOnePostById.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload.message;
      state.post = null;
    },
  },
});

export default onePostSlice;
