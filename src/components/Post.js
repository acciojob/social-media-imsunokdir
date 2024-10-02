import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppProvider";

const Post = () => {
  const { userId, postId } = useParams();
  const { users, updatePost } = useContext(AppContext);
  const [formData, setFormData] = useState({
    postTitle: "",
    postContent: "",
  });

  useEffect(() => {
    // Find the user and the post by userId and postId
    const user = users.find((user) => user.id === parseInt(userId));
    if (user) {
      const post = user.posts.find((post) => post.id === postId);
      if (post) {
        setFormData({
          postTitle: post.postTitle,
          postContent: post.postContent,
        });
      }
    }
  }, [userId, postId, users]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    updatePost(userId, postId, formData);
  };
  return (
    <div className="post posts-list">
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Post postTitle</label>
        <input
          type="text"
          id="postTitle"
          value={formData.postTitle}
          onChange={handleChange}
        />
        <label htmlFor="postContent">Content</label>
        <textarea
          id="postContent"
          value={formData.postContent}
          onChange={handleChange}
        />
        <button type="submit" className="button">
          Edit
        </button>
      </form>
    </div>
  );
};

export default Post;
