import "./loginpage.css"
import LoginForm from "./LoginForm";
import { MovieSection } from "@/componant/MovieSection/MovieSection";
async function Page() {
  return (
    <section className='relative flex flex-col lg:flex-row min-h-screen w-full gap-10 items-start overflow-x-hidden'>
      
      <div className='w-full lg:w-1/2  p-6 md:p-10 flex flex-col items-center pt-10 lg:pt-20 order-2 lg:order-1'>
        <div className='w-full max-w-xl h-full flex flex-col items-center gap-6'>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Log In</h1>
          <LoginForm />
        </div>
      </div>

      <div className="hidden md:block w-full lg:w-1/2 h-[50vh] lg:h-[100vh] order-1 lg:order-2 sticky ">
        <MovieSection />
      </div>
      
    </section>
  )
}

export default Page;