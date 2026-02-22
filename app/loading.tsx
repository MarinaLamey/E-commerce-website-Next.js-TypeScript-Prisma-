import LottieHandler from "@/componant/feedback/LottieHandler"
export default function loading ()  {
  return (
   <section className='fix-height p-5 flex items-center justify-center'>
  <LottieHandler type="Loading" message="Loading...."  />
   </section>
  )
}
