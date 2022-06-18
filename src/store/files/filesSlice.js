import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import fileDownload from "js-file-download";

/**
 * @get all files action
 */
export const getFiles = createAsyncThunk(
  "files/getAll",
  async (params, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      let response = await axios.get("/file", { params: params });
      return { files: response.data.files, total: response.data.total };
    } catch (err) {
      return rejectWithValue({ message: err.message });
    }
  }
);



export const downloadFile = createAsyncThunk(
  "files/downloadFile",
  async (params, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    // (url, filename) {
    try {
      const response = await axios.get(params.url, { responseType: "blob" });
      if (response.status === 200) {
        await fileDownload(response.data, params.fileName);
        return {
          downloaded: true,
          message: "File downloaded successfully 👍⬇️",
        };
      } else
        return rejectWithValue({
          downloaded: false,
          message: "Can’t download File 🥲🚫",
        });
    } catch (err) {
      console.log(err);
      return rejectWithValue({
        downloaded: false,
        message: "Can’t download File 🥲🚫 ",
      });
    }
  }
);

/**
 * @update post action
 */
export const updateFile = createAsyncThunk(
  "files/updateFile",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await axios.patch(`/file/${data._id}`, { name: data.fileName });
      return { message: "File updated Success", _id: data._id };
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
export const deleteFile = createAsyncThunk(
  "files/deleteFile",
  async (_id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await axios.delete(`/file/${_id}`);
      return { message: "File deleted Success", _id };
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
  files: [],
  total: 0,
  deleted: null,
  updated: null,
  created: null,
  message: null,
  downloaded: null,
  isLoading: false,
  isError: false,
};

const filessSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    reset(state, action) {
      state.isError = false;
      state.message = null;
      state.deleted = null;
      state.updated = null;
      state.downloaded = null;
    },
  },
  extraReducers: {
    // get all posts

    [getFiles.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [getFiles.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.files = action.payload.files;
      state.total = action.payload.total;
  
    },
    [getFiles.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload.message;
      state.files = [];
      state.total = 0;
    },


    // update post

    [updateFile.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [updateFile.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.message = action.payload.message;
      state.updated = true;
    },
    [updateFile.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload.message;
    },

    // download file

    [downloadFile.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [downloadFile.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.message = action.payload.message;
      state.downloaded = true;
    },
    [downloadFile.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload.message;
    },

    // delete post

    [deleteFile.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [deleteFile.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.message = action.payload.message;
      state.files = state.files.filter(
        (file) => file._id !== action.payload._id
      );
      state.total = state.total - 1;
      state.deleted = true;
    },
    [deleteFile.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload.message;
    },
  },
});

export default filessSlice;
