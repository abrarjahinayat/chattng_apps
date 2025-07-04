import React from "react";
import { RiChat1Fill } from "react-icons/ri";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { GoGitPullRequestDraft } from "react-icons/go";
import { CgBlock } from "react-icons/cg";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userLogin.value);
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col items-center w-40 h-screen overflow-hidden text-indigo-300 bg-indigo-900 rounded">
        <a className="flex items-center justify-center w-full px-3 mt-3" href="#">
          <RiChat1Fill className="text-2xl text-amber-500" />
          <span className="ml-2 text-amber-500 text-xl font-bold">Chattrix</span>
        </a>
        <a className="flex items-center justify-center w-full mt-3" href="#">
          <span className="text-white text-xl font-bold">{user?.name}</span>
        </a>
        <div className="w-full px-2">
          <div className="flex flex-col items-center w-full mt-3 border-t border-gray-700">
            <Link
              to="/"
              className={`flex items-center w-full ${pathname === '/' ? "bg-indigo-700 text-white" : ""} h-12 px-3 mt-2 rounded hover:bg-indigo-700`}
            >
              <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="ml-2 text-sm font-medium">Home</span>
            </Link>
            <Link
              to="/massage"
              className={`flex items-center w-full ${pathname === '/massage' ? "bg-indigo-700 text-white" : ""} h-12 px-3 mt-2 rounded hover:bg-indigo-700`}
            >
              <IoChatbubbleEllipsesOutline className="text-xl" />
              <span className="ml-2 text-sm font-medium">Massage</span>
            </Link>
            {/* <Link
              to="/friends"
              className={`flex items-center w-full ${pathname === '/friends' ? "bg-indigo-700 text-white" : ""} h-12 px-3 mt-2 rounded hover:bg-indigo-700`}
            >
              <IoChatbubbleEllipsesOutline className="text-xl" />
              <span className="ml-2 text-sm font-medium">Friends</span>
            </Link> */}
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center justify-center w-full h-16 mt-auto bg-indigo-800 hover:bg-red-700 cursor-pointer"
        >
          <LuLogOut className="text-white" />
          <span className="ml-2 text-sm font-medium text-white">Logout</span>
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 left-0 h-full  w-50 bg-indigo-900 z-50 transform transition-transform duration-300 md:hidden ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex flex-col items-center h-full text-indigo-300">
          <button className="self-end p-4 text-white text-2xl" onClick={() => setSidebarOpen(false)}>
            &times;
          </button>
          <a className="flex items-center justify-center w-full px-3 mt-3" href="#">
            <RiChat1Fill className="text-2xl text-amber-500" />
            <span className="ml-2 text-amber-500 text-xl font-bold">Chattrix</span>
          </a>
          <a className="flex items-center justify-center w-full mt-3" href="#">
            <span className="text-white text-xl font-bold">{user?.name}</span>
          </a>
          <div className="w-full px-2">
            <div className="flex flex-col items-center w-full mt-3 border-t border-gray-700">
              <Link
                to="/"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center w-full ${pathname === '/' ? "bg-indigo-700 text-white" : ""} h-12 px-3 mt-2 rounded hover:bg-indigo-700`}
              >
                <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="ml-2 text-sm font-medium">Home</span>
              </Link>
              <Link
                to="/massage"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center w-full ${pathname === '/massage' ? "bg-indigo-700 text-white" : ""} h-12 px-3 mt-2 rounded hover:bg-indigo-700`}
              >
                <IoChatbubbleEllipsesOutline className="text-xl" />
                <span className="ml-2 text-sm font-medium">Massage</span>
              </Link>
              <Link
                to="/friends"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center w-full ${pathname === '/friends' ? "bg-indigo-700 text-white" : ""} h-12 px-3 mt-2 rounded hover:bg-indigo-700`}
              >
                <LiaUserFriendsSolid  className="text-xl" />
                <span className="ml-2 text-sm font-medium">Friends</span>
              </Link> 
              <Link
                to="/requestlist"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center w-full ${pathname === '/requestlist' ? "bg-indigo-700 text-white" : ""} h-12 px-3 mt-2 rounded hover:bg-indigo-700`}
              >
               <GoGitPullRequestDraft  className="text-xl" />
                <span className="ml-2 text-sm font-medium">Friend Request</span>
              </Link> 
              <Link
                to="/blocklist"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center w-full ${pathname === '/blocklist' ? "bg-indigo-700 text-white" : ""} h-12 px-3 mt-2 rounded hover:bg-indigo-700`}
              >
                <CgBlock className="text-xl" />
                <span className="ml-2 text-sm font-medium">Block List</span>
              </Link>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full h-16 mt-auto bg-indigo-800 hover:bg-red-700 cursor-pointer"
          >
            <LuLogOut className="text-white" />
            <span className="ml-2 text-sm font-medium text-white">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
