import React from 'react'
import "./moviesection.css"
import Image from "next/image";
export const MovieSection = () => {
  return (
         <div className=' h-full w-full  flex items-center relative  overflow-hidden justify-center' style={{ backgroundColor:'rgb(255,188,188)' , background:'radial-gradient(circle, rgba(255,188,188,1) 25%, rgba(250,182,182,1) 47%, rgba(119,16,17,0.8) 100%)', boxShadow: '1px 5px 19px 4px rgba(59,59,59,0.75)'}}>
       
           <Image src="/imgs/LoginPage.png" fill className='object-cover  shadow-2xl'    alt="image"/>
        
         </div>
       
  )
}
