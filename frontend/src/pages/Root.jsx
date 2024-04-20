import { Outlet } from "react-router-dom";
import App from "./App";

export default function Root() {
  return <section className="min-h-screen  w-full bg-[#182522]">
    <Outlet/>
  </section>;
}
