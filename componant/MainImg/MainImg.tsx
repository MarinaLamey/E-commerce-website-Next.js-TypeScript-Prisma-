import Image from "next/image"
import Stars from "../../public/imgs/Stars.png"


export const MainImg = () => {
  return (
     <div className='absolute w-100 md:w-full h-[50vh] z-[-30] top-[0px]   '>
        <Image 
            src={Stars}
            fill
            className="object-cover"
            alt={`Main Image`} />
     </div>
  )
}
