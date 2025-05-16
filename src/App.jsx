import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Home from '../pages/Home';
import Notfound from '../pages/Notfound';
import Login from '../pages/Login';
import Signup from '../pages/Signup';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },  {
    path: "*",
    element: <Notfound/>,
  },{
    path: "/login",
    element: <Login/>,
  },{
    path: "signup",
    element: <Signup
    />,
  },
]);
const App = () => {
  return (
     <RouterProvider router={router} />
  )
}

export default App