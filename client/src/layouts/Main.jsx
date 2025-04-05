import { Outlet } from "react-router-dom";
import Nav from "../pages/Nav";

const Main = () => {
  return (
    <section className=" mx-auto h-screen max-w-[80%]">
      <Nav />
      <Outlet />
    </section>
  );
};

export default Main;
