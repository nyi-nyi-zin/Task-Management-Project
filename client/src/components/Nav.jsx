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
    <nav className="flex items-center justify-between text-blue-600  my-4  px-20 md:px-16 lg:px-40 xl:px-80 gap-8 ">
      <h1 className="text-blue-700 text-3xl">Miracle</h1>
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
        <div className=" flex justify-end items-center gap-5 ml-auto font-medium text-2xl ">
          <Link to={"/login"}>Login</Link>
          <Link to={"/register"}>Register</Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;
