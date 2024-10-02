import React, { createContext, useState } from "react";
import usersData from "./usersData";
import { v4 as uuidv4 } from "uuid";
const AppContext = createContext();

// const users = usersData;

const AppProvider = ({ children }) => {
  const [users, setUsers] = useState(usersData);
  const handleSubmit = (newPost) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.id === parseInt(newPost.postAuthor)) {
          return {
            ...user,
            posts: [
              ...user.posts,
              {
                id: uuidv4(),
                postTitle: newPost.postTitle,
                postContent: newPost.postContent,
                uploadTime: Date(),
              },
            ],
          };
        }
        return user;
      })
    );
  };

  const addReaction = (userId, postId, reactinguserId, reaction) => {
    setUsers((prev) => {
      return prev.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            posts: user.posts.map((post) => {
              if (post.id === postId) {
                // Initialize the reactions object if it doesn't exist
                if (!post.reactions) {
                  post.reactions = {};
                }

                // Initialize the specific reaction if it doesn't exist
                if (!post.reactions[reaction]) {
                  post.reactions[reaction] = {
                    count: 0,
                    users: [],
                  };
                }

                const existingUsers = post.reactions[reaction].users;
                const usersAlreadyReacted =
                  existingUsers.includes(reactinguserId);

                // Add or update the reaction
                if (!usersAlreadyReacted) {
                  return {
                    ...post,
                    reactions: {
                      ...post.reactions,
                      [reaction]: {
                        count: post.reactions[reaction].count + 1,
                        users: [...existingUsers, reactinguserId],
                      },
                    },
                  };
                }
              }
              return post; // Return the post unchanged if the ID doesn't match
            }),
          };
        }
        return user; // Return the user unchanged if the ID doesn't match
      });
    });
  };

  const updatePost = (userId, postId, updatedPost) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.id === parseInt(userId)) {
          return {
            ...user,
            posts: user.posts.map((post) =>
              post.id === postId
                ? { ...post, ...updatedPost, uploadTime: Date() } // Update the post
                : post
            ),
          };
        }
        return user;
      })
    );
  };

  return (
    <AppContext.Provider
      value={{ users, handleSubmit, updatePost, addReaction }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
