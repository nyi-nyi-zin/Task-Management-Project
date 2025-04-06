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
    <nav
      className="flex items-center justify-between text-blue-600 py-8"
      style={{ padding: "10px 323px" }}
    >
      <Link className="font-bold text-4xl  " to={"/"}>
        Miracle
      </Link>

      {user ? (
        <section className="flex justify-end items-center gap-5 ml-auto">
          <div className=" font-medium text-xl">
            <Link to={"/profile"}>Profile</Link>
          </div>
          <div className=" font-medium text-xl" onClick={handleLogout}>
            <Link to={"/logout"}>Logout</Link>
          </div>
        </section>
      ) : (
        <div className=" flex justify-end items-center gap-5 ml-auto font-medium text-xl">
          <Link to={"/login"}>Login</Link>
          <Link to={"/register"}>Register</Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;
