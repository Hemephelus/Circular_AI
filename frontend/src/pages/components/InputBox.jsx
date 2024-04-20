import React from 'react'
import { LuSendHorizonal } from "react-icons/lu";



export default function InputBox() {
  return (
    <section className='p-4 grid place-content-center'>
        <form className='bg-[#20322E] max-w-[900px] p-4 rounded-full flex justify-between shadow-lg'>
        <input type="text" placeholder='Enter a prompt here' className='bg-transparent outline-none text-white w-[100dvh]'/>
        <button className='text-[#ffffff]'>
        <LuSendHorizonal size={24} />
        </button>
    </form>
    </section>
  )
}