import React, { useContext } from "react";
import "./../styles/App.css";
import { AppContext } from "../context/AppProvider";
import { Routes, Route } from "react-router-dom";
import Users from "./Users";
import Navbar from "./Navbar";
import Posts from "./Posts";
import Notifications from "./Notifications";
import Post from "./Post";
import UserPosts from "./UserPosts";
import Viewpost from "./Viewpost";

const App = () => {
  const { users } = useContext(AppContext);
  console.log(users);
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/posts" element={<Posts />} />
        <Route path="/users" element={<Users />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/post/:userId/:postId" element={<Post />} />
        <Route path="/post/view/:userId/:postId" element={<Viewpost />} />
        <Route path="users/user/:id/posts" element={<UserPosts />} />
      </Routes>
    </div>
  );
};

export default App;
