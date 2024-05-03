import React, { useRef, useEffect, useState } from "react";
import { LuSendHorizonal } from "react-icons/lu";

export default function InputBox({
  setOpenChat,
  addPrompt,
  isDisable,
}) {
  const [value, setValue] = useState("");
  const textAreaRef = useRef(null);

  useAutosizeTextArea(textAreaRef.current, value);

  const handleChange = (evt) => {
    const val = evt.target?.value;
    setValue(val);
  };

  function handleSubmit() {
    setOpenChat(true);
    addPrompt(value);
    setValue("");
  }
  return (
    <section className="p-4 grid place-content-center relative">
      <form
        className="bg-[#20322E] w-[90%] max-w-[800px] p-4 rounded-lg grid grid-cols-[1fr,auto] justify-between shadow-lg fixed bottom-5 left-[50%] -translate-x-[50%] gap-2 border border-[#ffffff40]"
        onSubmit={(e) => {
          e.preventDefault();
          if (isDisable || value.trim() === '') return;
          handleSubmit();
        }}
      >
        <input
          type="text"
          placeholder="Enter a prompt here"
          className="bg-transparent outline-none text-white w-[100dvh]"
          onChange={handleChange}
          value={value}
        />
        <button className="text-[#ffffff]">
          <LuSendHorizonal size={24} />
        </button>
      </form>
    </section>
  );
}

// Updates the height of a <textarea> when the value changes.
const useAutosizeTextArea = (textAreaRef, value) => {
  useEffect(() => {
    if (textAreaRef) {
      // We need to reset the height momentarily to get the correct scrollHeight for the textarea
      textAreaRef.style.height = "0px";
      const scrollHeight = textAreaRef.scrollHeight;

      // We then set the height directly, outside of the render loop
      // Trying to set this with state or a ref will product an incorrect value.
      textAreaRef.style.height = scrollHeight + "px";
    }
  }, [textAreaRef, value]);
};
