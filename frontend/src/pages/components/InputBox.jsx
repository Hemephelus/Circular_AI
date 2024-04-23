import React, { useRef, useEffect, useState } from "react";
import { LuSendHorizonal } from "react-icons/lu";

export default function InputBox() {
  const [value, setValue] = useState("");
  const textAreaRef = useRef(null);

  useAutosizeTextArea(textAreaRef.current, value);

  const handleChange = (evt) => {
    const val = evt.target?.value;
    setValue(val);
  };
  return (
    <section className="p-4 grid place-content-center relative">
      <form className="bg-[#20322E] max-w-[900px] p-6 rounded-lg flex justify-between shadow-lg absolute bottom-0 left-[50%] -translate-x-[50%] gap-2">
        <input type="text" placeholder='Enter a prompt here' className='bg-transparent outline-none text-white w-[100dvh]'/>
        {/* <textarea name="" id="" cols="30" rows="3" className='bg-transparent outline-none text-white w-[100dvh]'></textarea> */}
        {/* <label htmlFor="review-text">Review:</label> */}
        {/* <textarea
          id="review-text"
          onChange={handleChange}
          placeholder="What did you like or dislike?"
          ref={textAreaRef}
          className="bg-transparent outline-none text-white w-[100dvh]"
          rows={1}
          value={value}
        /> */}
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
