import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppProvider";
import { Link } from "react-router-dom";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const reactions = ["👍", "🎉", "❤️", "🚀", "👀"];

const Posts = () => {
  const { users, handleSubmit, addReaction } = useContext(AppContext);
  const [formData, setFormData] = useState({
    postTitle: "",
    postAuthor: "",
    postContent: "",
  });

  useEffect(() => {
    console.log("users::", users);
  }, [users]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const onSub = (e) => {
    e.preventDefault();
    handleSubmit(formData);
    setFormData({
      postTitle: "",
      postAuthor: "",
      postContent: "",
    });
  };

  const getSortedPosts = () => {
    const allposts = users.flatMap((user) =>
      user.posts.map((post) => ({
        ...post,
        author: user.name,
        userId: user.id,
      }))
    );
    return allposts.sort(
      (a, b) => new Date(b.uploadTime) - new Date(a.uploadTime)
    );
  };
  const sortedposts = getSortedPosts();
  useEffect(() => {
    console.log("sorted", sortedposts);
  }, [sortedposts]);
  const handleReaction = (userId, postId, reactingUserId, reaction) => {
    if (reactingUserId == "") {
      alert("Please select an author first");
      return;
    }
    addReaction(userId, postId, reactingUserId, reaction);
  };
  return (
    <div className="App">
      00
      <h1>Add a new Post</h1>
      <form onSubmit={onSub}>
        <label htmlFor="postTitle">Post Title</label>
        <input
          type="text"
          id="postTitle"
          value={formData.postTitle}
          onChange={handleChange}
        />
        <label htmlFor="postAuthor">Author</label>
        <select
          id="postAuthor"
          value={formData.postAuthor}
          onChange={handleChange}
        >
          <option value="">Select an author</option>
          {users.map((item) => {
            return (
              <option value={item.id} key={item.id}>
                {item.name}
              </option>
            );
          })}
        </select>
        <label htmlFor="postContent">Content</label>
        <textarea
          id="postContent"
          value={formData.postContent}
          onChange={handleChange}
        />
        <button type="submit">Save</button>
      </form>
      <h1>Posts</h1>
      <div className="posts-container posts-list">
        {sortedposts.length > 0 &&
          sortedposts.map((item) => {
            return (
              <div key={item.id} className="post-card posts-list">
                <h1>{item.postTitle}</h1>
                <p>
                  by {item.author} about{" "}
                  <i>
                    {formatDistanceToNow(new Date(item.uploadTime), {
                      addSuffix: true,
                    })}
                  </i>
                </p>
                <p>{item.postContent}</p>
                <div>
                  {reactions.map((reaction, i) => {
                    const rectionCount = item.reactions?.[reaction]?.count || 0;
                    return (
                      <button
                        key={i}
                        onClick={() =>
                          handleReaction(
                            item.userId,
                            item.id,
                            formData.postAuthor,
                            reaction
                          )
                        }
                        className="button"
                      >
                        {reaction} {rectionCount}
                      </button>
                    );
                  })}
                </div>
                <Link to={`/post/view/${item.userId}/${item.id}`}>
                  <button className="button">view Post</button>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Posts;
