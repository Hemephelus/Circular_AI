import React from 'react'

function About() {
  return (
    <main className='text-white p-4 md:p-16 grid'>
        <div className='max-w-[900px] '>

        <h2 className='font-normal text-3xl md:text-6xl'>
        About Circular AI
        </h2>
        <section className='flex flex-col gap-6 py-8 text-base md:text-xl font-extralight'>
        <p>
            Circular AI is a chat bot that helps people working in the financial space understand the Central Bank of Nigeria (CBN) Policies so that they are fully compliant.
        </p>

        <p>
            Central Bank of Nigeria (CBN) releases Monetary policies regularly. This policies affect Banks, FinTech Apps, and Businesses. Circular AI helps the layman understand what these policies mean by explaining it is a clear and [concise] way.
        </p>

        <p>
            In other to improve the quality of our response, we trained our own model on all the CBN policies from the CBN website. Allowing Circular AI to be fully upto date on the latest CBN policies thus providing accurate information.
        </p>

        <p>
            We believe Circular AI is a solution to the CBN policies ignorance from Banks, FinTech Apps, and Businesses.
        </p>

        <a href='/' className='underline'>
            Use Circular AI
        </a>
        </section>
        </div>
         </main>
  )
}

export default About