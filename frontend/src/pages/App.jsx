import InputBox from "./components/InputBox";
import { useState } from "react";
import WelcomePage from "./components/WelcomePage";
import Messages from "./components/Messages";
import usePostRequest from "../hooks/usePostRequest";

export default function App() {
  const CIRCULAR_AI_URL = "http://circular-ai.azurewebsites.net/v1";
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [openChat, setOpenChat] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [response, isLoading, error, postRequest] =
    usePostRequest(CIRCULAR_AI_URL);

  function addPrompt(prompt) {
    setIsDisable(true);
    let newMessages = messages.map((message) => {
      return { ...message };
    });

    newMessages.push({
      prompt,
      response: undefined,
    });

    setMessages(newMessages);
    postRequest({
      user_message: prompt,
    });
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
              isLoading={isLoading}
              error={error}
              response={response}
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
