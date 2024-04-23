import { Link } from "react-router-dom";
import InputBox from "./components/InputBox";
import { useState } from "react";
import logo from "../assets/Logo.svg";
import WelcomePage from "./components/WelcomePage";

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
        <div className="flex justify-center">
          {messages.length === 0 ? (
            <WelcomePage />
          ) : (
            <div className="h-full overflow-y-auto max-w-[900px] w-[100dvh] grid gap-4">
              <div className="flex flex-col justify-end">
                <p className="text-[32px]">
                  Confused by CBN Policy? Get Clear Answers. Now!
                </p>
                <p className="text-[20px] libre-baskerville-bold opacity-75">
                  Ask anything about Nigeria's Central Bank policies and get
                  expert explanations.
                </p>
              </div>
              <section className="grid grid-cols-2 gap-4">
                <button className="shadow-lg p-6 bg-[#ffffff10] hover:bg-[#ffffff] text-left rounded-md flex">
                  <p className="line-clamp-2">
                    Why is Nigerian’s exchange rate so high?
                  </p>
                </button>
                <button className="shadow-lg p-6 bg-[#ffffff10] text-left rounded-md flex">
                  <p className="line-clamp-2">
                    What does the new Collateral policy mean for my fintech app?
                  </p>
                </button>
                <button className="shadow-lg p-6 bg-[#ffffff10] text-left rounded-md flex">
                  <p className="line-clamp-2">
                    What CBN policies do Nigeria Fintech start ups need to know?{" "}
                  </p>
                </button>
                <button className="shadow-lg p-6 bg-[#ffffff10] text-left rounded-md flex">
                  <p className="line-clamp-2">
                    What does the new Collateral policy mean for my fintech app?
                  </p>
                </button>
              </section>
              <section></section>
              {/* <div className=" bg-gray-800">
            
          </div> */}
            </div>
          )}
        </div>
        <InputBox />
      </main>
    </section>
  );
}
