import { onValue, ref, getDatabase } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { auth } from "../firebase.config";
import { useDispatch } from "react-redux";
import { chatListInfo } from "../Redux/chatSlice";
const Chatlist = () => {
  const user = useSelector((state) => state.userLogin.value);
  const userid = useSelector((state) => state.chatList.value);
  const dispatch = useDispatch();
  console.log(userid);
  const db = getDatabase();
  const [chatlist, setchatlist] = useState([]);

  useEffect(() => {
    const userreqlistRef = ref(db, "friendlist/");
    onValue(userreqlistRef, (snapshot) => {
      const array = [];
      snapshot.forEach((item) => {
        if (
          auth.currentUser.uid == item.val().senderid ||
          auth.currentUser.uid == item.val().receiverid
        ) {
          array.push({ ...item.val(), id: item.key });
        }
      });

      setchatlist(array);
    });
  }, []);
  console.log(chatlist);

  const handleselectChat = (item) => {
    // console.log(item)
    if (auth.currentUser.uid == item.senderid) {
      console.log("receiver");
      dispatch(chatListInfo({name:item.receivername, id: item.receiverid}))
    } else {
      console.log("sender");
         dispatch(chatListInfo({name:item.sendername, id: item.senderid}))
    }
  };

  return (
    <div>
      {" "}
      <div class="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
        <div class="flex flex-row items-center justify-center h-12 w-full">
          <div class="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              ></path>
            </svg>
          </div>
          <div class="ml-2 font-bold text-2xl">Chattrix</div>
        </div>
        <div class="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
          <div class="flex items-center justify-center h-15 w-15 bg-indigo-200 rounded-full">
            <h2 className="text-4xl font-extrabold text-indigo-700 ">
              {" "}
              {userid?.name.charAt(0).toUpperCase()}
            </h2>
          </div>
          <div class="text-sm font-semibold mt-2">{userid?.name}</div>
          <div class="text-xs text-gray-500">{userid?.email}</div>
          <div class="flex flex-row items-center mt-3"></div>
        </div>
        <div class="flex flex-col bg-indigo-100 border border-gray-200  w-full py-6 px-4 rounded-lg mt-8">
          <div class="flex flex-row items-center justify-between text-xs">
            <span class="font-bold">Friend List</span>
          </div>

          {chatlist.map((item) => (
            <div
              onClick={() => handleselectChat(item)}
              class="flex flex-col mt-4 -mx-2 "
            >
              <button class={`" flex flex-row items-center ${userid?.id == item.senderid || userid?.id == item.receiverid ? "bg-indigo-600 text-white " : 
               "bg-transparent"} rounded-xl p-2"`}>
                <div class="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                  {auth.currentUser.uid == item.senderid
                    ? item.receivername?.charAt(0).toUpperCase()
                    : item.sendername?.charAt(0).toUpperCase()}
                </div>
                {auth.currentUser.uid == item.senderid ? (
                  <div class="ml-2 text-sm font-semibold">
                    {item.receivername}
                  </div>
                ) : (
                  <div class="ml-2 text-sm font-semibold">
                    {item.sendername}
                  </div>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chatlist;
