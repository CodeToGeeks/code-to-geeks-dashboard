import { Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import TopBar from "./components/TopBar/TopBar";
import SideBar from "./components/SideBar/SideBar";
import Login from "./components/pages/Login/Login";
import Home from "./components/pages/Home/Home";
import configAxios from "./config/configAxiosDefultValues";
import Files from "./components/pages/Files/Files";

import Posts from "./components/pages/posts/Posts";
import CreatePost from "./components/pages/posts/Create/Create";
import EditPost from "./components/pages/posts/EditPost/EditPost";
import ReviewPost from "./components/pages/posts/ReviewPost/ReviewPost";

import Tags from "./components/pages/tags/Tags";
import EditTag from "./components/pages/tags/EditTag/EditTag";
import CreateTag from "./components/pages/tags/Create/Create";
import { getAllTagsAndSaveInLocalstorge } from "./api/tags";
import "./App.css";
import { useSelector } from "react-redux";
const { Content } = Layout;

configAxios();
getAllTagsAndSaveInLocalstorge();
function App() {
  document.title = "CODETOGEEKS";
  const { isAuth } = useSelector((state) => state.auth);

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
                  <Route path="/signin" element={<Login />} />
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
