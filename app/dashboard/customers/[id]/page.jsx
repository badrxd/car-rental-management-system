import React from 'react'
import Image from 'next/image'
import { IoMdPersonAdd } from "react-icons/io";


function Page() {
  return (
    <div className='mt-10 bg-[#fff] flex justify-between p-5  gap-5 rounded-2xl'>
        <div className='w-full flex flex-col gap-3'>
            <div className='flex flex-col justify-center gap-3 items-center p-5'> 
                <Image
                className='rounded-full'
                src={"/avatar.png"}
                width={200}
                height={200}
                alt='avatar'
                />
                {/* <div className='w-[200px] h-[200px] bg-gray-200 rounded-full flex justify-center items-center'><IoMdPersonAdd className='text-[#fff] text-3xl'/>
                </div> */}
                <h1 className="bg-[#000] text-[#fff] p-2 rounded-full w-40 text-center">John Do</h1>
            </div>
            <div className='bg-green-100'>
                car table 
            </div>
        </div>
        <div className='w-full'>
            <h1 className="uppercase p-3 text-gray-700 font-bold">full name</h1>
            <input
            type="text"
            name="full_name"
            placeholder="full name"  className="p-2 pl-6 uppercase rounded-full bg-[#F4F7FE] w-full"/>
            <h1 className="uppercase p-3 text-gray-700 font-bold">Driver ID</h1>
            <input
             type="text"
            name="driver_id"
            placeholder="driver id"  className="p-2 pl-6 uppercase rounded-full bg-[#F4F7FE] w-full"/>
            <h1 className="uppercase p-3 text-gray-700 font-bold">phone number</h1>
            <input 
             type="number"
            name="phone"
            placeholder="phone number" className="p-2 pl-6 uppercase rounded-full bg-[#F4F7FE] w-full"/>
           
        </div>
    </div>
  )
}

export default Page