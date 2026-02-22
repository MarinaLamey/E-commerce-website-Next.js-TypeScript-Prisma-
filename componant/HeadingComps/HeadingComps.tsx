
import Button from "../Button/Button";

interface HeadingComps {
    hValue:string;
    path:string;
}
const HeadingComps = ({hValue , path}:  HeadingComps) => {
  return (
    <div className=' flex flex-row items-center justify-between'>
      <h3 className=' text-2xl md:text-4xl font-bold drop-shadow-logodrop' >{hValue}</h3>
   
     <Button buttonValue={"Shop Now"} to={path} />
   
      </div>
  )
}

export default HeadingComps