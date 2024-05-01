import { Outlet } from "react-router-dom";
import logo from "../assets/Logo.svg";
import { Link } from "react-router-dom";


export default function Root() {
  return <section className="min-h-screen  w-full bg-[#182522] my-font">
      <nav className="bg-[#20322E] p-6 flex justify-between text-white font-light">
        <Link to={"/"}>
          <img src={logo} alt="Circular AI" className="w-[100px] md:w-auto" />
        </Link>
        <Link to={"/about-us"} className="hover:underline">About</Link>
      </nav>
    <Outlet/>
  </section>;
}
