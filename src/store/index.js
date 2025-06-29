import { configureStore } from "@reduxjs/toolkit";
import auth from "./authSlice";
import posts from "./posts/postsSlice";
import post from "./posts/onePostSlice";
import tags from "./tags/tagsSlice";
import tag from "./tags/oneTagSlice";
import files from "./files/filesSlice";
import account from "./account/accountSlice"
import logs  from "./logs/logsSlice";
export default configureStore({
  reducer: {
    auth: auth.reducer,
    post: post.reducer,
    posts: posts.reducer,
    tags: tags.reducer,
    tag: tag.reducer,
    files: files.reducer,
    account:account.reducer,
    logs : logs.reducer
  },
});
