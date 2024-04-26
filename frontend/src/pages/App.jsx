import { Link } from "react-router-dom";
import InputBox from "./components/InputBox";
import { useState } from "react";
// import logo from "../assets/Logo.svg";
import WelcomePage from "./components/WelcomePage";
import Messages from "./components/Messages";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [openChat, setOpenChat] = useState(false);
  const [isDisable, setIsDisable] = useState(false);

  function addPrompt(prompt) {
    setIsDisable(true);
    let newMessages = [...messages];
    newMessages.push({
      prompt,
    });
    setMessages(newMessages);
  }

  return (
    <section className="w-full text-white">
      <main className="grid grid-rows-[1fr,_auto] h-full py-4  ">
        <div className="flex justify-center">
          {openChat ? (
            <Messages
              messages={messages}
              setMessages={setMessages}
              setIsDisable={setIsDisable}
            />
          ) : (
            <WelcomePage setOpenChat={setOpenChat} addPrompt={addPrompt} />
          )}
        </div>
        <InputBox
          setOpenChat={setOpenChat}
          addPrompt={addPrompt}
          isDisable={isDisable}
          setIsDisable={setIsDisable}
        />
      </main>
    </section>
  );
}
