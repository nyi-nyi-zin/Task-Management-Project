import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";

const Main = () => {
  return (
    <section className=" mx-auto h-screen w-full overflow-y-hidden ">
      <Nav />
      <Outlet />
    </section>
  );
};

export default Main;
