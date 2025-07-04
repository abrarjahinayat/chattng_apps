import { onValue, ref, getDatabase } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../firebase.config";
import { chatListInfo } from "../Redux/chatSlice";

const Chatlist = () => {
  const [filterResult, setfilterResult] = useState();
  const user = useSelector((state) => state.userLogin.value);
  const userid = useSelector((state) => state.chatList.value);
  const dispatch = useDispatch();
  const db = getDatabase();
  const [chatlist, setchatlist] = useState([]);

  useEffect(() => {
    const userreqlistRef = ref(db, "friendlist/");
    onValue(userreqlistRef, (snapshot) => {
      const array = [];
      snapshot.forEach((item) => {
        if (auth.currentUser.uid == item.val().senderid || auth.currentUser.uid == item.val().receiverid) {
          array.push({ ...item.val(), id: item.key });
        }
      });
      setchatlist(array);
    });
  }, []);

  const handleselectChat = (item) => {
    if (auth.currentUser.uid == item.senderid) {
      dispatch(chatListInfo({ name: item.receivername, id: item.receiverid }));
    } else {
      dispatch(chatListInfo({ name: item.sendername, id: item.senderid }));
    }
  };

  const handlesearch = (e) => {
    const filterresult = chatlist.filter(
      (item) =>
        item.sendername.toUpperCase().replaceAll(" ", "").includes(e.target.value.toUpperCase()) ||
        item.receivername.toUpperCase().replaceAll(" ", "").includes(e.target.value.toUpperCase())
    );
    setfilterResult(filterresult);
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-col flex-wrap lg:py-8 lg:pl-6 pr-2 w-full lg:w-90 bg-white flex-shrink-0">

        {/* Logo Section - hidden on mobile */}
        <div className="hidden lg:flex flex-row items-center justify-center h-12 lg:w-full">
          <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </div>
          <div className="ml-2 font-bold text-2xl">Chattrix</div>
        </div>

        {/* Profile and Friend List */}
        <div className="flex flex-col lg:flex-col lg:block hidden items-center bg-indigo-100 border border-gray-200 lg:mt-10 w-full py-2 lg:py-6 px-4 rounded-lg">

       
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center h-12 w-12 bg-indigo-200 rounded-full">
                <h2 className="text-2xl font-extrabold text-indigo-700">
                  {userid?.name?.charAt(0).toUpperCase()}
                </h2>
              </div>
              <div>
                <div className="text-lg font-semibold">{userid?.name}</div>
                <div className="text-xs text-gray-500">{userid?.email}</div>
              </div>
            </div>

          
          </div>
        </div>

        {/* Friend List */}
        
        <div className="flex flex-col bg-indigo-100 border border-gray-200 w-full lg:py-6 py-3 px-4 rounded-lg mt-4">
          <span className="font-bold text-md lg:text-2xl mb-3">Friend List</span>
            {/* Search Bar */}
            <form className="w-full sm:w-auto lg:mt-4 sm:mt-0">
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  onChange={handlesearch}
                  type="search"
                  className="block w-full py-2 lg:py-3 mb-2 lg:mb-4 ps-10 text-sm text-black border border-gray-600 rounded-lg bg-indigo-100"
                  placeholder="Search..."
                />
              </div>
            </form>

          {(filterResult || chatlist).map((item) => (
            <div key={item.id} onClick={() => handleselectChat(item)} className="flex flex-col mt-2 -mx-2">
              <button
                className={`flex flex-row items-center ${
                  userid?.id === item.senderid || userid?.id === item.receiverid ? "bg-indigo-600 text-white" : "bg-transparent"
                } rounded-xl p-2`}
              >
                <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                  {auth.currentUser.uid === item.senderid
                    ? item.receivername?.charAt(0).toUpperCase()
                    : item.sendername?.charAt(0).toUpperCase()}
                </div>
                <div className="ml-2 text-xs lg:text-xl font-semibold">
                  {auth.currentUser.uid === item.senderid ? item.receivername : item.sendername}
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chatlist;
