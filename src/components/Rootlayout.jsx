import React from 'react'
import { Outlet } from 'react-router'
import Sidebar from '../../pages/Sidebar'

const Rootlayout = () => {
  return (
    <div className='flex gap-x-4'>
    <Sidebar/>
    <Outlet/>
    </div>
    
  )
}

export default Rootlayout