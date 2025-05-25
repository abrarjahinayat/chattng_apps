import React from 'react'
import Userlist from '../src/components/Userlist'

const Home = () => {
  return ( 
    <div className='grid grid-cols-3 mx-auto gap-x-10'>
        <Userlist/>
        <Userlist/> 
        <Userlist/> 
        <Userlist/> 
        <Userlist/> 
        <Userlist/> 
    </div>


  )
}

export default Home



