"use client"

function Sidebar () {

  return(
  <div className="w-full md:w-64 flex flex-col gap-2 p-4 shadow-2xl bg-white/5 backdrop-blur-md border-r border-white/10 min-h-[300px] md:min-h-screen">
    <h2 className="font-['Oswald'] text-xl text-[#771011] mb-8 px-4 tracking-widest uppercase">Dashboard</h2>
    <nav className="flex flex-col gap-2">
      {[
        { name: 'My Profile', href: '/ProfilePage', active: true },
        { name: 'My Orders', href: '/profile/orders?pageNumber=1', active: false },
        { name: 'Shopping Cart', href: '/cartpage', active: false },
        { name: 'Settings', href: '/settings', active: false },
      ].map((link) => (
        <a
          key={link.name}
          href={link.href}
          onClick={() => link.active = true }
          className={`font-['Roboto'] px-4 py-3 rounded-xl transition-all duration-300 ${
            link.active 
            ? 'bg-[#771011] text-white shadow-lg shadow-[#771011]/20' 
            : 'text-gray-400 hover:bg-white/5 hover:text-[#771011]'
          }`}
        >
          {link.name}
        </a>
      ))}
    </nav>
  </div>
  )
};

export default Sidebar;