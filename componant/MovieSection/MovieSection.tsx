import React from 'react'
import "./moviesection.css"
import Image from "next/image";
import { loginImgs } from '@/utils/constants'
export const MovieSection = () => {
  return (
         <div className=' h-full w-full !mt-3 rounded-2xl flex items-center relative  overflow-hidden justify-center' style={{ backgroundColor:'rgb(255,188,188)' , background:'radial-gradient(circle, rgba(255,188,188,1) 25%, rgba(250,182,182,1) 47%, rgba(119,16,17,0.8) 100%)', boxShadow: '1px 5px 19px 4px rgba(59,59,59,0.75)'}}>
         <div className='w-full h-full relative flex flex-col gap-10  items-center justify-center imageholder'>
         {loginImgs.map((item) => (
           <div key={item.id} className='w-1/3 '>
           <Image src={item.imgSrc} width={400} height={400} className='object-cover rounded-2xl shadow-2xl'    alt="image"/>
           </div>
         ))}
         </div>
         </div>
  )
}
