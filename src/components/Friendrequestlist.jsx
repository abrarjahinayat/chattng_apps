import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { auth } from "../firebase.config";
import toast, { Toaster } from "react-hot-toast";

const Friendrequestlist = () => {
  const db = getDatabase();
  const [Requestlist, SetRequestlist] = useState([]);

  useEffect(() => {
    const userreqlistRef = ref(db, "friendreqlist/");
    onValue(userreqlistRef, (snapshot) => {
      const array = [];
      snapshot.forEach((item) => {
        if (auth.currentUser.uid == item.val().receiverid) {
          array.push({ ...item.val(), id: item.key });
        }
      });

      SetRequestlist(array);
    });
  }, []);

 const handleAccept = (item)=>{
    set(push(ref(db, "friendlist/")), {
         ...item,
        }).then(() => {  
            remove(ref(db, "friendreqlist/" + item.id))
          console.log("friend accept");
        });
      
  }

  const handleDelete = (item) => {
    remove(ref(db, "friendreqlist/" + item.id));
  };

  return (
    <>
      {/* component */}
      {/* This is an example component */}
      <div className="max-w-2xl mx-auto mt-4 ">
        <div className="p-4 w-sm  lg:w-md bg-white rounded-lg lg:border shadow-md sm:p-8 ">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold leading-none text-gray-900">
              Friend Request List
            </h3>
            <a
              href="#"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              View all
            </a>
          </div>

          <form className="max-w-md mx-auto mb-2">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-3 ps-10 text-sm text-black border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 "
                placeholder="Search User list..."
                required=""
              />
            </div>
          </form>

          <div className="flow-root">
            <ul
              role="list"
              className="divide-y divide-gray-200 h-[300px] overflow-y-scroll pr-5"
            >
              {Requestlist.map((item) => (
                <li className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="w-8 h-8 rounded-full"
                        src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                        alt="Neil image"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate ">
                        {item.sendername}
                      </p>
                      <p className="text-sm text-gray-500 truncate "></p>
                    </div>
                    <div
                      onClick={() => handleAccept(item)}
                      className="inline-flex items-center text-base cursor-pointer font-semibold text-white bg-green-500 p-1.5 rounded-md "
                    >
                      Accept
                    </div>{" "}
                    <div
                      onClick={() => handleDelete(item)}
                      className="inline-flex items-center text-base cursor-pointer font-semibold text-white bg-red-500 p-1.5 rounded-md "
                    >
                      Reject
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Friendrequestlist;
