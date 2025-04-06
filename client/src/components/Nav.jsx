import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.reducer.user);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setUser(null));
    navigate("/");
  };

  return (
    <nav className=" flex items-center justify-between text-blue-600 py-4 mb-4">
      <Link className="font-bold text-4xl " to={"/"}>
        Miracle
      </Link>

      {user ? (
        <div
          className=" flex items-center gap-3  font-medium text-xl"
          onClick={handleLogout}
        >
          <Link to={"/logout"}>Logout</Link>
        </div>
      ) : (
        <div className=" flex items-center gap-3  font-medium text-xl">
          <Link to={"/login"}>Login</Link>
          <Link to={"/register"}>Register</Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;
