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
    <nav className="w-full max-w-screen-xl mx-auto flex items-center justify-center text-blue-600 my-4 px-4 sm:px-6 lg:px-8">
      <img
        src="/a6d9eee51501460c8cb16cdebd24cad8-free.png"
        alt="Logo"
        className="rounded-full w-20 ml-10"
      />
      {user ? (
        <section className="flex justify-end items-center gap-5 ml-auto">
          <div className="font-medium text-xl">
            <Link to={"/profile"}>Profile</Link>
          </div>
          <div
            className="font-medium text-xl cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </div>
        </section>
      ) : (
        <div className="flex justify-end items-center gap-5 ml-auto font-medium text-2xl">
          <Link to={"/login"}>Login</Link>
          <Link to={"/register"}>Register</Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;
