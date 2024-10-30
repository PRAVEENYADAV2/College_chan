'use client'
import { useState } from 'react'
import { IoCloseSharp } from "react-icons/io5";

export default function Header() {
    const [open, setOpen] = useState(true)
    const handleSetOpen = () => {
        setOpen(false)
    }

    return (
        <div className='mt-10'>
            <div className='logo flex justify-center'>
                <div className='flex items-center gap-2'>
                    <img className='md:w-[200px] w-[100px]' src="/pngwing.com.png" alt="" />
                    <h1 className='text-[#005e86] dark:text-blue-100 font-extrabold text-4xl leading-7'>College <br />Chan</h1>

                </div>
            </div>
            {open &&
                <div className='mb-5'>
                    <div className=' bg-[#005e86]  text-white font-extrabold md:text-xl text-md p-2 border-black dark:border-white border-2 flex justify-between items-center'>
                        <h1>What is College Chan?</h1>
                        <div className='p-2 border border-black rounded-sm cursor-pointer' onClick={handleSetOpen}>
                            <IoCloseSharp />
                        </div>
                    </div>
                    <div className='bg-orange-100 dark:bg-slate-500 p-2 border border-black dark:border-white text-sm'>
                        <p>

                            College Chan is a simple image-based bulletin board where anyone can post comments and share images. There are boards dedicated to all BTech subjects, from Computer Science and Engineering to Electronics, Mechanical, and Civil Engineering. Users do not need to register an account before participating in the community. Feel free to click on a subject below that interests you and jump right in!

                            For those who want to unwind, we also have a section dedicated to Casual Chat & Shitposting. Share memes, jokes, and random thoughts to your heart&apos;s content—just keep it within the community rules!
                            <br />
                            <br />
                            <br />
                            Be sure to familiarize yourself with the Rules before posting, and read the FAQ if you wish to learn more about how to use the site.
                        </p>
                    </div>
                </div>}
        </div>
    )
}