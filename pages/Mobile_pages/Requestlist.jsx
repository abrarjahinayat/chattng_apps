import React, { useState } from 'react'
import Sidebar from "../Sidebar"; // adjust the path
import Friendrequestlist from '../../src/components/Friendrequestlist';

const Requestlist = () => {
     const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div  >
             <div className='lg:hidden  block'>
              

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      

      <div className="flex-1 flex flex-col">
        {/* Hamburger for mobile */}
        <button
          className="md:hidden p-3 m-2 text-indigo-900"
          onClick={() => setSidebarOpen(true)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div  >

        <Friendrequestlist/>
        </div>
    </div>
    </div>
    </div>
  )
}

export default Requestlist