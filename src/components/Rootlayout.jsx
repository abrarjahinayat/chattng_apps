import React, { useEffect } from 'react'
import { Outlet } from 'react-router'
import Sidebar from '../../pages/Sidebar'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { userLoginInfo } from '../Redux/userSlice'
import { useNavigate } from 'react-router'

const Rootlayout = () => {
  let nevigate =useNavigate()
    let auth = getAuth()
    let dispatch =useDispatch()
    
   useEffect(()=>{
      onAuthStateChanged(auth, (user) => {
  if (user) {
       dispatch(userLoginInfo({
        name : user.displayName,
        email : user.email,
        uid: user.uid,
        gender: user.photoURL

       }))
  } else {
     dispatch(userLoginInfo(null))
     nevigate('/login')
  }
});
   },[dispatch])


  return (
    <div className='flex gap-x-4'>
    <Sidebar/>
    <Outlet/>
    </div>
    
  )
}

export default Rootlayout