import { Outlet } from "react-router-dom";

export default function Root() {
  return <section className="min-h-screen  w-full bg-[#182522]">
    <Outlet/>
  </section>;
}
