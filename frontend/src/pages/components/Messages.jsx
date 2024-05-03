import React, { useEffect, useState } from "react";
import icon from "../../assets/icon.svg";

function Messages({
  messages,
  setMessages,
  setIsDisable,
  response,
  isLoading,
  error,
}) {
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
              response={response}
              isLoading={isLoading}
              error={error}
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
  index = 0,
  response,
  isLoading,
  setIsDisable,
  error,
}) {


  useEffect(() => {
    if (response) {
      setIsDisable(false)
      addResponse(response);
    }
  }, [response]);


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
    return (
      <div className="bg-red-500 p-4 font-light rounded">
        Error: Something went wrong with Circular AI. Please try again :)
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full gap-2 ">
      <p className="duration-300 text-sm md:text-base ">
          {response.response}
      </p>
    </div>
  );
}

export default Messages;
