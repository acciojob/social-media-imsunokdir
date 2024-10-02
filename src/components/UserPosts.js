import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { AppContext } from "../context/AppProvider";

const UserPosts = () => {
  const { id } = useParams();
  const { users } = useContext(AppContext);
  const user = users.find((user) => user.id === Number(id));

  return (
    <div>
      <ul>
        {user.posts.length > 0 ? (
          user.posts.map((post) => {
            return (
              <li key={post.id}>
                <Link to={`/post/${id}/${post.id}`}>{post.postTitle}</Link>
              </li>
            );
          })
        ) : (
          <h4>No post found</h4>
        )}
      </ul>
    </div>
  );
};

export default UserPosts;
