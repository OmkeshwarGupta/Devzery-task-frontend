import React from 'react'
import { IoSearch } from "react-icons/io5";
import { AiFillFilter } from "react-icons/ai";
import TestCaseList from './TestCaseList';

const TestCases = () => {
    return (
        <div className='flex justify-center items-center h-screen text-gray-200'>

            <div className='bg-blue-950 h-auto pb-4 w-[850px] flex flex-col  items-center relative     border border-black rounded-lg '>
                <div className='w-full h-[1px] opacity-50 bg-gray-200 mt-20 mb-4'>

                </div>

                <div className='relative w-96 '>
                    <input type="text" placeholder='Search issue..' className='rounded-3xl w-96 h-10 bg-blue-900 pl-6  text-xs' />
                    <button className='bg-pink-500 h-10 w-14 rounded-3xl absolute right-0 top-0 flex justify-center items-center text-lg '>
                        <IoSearch />
                    </button>

                </div>

                <div className='flex justify-center items-center gap-3 bg-blue-900 text-xs h-4 w-16 rounded-sm absolute left-20 top-40'>
                    <p>Filter</p>
                    <AiFillFilter size={10} />
                </div>

                <div className='mt-14'>
                    <TestCaseList />
                </div>
            </div>
        </div>
    )
}

export default TestCases
