import React, { useState } from "react";
import Sidebar from "./Sidebar"; // adjust the path
import Friendrequestlist from "../src/components/Friendrequestlist";
import Friendlist from "../src/components/FriendList";
import Userlist from "../src/components/Userlist";
import Blocklist from "../src/components/Blocklist";

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className=" bg-[url(../public/bg2.png)]  flex h-screen">
      <div className="lg:hidden block">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>

      <div className="flex-1 flex flex-col">
        {/* Hamburger for mobile */}
        <button
          className="md:hidden p-3 m-2 text-indigo-900  rounded"
          onClick={() => setSidebarOpen(true)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <main className="flex-1 overflow-auto p-4">
          {/* Your content goes here */}
          <div className="lg:block hidden ">
            <div className=" grid grid-cols-3  gap-10">
              <Friendrequestlist />
              <Friendlist />
              <Blocklist />
            </div>
          </div>
          <div>
            <Userlist />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
