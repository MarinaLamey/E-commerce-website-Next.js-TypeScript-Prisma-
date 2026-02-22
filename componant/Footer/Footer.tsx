import "./footer.css"

const Footer = () => {
  return (
    <footer className='mx-auto flex flex-col overflow-hidden bg-white overflow-hidden'>
      {/* القسم العلوي: اللوجو */}
      <div className='flex items-center justify-center p-8 border-t-2 border-neutral-100'>
        <h2 className='navbarlogo text-3xl font-medium flex items-center'>
          <span className='maincolor drop-shadow-logodrop text-4xl text-center'>N-</span>
          NegmCartilla
        </h2>
      </div>

      <div className='border-t border-neutral-100'>
        <div className='container mx-auto py-10 px-4'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center sm:text-left'>
            
            <div className='flex flex-col items-center sm:items-start'>
              <h5 className='font-bold text-lg mb-4 text-neutral-800'>About</h5>
              <ul className='text-neutral-500 space-y-3'>
                <li className="hover:text-[#771011] cursor-pointer transition-colors">Our Company</li>
                <li className="hover:text-[#771011] cursor-pointer transition-colors">Our Story</li>
                <li className="hover:text-[#771011] cursor-pointer transition-colors">Blog</li>
              </ul>
            </div>

            <div className='flex flex-col items-center sm:items-start'>
              <h5 className='font-bold text-lg mb-4 text-neutral-800'>Information</h5>
              <ul className='text-neutral-500 space-y-3'>
                <li className="hover:text-[#771011] cursor-pointer transition-colors">Delivery Information</li>
                <li className="hover:text-[#771011] cursor-pointer transition-colors">Privacy Policy</li>
                <li className="hover:text-[#771011] cursor-pointer transition-colors">Return</li>
              </ul>
            </div>

            <div className='flex flex-col items-center sm:items-start'>
              <h5 className='font-bold text-lg mb-4 text-neutral-800'>Support</h5>
              <ul className='text-neutral-500 space-y-3'>
                <li className="hover:text-[#771011] cursor-pointer transition-colors">Contact Us</li>
                <li className="hover:text-[#771011] cursor-pointer transition-colors">Help</li>
                <li className="hover:text-[#771011] cursor-pointer transition-colors">CheckOut</li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      <div className='border-t border-neutral-200 text-white bg-[#771011]'>
        <div className='container mx-auto px-4 flex flex-col md:flex-row justify-between items-center py-6 gap-6'>
          <p className='text-sm md:text-base text-center md:text-left opacity-90'>
            Copyright © 2026 <span className="font-bold">NegmCartilla</span> All Rights Reserved
          </p>
          
          <div className='flex items-center'>
            <ul className="example-2 flex gap-4">
              {/* LinkedIn */}
              <li className="icon-content">
                <a href="https://linkedin.com/" aria-label="LinkedIn" data-social="linkedin">
                  <div className="filled"></div>
                  <svg viewBox="0 0 16 16" width="18" height="18" fill="currentColor">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"></path>
                  </svg>
                </a>
                <div className="tooltip">LinkedIn</div>
              </li>

              {/* GitHub */}
              <li className="icon-content">
                <a href="https://www.github.com/" aria-label="GitHub" data-social="github">
                  <div className="filled"></div>
                  <svg viewBox="0 0 16 16" width="18" height="18" fill="currentColor">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"></path>
                  </svg>
                </a>
                <div className="tooltip">GitHub</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;