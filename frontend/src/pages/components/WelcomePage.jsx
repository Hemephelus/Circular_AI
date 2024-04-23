import React from "react";

function WelcomePage() {
  const samples = [
    {
      prompt: "Why is Nigerian’s exchange rate so high?",
    },
    {
      prompt: "What does the new Collateral policy mean for my fintech app?",
    },
    {
      prompt: "What CBN policies do Nigeria Fintech start ups need to know?",
    },
    {
      prompt: "What does the new Collateral policy mean for my fintech app?",
    },
  ];
//   libre-baskerville-bold
  return (
    <div className="h-full overflow-y-auto max-w-[900px] w-[100dvh] grid gap-8">
      <div className="flex flex-col justify-end ">
        <p className="text-[36px] font-semibold">
          Confused by CBN Policy?
          Get Clear Answers. Now!
        </p>
        <p className="text-[16px]  opacity-80 font-normal">
          Ask anything about Nigeria's Central Bank policies and get expert
          explanations.
        </p>
      </div>
      <section className="grid grid-cols-2 gap-4">
        {samples?.map((sample) => (
          <button className="shadow-lg p-6 bg-[#20322E]  hover:scale-95 duration-300 text-left rounded-md flex">
            <p className="line-clamp-2">{sample.prompt}</p>
          </button>
        ))}
      </section>
    </div>
  );
}

export default WelcomePage;
