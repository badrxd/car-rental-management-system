import React from 'react'
import Carcard from "@/components/Carcard"

export default function Popularcars() {
  return (
    <div className='flex justify-between pt-10 gap-4 flex-col lg:flex-row md:flex-row'>
        <Carcard />
        <Carcard />
        <Carcard />
    </div>
  )
}
