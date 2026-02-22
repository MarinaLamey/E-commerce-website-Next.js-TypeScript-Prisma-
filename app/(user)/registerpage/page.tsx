import { MovieSection } from '@/componant/MovieSection/MovieSection'
import { RegisterForm } from './RegisterForm'
import "../loginpage/loginpage.css"

async function page() {
  return (
    <section className='relative flex flex-col lg:flex-row min-h-screen w-full p-6 md:p-10 gap-10 items-start overflow-x-hidden'>
      
      <div className='w-full lg:w-1/2 flex flex-col items-center pt-10 lg:pt-20 order-2 lg:order-1'>
        <div className='w-full max-w-xl flex flex-col items-center gap-6'>
          <h1 className="text-4xl font-bold text-black mb-2 uppercase">Register</h1>
          <RegisterForm />
        </div>
      </div>

      <div className="hidden md:block w-full lg:w-1/2 h-[50vh] lg:h-[85vh] order-1 lg:order-2 sticky top-10">
        <MovieSection />
      </div>
      
    </section>
  )
}

export default page