import React from 'react'
import Userlist from '../src/components/Userlist'
import { useSelector } from 'react-redux'

const Home = () => {

  let data = useSelector((state)=>state.userLogin.value)
   console.log(data)
  return ( 
    <div className='grid grid-cols-3 mx-auto gap-x-10'>

      <h1>{data.displayName}</h1>
        {/* <Userlist/>
        <Userlist/> 
        <Userlist/> 
        <Userlist/> 
        <Userlist/> 
        <Userlist/>  */}
    </div>


  )
}

export default Home



