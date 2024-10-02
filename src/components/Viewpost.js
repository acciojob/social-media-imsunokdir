import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppProvider";
// import { formatDistanceToNow } from "date-fns";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Link } from "react-router-dom";

const reactions = ["👍", "🎉", "❤️", "🚀", "👀"];

const Viewpost = () => {
  const { userId, postId } = useParams();
  const { users } = useContext(AppContext);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const user = users.find((user) => user.id === Number(userId));
    if (user) {
      const post = user.posts.find((post) => post.id == postId);
      if (post) {
        setPost({ ...post, postAuthor: user.name });
        console.log(post);
      }
    }
  }, [userId, postId, users]);

  useEffect(() => {
    console.log("posts:::::", post);
  }, [post]);

  //   const timeAgo = formatDistanceToNow(new Date(post.uploadTime), {
  //     addSuffix: true,
  //   });
  //   console.log(post);
  return (
    <div>
      {post && (
        <div>
          <h1>{post.postTitle}</h1>
          <p>
            by {post.postAuthor}{" "}
            <i>
              {formatDistanceToNow(new Date(post.uploadTime), {
                addSuffix: true,
              })}{" "}
            </i>
          </p>
          <p>{post.postContent}</p>
          <div>
            {reactions.map((reaction) => {
              const count = post.reactions?.[reaction]?.count || 0; // Get count or default to 0
              return (
                <span key={reaction}>
                  {reaction} {count}
                </span>
              );
            })}
          </div>
          <Link to={`/post/${userId}/${postId}`}>
            <button>Edit post</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Viewpost;
