import Image from 'next/image'
import React from 'react'
import { GiGasPump } from "react-icons/gi";
import { GiGearStickPattern } from "react-icons/gi";
import { FaFan } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";




export default  function Carcard () {
  return (
    <div className='p-5 bg-[#fafafa] rounded-lg flex flex-col gap-8'>
        <div className='flex justify-between'>
            <div>
                <h1 className='font-bold'>Dacia Sandiro</h1>
                <p>Sport</p>
            </div>
            <div className=''>
                <CiHeart className='text-3xl cursor-pointer' />
            </div>
        </div>
        <div>
            <Image src="/car.png" alt={'card-image'} width={500} height={500} />
        </div>
        <div className='flex justify-between'>
            <span className='flex justify-between items-center gap-1'><GiGasPump />Diesel</span>
            <span className='flex justify-between items-center gap-1'><GiGearStickPattern />Auto</span>
            <span className='flex justify-between items-center gap-1'><FaFan />True</span>
        </div>
        <div className='flex justify-between items-center'>
            <span>300.00 DH/Day</span>
            <button className='bg-[#000000] hover:bg-[#454545] text-white rounded-lg p-2'>Rent Now</button>
        </div>
    </div>
  )
}
