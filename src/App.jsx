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


const router = createBrowserRouter([
  {
    path: "/",
    Component: Rootlayout,
    children: [
      { index: true, Component: Home },
      { path: "massage", Component: Massage },
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