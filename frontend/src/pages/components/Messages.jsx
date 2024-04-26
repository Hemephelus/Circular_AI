import React, { useEffect, useState } from "react";
import icon from "../../assets/icon.svg";

function Messages({ messages, setMessages, setIsDisable }) {
  return (
    <div className=" overflow-y-auto max-h-[500px] max-w-[800px]  grid gap-8 p-4 w-full">
      {messages?.map((sample, index) => (
        <section className="grid gap-2" key={index}>
          <div className="py-2 flex w-full gap-2">
            <figure className="w-[25px] h-[25px] rounded-full bg-white text-[#20322E] grid place-content-center font-medium">
              S
            </figure>
            <p className="line-clamp-3 hover:line-clamp-none duration-300 text-sm md:text-base font-normal ">
              {sample.prompt}
            </p>
          </div>
          <div className="py-4 flex w-full border-b border-[#ffffff40] gap-2 items-start  font-extralight">
            <img src={icon} alt="Circular AI" />
            <PromptResponse
              messages={messages}
              setMessages={setMessages}
              prompt={sample.prompt}
              index={index}
              setIsDisable={setIsDisable}
            />
          </div>
        </section>
      ))}
    </div>
  );
}

function PromptResponse({
  messages,
  setMessages,
  prompt,
  index = 0,
  setIsDisable,
}) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (isLoading) {
      let endRoll = 0;
      let interval;
      interval = setInterval(() => {
        if (endRoll < 30) {
          endRoll++;
        } else {
          clearInterval(interval);
          setIsLoading(false);
          setIsDisable(false);
          setData(` Lorem ipsum dolor sit amet, consectetur adipisicing elit. In
          perspiciatis minus soluta enim quis minima nostrum ipsum laboriosam?
          Libero consequuntur recusandae repudiandae quasi similique quaerat
          exercitationem maxime consectetur aspernatur magni!`);
        }
      }, 300);
    }
  }, []);

  useEffect(() => {
    if (data) {
      addResponse(data);
    }
  }, [data]);

  function addResponse(response) {
    let newMessages = [...messages];
    newMessages[index]["response"] = response;
    setMessages(newMessages);
  }

  // LOADING PAGE
  if (isLoading) {
    return (
      <div className="flex flex-col w-full gap-2 animate-pulse ">
        <p className="w-[95%] bg-white  rounded-md">Hi</p>
        <p className="w-[75%] bg-white rounded-md">Hi</p>
        <p className="w-[85%] bg-white rounded-md">Hi</p>
      </div>
    );
  }

  // ERROR PAGE
  if (error) {
    return <div className="">Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col w-full gap-2 ">
      <p className="line-clamp-3 hover:line-clamp-none duration-300 text-sm md:text-base ">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. In
        perspiciatis minus soluta enim quis minima nostrum ipsum laboriosam?
        Libero consequuntur recusandae repudiandae quasi similique quaerat
        exercitationem maxime consectetur aspernatur magni!
      </p>
    </div>
  );
}

export default Messages;
