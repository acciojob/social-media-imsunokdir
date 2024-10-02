import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <h1>genZ</h1>
      <div>
        <Link to="/">
          <button>Posts</button>
        </Link>
        <Link to="/users">
          <button>Users</button>
        </Link>
        <Link to="/notifications">
          <button>Notifications</button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
