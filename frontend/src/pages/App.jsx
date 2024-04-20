import { Link } from "react-router-dom";
import InputBox from "./components/InputBox";
import { useState } from "react";
import logo from "../assets/Logo.svg";

export default function App() {
  const [messages, setMessages] = useState([]);
  return (
    <section className="w-full h-[85dvh] text-white">
      <nav className="bg-[#20322E] p-6 flex justify-between libre-baskerville-regular ">
        <Link to={"/"}>
          <img src={logo} alt="Circular AI" />
        </Link>
        <Link to={"/about-us"}>About</Link>
      </nav>
      <main className="grid grid-rows-[1fr,_auto] h-full py-4 w-full libre-baskerville-regular ">
        <div className="flex justify-center ">
        <div className="h-full overflow-y-auto max-w-[900px] w-[100dvh] grid gap-4">
          <div>
            <p className="text-[20px] opacity-75">
              CBN policies are complicated to understand, let me fix that.
            </p>
            <p className="text-[32px] libre-baskerville-bold">
              How can I help you today?
            </p>
          </div>
          <section className="grid grid-cols-2 gap-4">
            <button className="shadow-lg p-4 bg-[#ffffff10] text-left rounded-md h-[150px] flex">
              <p>
              Why is Nigerian’s exchange rate so high?
              </p>
            </button>
            <button className="shadow-lg p-4 bg-[#ffffff10] text-left rounded-md h-[150px] flex">
              <p>
                What does the new Collateral policy mean for my fintech app?
              </p>
            </button>
            <button className="shadow-lg p-4 bg-[#ffffff10] text-left rounded-md h-[150px] flex">
              <p>
              What CBN policies do Nigeria Fintech start ups need to know?              </p>
            </button>
            <button className="shadow-lg p-4 bg-[#ffffff10] text-left rounded-md h-[150px] flex">
              <p>
                What does the new Collateral policy mean for my fintech app?
              </p>
            </button>
          </section>
          <section></section>
          {/* <div className=" bg-gray-800">
            
          </div> */}
        </div>
        </div>
        <InputBox />
      </main>
    </section>
  );
}
