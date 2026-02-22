import React from 'react'
import './button.css'
import Link from 'next/link'

interface ButtonProp{
  buttonValue:string;
  to:string 
}
const Button = ({buttonValue , to}: ButtonProp ) => {
  return (
   <Link href={to} className='w-fit ml-3 flex items-center justify-center '>
    
    <button  className="  btn text-xl md:text-2xl  !px-4 !py-3 flex flex-row  items-center justify-between gap-2" data-effect="spin" >
    {buttonValue}
    
        <span className="text"></span>
        <span className="shimmer"></span>
    </button>   
    </Link>
  )
}

export default Button