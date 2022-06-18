import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * @get all posts action
 */
export const getPosts = createAsyncThunk(
  "posts/getAll",
  async (params, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      let response = await axios.get("/post", { params: params });
      return { posts: response.data.posts, total: response.data.total };
    } catch (err) {
      return rejectWithValue({ message: err.message });
    }
  }
);

/**
 * @create new  post action
 */
export const createPost = createAsyncThunk(
  "posts/createPost",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await axios.post("/post", data);
      return { message: "Post created Success" };
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
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await axios.patch(`/post/${data._id}`, data.post);
      return { message: "Post updated Success", _id: data._id };
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
export const deletePost = createAsyncThunk(
  "posts/deletePost",
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

const initialState = {
  posts: [],
  total: 0,
  deleted: null,
  updated: null,
  created: null,
  message: null,
  isLoading: false,
  isError: false,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reset(state, action) {
      state.isError = false;
      state.message = null;
      state.deleted = null;
      state.updated = null;
      state.inserted = null;
      state.created = null;
    },
  },
  extraReducers: {
    // get all posts

    [getPosts.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [getPosts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload.posts;
      state.total = action.payload.total;
    },
    [getPosts.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload.message;
      state.posts = [];
      state.total = 0;
    },

    // create post

    [createPost.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [createPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.message = action.payload.message;
      state.created = true;
    },
    [createPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload.message;
    },

    // update post

    [updatePost.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [updatePost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.message = action.payload.message;
      state.updated = true;
    },
    [updatePost.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload.message;
    },

    // delete post

    [deletePost.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [deletePost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.message = action.payload.message;
      state.posts = state.posts.filter(
        (post) => post._id !== action.payload._id
      );
      state.total = state.total - 1;
      state.deleted = true;
    },
    [deletePost.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload.message;
    },
  },
});

export default postsSlice;
