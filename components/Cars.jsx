import React from 'react'
import Carcard from "@/components/Carcard"

export default function Cars() {
  return (
    <>
       <div className='grid gap-4 grid-cols-3 grid-rows-2 pt-10'>
        <Carcard />
        <Carcard />
        <Carcard />
        <Carcard />
        <Carcard />
        <Carcard />
        </div>
        <div className='text-center pt-5'>
            <button className='bg-[#000000] hover:bg-[#454545] text-white rounded p-2'>
                Show More
            </button>
        </div>
    </>
  )
 
}
