import React from 'react'
import { memo } from 'react';
import Image from "next/image";
import Link from 'next/link';
export type TCategory = {
  id?: number;
  name: string;
  img: string;
};
 const CategoryItem = ({name , img , id}:TCategory) => {
    
  return (
    
    <>
        <Link href={`http://localhost:3000/categories/${id}`}>
               <div  className=' w-full  h-full flex flex-col items-center justify-center '>
                <div className=' relative mx-auto  rounded-full  flex items-center justify-center bg-neutral-200 w-62.5 h-62.5 '>
               <div className='relative w-50 h-50  ' >
                <Image src={img.trim()} fill  className='catshadow rounded-full object-cover'  alt="imageee" ></Image>
                </div>
                </div>
               <div className=' h-1/5 flex items-center justify-center p-8 '>
               <h4 className='text-2xl font-bold'> {name}</h4>
               </div>
             </div>
             </Link>
    </>
  )
}

export default memo(CategoryItem);