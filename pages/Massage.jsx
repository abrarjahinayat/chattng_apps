import React, { useEffect, useState } from "react";
import Chatlist from "../src/components/Chatlist";
import { useSelector } from "react-redux";
import { push, ref, set, getDatabase, onValue } from "firebase/database";
import { auth } from "../src/firebase.config";
import moment from "moment/moment";

const Massage = () => {
  const db = getDatabase();
  const [sendmsg, setsendmsg] = useState(null);
  const [readmsg, setreadmsg] = useState([]);
  const userid = useSelector((state) => state.chatList.value);
  let handlemsg = (e) => {
    setsendmsg(e.target.value);
  };

  const handlesend = () => {
    // console.log(sendmsg);
    set(push(ref(db, "msglist/")), {
      sendername: auth.currentUser.displayName,
      senderid: auth.currentUser.uid,
      receivername: userid.name,
      receiverid: userid.id,
      msg: sendmsg,
      date: `${new Date().getFullYear()}-${
        new Date().getMonth() + 1
      }-${new Date().getDate()}-${new Date().getHours()}-${new Date().getMinutes()}`,
    }).then(() => {
      setsendmsg("");
    });
  };

  useEffect(() => {
    const userreqlistRef = ref(db, "msglist/");
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

      setreadmsg(array);
    });
  }, []);

  
const handleKeyPress = (e) => {
  if (e.key === "Enter" && sendmsg.trim()) {
    handlesend();
  }
};
  // console.log(readmsg);
  return (
    <div class="flex h-screen antialiased text-gray-800">
      <div class="flex flex-row h-full w-full overflow-x-hidden">
        {/* Friendlist section  */}
        <Chatlist />
        {/* Chat section start */}
        <div class="flex flex-col w-7xl ml-15 flex-auto h-full p-6">
          <div class="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
            {userid && (
              <div class="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
                <div class="flex flex-col h-full overflow-x-auto mb-4">
                  <div class="flex flex-col h-full">
                    <div class="grid grid-cols-12 gap-y-2">
                      
                    {readmsg.map((item) =>
  (item.senderid === auth.currentUser.uid && item.receiverid === userid.id) ||
  (item.receiverid === auth.currentUser.uid && item.senderid === userid.id) ? (

    item.senderid === auth.currentUser.uid ? (
      <div class="col-start-6 col-end-13 p-3 rounded-lg">
        <div class="flex items-center justify-start flex-row-reverse">
          <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
            {item.sendername.charAt(0).toUpperCase()}
          </div>
          <div class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
            <div>
              <h3>{item.msg}</h3>
              <p>
                {moment(item.date, "YYYYMMDD,h:mm:ss a").fromNow()}
              </p>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div class="col-start-1 col-end-8 p-3 rounded-lg">
        <div class="flex flex-row items-center">
          <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
            {userid?.name.charAt(0).toUpperCase()}
          </div>
          <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
            <div>
              <h3>{item.msg}</h3>
              <p>
                {moment(item.date, "YYYYMMDD,h:mm:ss a").fromNow()}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  ) : null
)}

                    </div>
                  </div>
                </div>
                <div class="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                  <div>
                    <button class="flex items-center justify-center text-gray-400 hover:text-gray-600">
                      <svg
                        class="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <div class="flex-grow ml-4">
                    <div class="relative w-full">
                      <input
                        onChange={handlemsg}
                        value={sendmsg}
                        onKeyDown={handleKeyPress}
                        type="text"
                        class="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                      />

                      <button class="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
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
                            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div class="ml-4">
                    <button
                      onClick={handlesend}
                      class="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                    >
                      <span>Send</span>
                      <span class="ml-2">
                        <svg
                          class="w-4 h-4 transform rotate-45 -mt-px"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          ></path>
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Massage;
