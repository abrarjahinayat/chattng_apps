import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Home from '../pages/Home';
import Notfound from '../pages/Notfound';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Sidebar from '../pages/Sidebar';
import Rootlayout from './components/Rootlayout';
import Massage from '../pages/Massage';
import Friends from '../pages/Mobile_pages/Friends';
import Requestlist from '../pages/Mobile_pages/Requestlist';
import Block from '../pages/Mobile_pages/Block';




const router = createBrowserRouter([
  {
    path: "/",
    Component: Rootlayout,
    children: [
      { index: true, Component: Home },
      { path: "massage", Component: Massage },
      { path: "friends", Component: Friends },
      { path: "requestlist", Component: Requestlist },
      { path: "blocklist", Component: Block },
  

    ],
  },  {
    path: "/login",
    Component: Login,
  },{
    path: "/signup",
    Component: Signup,
  },{
    path: "*",
    Component: Notfound,
  },
]);
const App = () => {
  return (
     <RouterProvider router={router} />
  )
}

export default App