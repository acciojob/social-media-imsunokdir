import React, { useContext } from "react";
import { AppContext } from "../context/AppProvider";
import { Link } from "react-router-dom";

const Users = () => {
  const { users } = useContext(AppContext);
  return (
    <div>
      <ul>
        {users.map((item) => (
          <li key={item.id}>
            <Link to={`user/${item.id}/posts`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
