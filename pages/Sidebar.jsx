import React from "react";
import { RiChat1Fill } from "react-icons/ri";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { MdGroups } from "react-icons/md";
import { BiGroup } from "react-icons/bi";
import { MdNotificationAdd } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
const Sidebar = () => {
  const { pathname } = useLocation();
  console.log(pathname);
  const nevigate = useNavigate();
  const user = useSelector((state) => state.userLogin.value);
  // console.log(user);
  const auth = getAuth();
  let handleLogout = () => {
    signOut(auth)
      .then(() => {
        nevigate("/login");
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <>
      {/* Component Start */}
      <div className="flex flex-col items-center w-40 h-screen  overflow-hidden text-indigo-300 bg-indigo-900 rounded">
        <a
          className="flex items-center justify-center w-full px-3 mt-3"
          href="#"
        >
          <RiChat1Fill className="text-2xl text-amber-500" />
          <span className="ml-2 text-amber-500 text-xl font-bold">
            Chattrix
          </span>
        </a>
        <a className="flex items-center justify-center w-full mt-3" href="#">
          <span className=" text-white text-xl font-bold">{user?.name}</span>
        </a>
        <div className="w-full px-2">
          <div className="flex flex-col items-center w-full mt-3 border-t border-gray-700">
            <Link
              to={"/"}
              className={`" flex items-center w-full ${pathname == '/' && "bg-indigo-700 text-white"} h-12 px-3 mt-2 rounded  hover:bg-indigo-700 "`}
              href="#"
            >
              <svg
                className="w-6 h-6 stroke-current"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span className="ml-2 text-sm font-medium">Home</span>
            </Link>
            {/* <a
              className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-indigo-700"
              href="#"
            >
              <svg
                className="w-6 h-6 stroke-current"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span className="ml-2 text-sm font-medium">Search</span>
            </a> */}
            <Link
              to={"/massage"}
              className={`" flex items-center w-full ${pathname == '/massage' && "bg-indigo-700 text-white"} h-12 px-3 mt-2 rounded  hover:bg-indigo-700 "`}
              href="#"
            >
              <IoChatbubbleEllipsesOutline className="text-xl" />
              <span className="ml-2 text-sm font-medium">Massage</span>
            </Link>
            <a
              className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-indigo-700"
              href="#"
            >
              <BiGroup className="text-2xl" />
              <span className="ml-2 text-sm font-medium">Friends</span>
            </a>
          </div>
          {/* <div className="flex flex-col items-center w-full mt-2 border-t border-gray-700">
            <a
              className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-indigo-700"
              href="#"
            >
              <MdGroups className="text-2xl" />
              <span className="ml-2 text-sm font-medium">Groups</span>
            </a>
            <a
              className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-indigo-700"
              href="#"
            >
              <svg
                className="w-6 h-6 stroke-current"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
              <span className="ml-2 text-sm font-medium">Settings</span>
            </a>
            <a
              className="relative flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-indigo-700"
              href="#"
            >
              <MdNotificationAdd className="text-2xl" />
              <span className="ml-2 text-sm font-medium">Notifications</span>
              <span className="absolute top-0 left-0 w-2 h-2 mt-2 ml-2 bg-indigo-500 rounded-full" />
            </a>
          </div> */}
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center justify-center w-full h-16 mt-auto bg-indigo-800 hover:bg-red-700 cursor-pointer "
          href="#"
        >
          <LuLogOut className="text-white" />
          <span className="ml-2 text-sm font-medium text-white ">Logout</span>
        </button>
      </div>
      {/* Component End  */}
    </>
  );
};

export default Sidebar;
