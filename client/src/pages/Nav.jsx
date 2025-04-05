import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className=" flex items-center justify-between text-blue-600 py-4 mb-4">
      <Link className="font-bold text-4xl " to={"/"}>
        Miracle
      </Link>

      <div className="flex items-center gap-2">
        <Link
          to={"/saved-products"}
          className="px-2 py-1 flex items-end gap-1"
        ></Link>
      </div>

      <div className=" flex items-center gap-3  font-medium text-xl">
        <Link to={"/login"}>Login</Link>
        <Link to={"/register"}>Register</Link>
      </div>
    </nav>
  );
};

export default Nav;
