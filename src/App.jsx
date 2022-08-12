import { Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import TopBar from "./components/TopBar/TopBar";
import SideBar from "./components/SideBar/SideBar";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import configAxios from "./config/configAxiosDefultValues";
import Files from "./pages/Files/Files";
import Account from "./pages/account/Account";
import Logs from "./pages/Logs/Logs"
import Posts from "./pages/posts/Posts";
import CreatePost from "./pages/posts/Create/Create";
import EditPost from "./pages/posts/EditPost/EditPost";
import ReviewPost from "./pages/posts/ReviewPost/ReviewPost";

import Tags from "./pages/tags/Tags";
import EditTag from "./pages/tags/EditTag/EditTag";
import CreateTag from "./pages/tags/Create/Create";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { getAllTags } from "./store/tags/tagsSlice";
const { Content } = Layout;

/* 
  "homepage": "./",

*/
configAxios();
function App() {
  document.title = "codetogeeks";
  const { isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuth) {
      dispatch(getAllTags());
    }
  }, [isAuth, dispatch]);
  // get all tags
  return (
    <div className="App">
      <Layout>
        {isAuth ? <TopBar /> : <></>}

        <Layout>
          {isAuth ? <SideBar /> : <></>}
          <Layout className="site-layout">
            <Content>
              <div className="mainContainer">
                <Routes>
                  <Route path="/" exact element={<Home />} />
                  <Route path="/posts" exact element={<Posts />} />
                  <Route path="/posts/create" element={<CreatePost />} />
                  <Route path="/posts/edit/:id" element={<EditPost />} />
                  <Route path="/posts/review/:id" element={<ReviewPost />} />
                  <Route path="/tags" element={<Tags />} />
                  <Route path="/tags/create" element={<CreateTag />} />
                  <Route path="/tags/edit/:id" element={<EditTag />} />
                  <Route path="/files" element={<Files />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/api/logs" element={<Logs />} />
                  <Route path="/signin" element={<Login />} />
                  <Route path="*" element={<Login />} />
                </Routes>
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;

// element={<EditPost currentId={currentId} />}
