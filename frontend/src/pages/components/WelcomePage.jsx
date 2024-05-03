import React from "react";

function WelcomePage({ setOpenChat, addPrompt }) {
  const samples = [
    {
      prompt: "Why is Nigerian’s exchange rate so high?",
    },
    {
      prompt: "What is the latest CBN policy on BDC?",
    },
    {
      prompt: "What CBN policies do Nigeria Fintech start ups need to know?",
    },
    {
      prompt: "What does the new Collateral policy mean for my fintech app?",
    },
  ];

  function handlePrompt(prompt) {
    setOpenChat(true);
    addPrompt(prompt);
  }
  return (
    <div className=" overflow-y-auto max-w-[800px]  grid gap-8 p-4">
      <div className="flex flex-col justify-end ">
        <p className="text-2xl md:text-4xl font-semibold">
          Confused by CBN Policy?
          <br />
          Get Clear Answers. Now!
        </p>
        <p className="text-sm md:text-base  opacity-80 font-extralight">
          Ask anything about Nigeria's Central Bank policies and get clear
          explanations.
        </p>
      </div>
      <section className="grid md:grid-cols-2 gap-2 h-fit font-light">
        {samples?.map((sample, index) => (
          <button
            className="shadow-lg p-4 bg-[#20322E]  hover:scale-95 duration-300 text-left rounded-md flex active:scale-100 w-full"
            onClick={() => handlePrompt(sample.prompt)}
            key={index}
          >
            <p className="line-clamp-3 hover:line-clamp-none duration-300 text-sm md:text-base ">
              {sample.prompt}
            </p>
          </button>
        ))}
      </section>
    </div>
  );
}

export default WelcomePage;
