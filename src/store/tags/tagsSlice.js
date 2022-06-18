import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * @get all posts action
 */
export const getTags = createAsyncThunk(
  "tags/getAll",
  async (params, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      let response = await axios.get("/tag", { params: params });
      return { tags: response.data.tags, total: response.data.total };
    } catch (err) {
      return rejectWithValue({ message: err.message });
    }
  }
);

/**
 * @create new  post action
 */
export const createTag = createAsyncThunk(
  "tags/createTag",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await axios.post("/tag", data);
      return { message: "Tag created Success" };
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

/**
 * @update post action
 */
export const updateTag = createAsyncThunk(
  "tags/updateTag",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await axios.patch(`/tag/${data._id}`, data.tag);
      return { message: "Tag updated Success", _id: data._id };
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

/**
 * @delete post action
 */
/*export const deleteTag = createAsyncThunk(
  "posts/deleteTag",
  async (_id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await axios.delete(`/post/${_id}`);
      return { message: "Post deleted Success", _id };
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
*/
const initialState = {
  tags: [],
  total: 0,
  deleted: null,
  inserted: null,
  updated: null,
  created: null,
  message: null,
  isLoading: false,
  isError: false,
};

const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    reset(state, action) {
      state.isError = false;
      state.message = null;
      state.deleted = null;
      state.updated = null;
      state.created = null;
    },
  },
  extraReducers: {
    // get all posts

    [getTags.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [getTags.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.tags = action.payload.tags;
      state.total = action.payload.total;
    },
    [getTags.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload.message;
      state.tags = [];
      state.total = 0;
    },

    // create tag

    [createTag.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [createTag.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.message = action.payload.message;
      state.created = true;
    },
    [createTag.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload.message;
    },

    // update post

    [updateTag.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [updateTag.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.message = action.payload.message;
      state.updated = true;
    },
    [updateTag.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload.message;
    },
    /*
    // delete tag

    [deleteTag.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [deleteTag.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.message = action.payload.message;
      state.posts = state.posts.filter(
        (post) => post._id !== action.payload._id
      );
      state.total = state.total - 1;
      state.deleted = true;
    },
    [deleteTag.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload.message;
    },*/
  },
});

export default tagsSlice;
