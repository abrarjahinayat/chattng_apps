import React, { useEffect, useState } from "react";
import Chatlist from "../src/components/Chatlist";
import { useSelector } from "react-redux";
import { push, ref, set, getDatabase, onValue } from "firebase/database";
import { auth } from "../src/firebase.config";
import moment from "moment/moment";
import Sidebar from "./Sidebar"; // adjust the path
const Massage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
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
  <div className="flex h-screen antialiased text-gray-800 flex-col lg:flex-row">
    
    {/* Sidebar for mobile and desktop */}
    <div className="lg:hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
    </div>

    {/* Sidebar fixed for large devices */}
    {/* <div className="hidden lg:block">
      <Sidebar />
    </div> */}

    {/* Main content area */}
    <div className="flex-1 flex flex-col">
      
      {/* Hamburger menu for mobile */}
      <div className="lg:hidden p-2 ">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 bg-indigo-500 text-white rounded"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row h-full lg:w-full lg:overflow-hidden">
        
        {/* Chatlist (Friendlist section) */}
        <div>
          <Chatlist />
        </div>


        {/* Chat section */}
        <div className="lg:flex w-sm flex-col lg:w-7xl  flex-1 h-full p-2 lg:p-4">
          
          {userid && (
            <div className="flex flex-col  rounded-2xl bg-gray-100 h-full p-2 lg:p-4">
              
              {/* Message display area */}
              <div className="flex flex-col h-full overflow-y-auto mb-4">
                <div className="grid grid-cols-12 gap-y-2">
                  
                  {readmsg.map((item) =>
                    (item.senderid === auth.currentUser.uid && item.receiverid === userid.id) ||
                    (item.receiverid === auth.currentUser.uid && item.senderid === userid.id) ? (
                      item.senderid === auth.currentUser.uid ? (
                        <div className="col-start-6 col-end-15 p-3">
                          <div className="flex items-center gap-x-1 lg:gap-x-3 justify-end">
                            <div className="lg:h-10 lg:w-10 h-7 w-7 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                              {item.sendername.charAt(0).toUpperCase()}
                            </div>
                            <div className="lg:mr-3 text-wrap text-white text-sm bg-indigo-500 py-2 px-4 shadow rounded-xl sm:max-w-xs ">
                              <h3>{item.msg}</h3>
                              <p className="text-xs text-white/80">
                                {moment(item.date, "YYYYMMDD,h:mm:ss a").fromNow()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="col-start-1 col-end-8 p-3">
                          <div className="flex items-center  ">
                            <div className="lg:h-10 lg:w-10 h-7 w-7 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                              {userid?.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="relative ml-2 lg:ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl max-w-xs sm:max-w-sm md:max-w-md">
                              <h3>{item.msg}</h3>
                              <p className="text-xs text-gray-500">
                                {moment(item.date, "YYYYMMDD,h:mm:ss a").fromNow()}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    ) : null
                  )}
                  
                </div>
              </div>

              {/* Message input area */}
              <div className="flex items-center h-16 rounded-xl bg-white px-1 lg:px-4">
                
                <div className="flex-grow">
                  <input
                    onChange={handlemsg}
                    value={sendmsg}
                    onKeyDown={handleKeyPress}
                    type="text"
                    className="w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                    placeholder="Type your message..."
                  />
                </div>

                <button
                  onClick={handlesend}
                  className="ml-4 bg-indigo-500 hover:bg-indigo-600 text-white p-2 lg:px-4 py-2 rounded-xl flex items-center"
                >
                  <span className="lg:block hidden">Send</span>
                  <svg className="w-4 h-4 lg:ml-2 transform rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>

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
