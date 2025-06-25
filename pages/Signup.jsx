import { getDatabase, ref, set } from "firebase/database";
import React, { useState } from "react";
import { Link } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { app, auth } from "../src/firebase.config";
import { useNavigate } from "react-router";
const Signup = () => {
  let [userinfo, setUserinfo] = useState({
    name: "",
    email: "",
    password: "",
    // gender: "",
  });
  console.log(userinfo)
  let navigate = useNavigate();
  const db = getDatabase();
  let handleName = (e) => {
    setUserinfo((prev) => {
      return {
        ...prev,
        name: e.target.value,
      };
    });
  };

  let handleEmail = (e) => {
    setUserinfo((prev) => {
      return { ...prev, email: e.target.value };
    });
  };

  let handlePassword = (e) => {
    setUserinfo((prev) => {
      return { ...prev, password: e.target.value };
    });
  };

// let handleGender = (e) => {
//     setUserinfo((prev) => {
//       return { ...prev, gender: e.target.value };
//     });
//   };

  let handleSubmit = (e) => {
    e.preventDefault();
    if (!userinfo.name || !userinfo.email || !userinfo.password) {
      toast.error("All field are required");
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userinfo.email)
    ) {
      toast.error("Email is invalid");
    } else {
      createUserWithEmailAndPassword(auth, userinfo.email, userinfo.password)
        .then((userCredential) => {
          toast.success("Signup successfully");
          sendEmailVerification(auth.currentUser).then(() => {
            // Email verification sent!
            updateProfile(auth.currentUser, {
              displayName: userinfo.name,
              // photoURL: userinfo.gender,
              // gender: userinfo.gender,
            })
            .then(() => {
                // setUserProperties(analytics, { gender: userinfo.radio })
                const user = userCredential.user;
                console.log(user);
                set(ref(db, "users/" + user.uid), {
                  name: user.displayName,
                  email: user.email,
                  // gender: userinfo.gender,
                })
                  .then(() => {
                    navigate("/login");
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              })
              .catch((error) => {
                console.log(error);
              });
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode.includes("auth/email-already-in-use")) {
            toast.error("This Email already in use");
          }
          setUserinfo({
            name: "",
            email: "",
            password: "",
            // gender : " ",
          });
        });
    }
  };
  return (
    <div className="flex flex-col justify-center sm:h-screen p-4">
      <Toaster />
      <div className="max-w-md w-full mx-auto border border-slate-300 rounded-2xl p-8">
        <img src="../public/logo.png " alt="" />
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold">Sign Up</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label className="text-slate-800 text-sm font-medium mb-2 block">
                Your Name
              </label>
              <input
                onChange={handleName}
                value={userinfo.name}
                name="name"
                type="text"
                className="text-slate-800 bg-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="text-slate-800 text-sm font-medium mb-2 block">
                Enter Email
              </label>
              <input
                onChange={handleEmail}
                value={userinfo.email}
                name="email"
                type="text"
                className="text-slate-800 bg-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                placeholder="Enter email"
              />
            </div>
            <div>
              <label className="text-slate-800 text-sm font-medium mb-2 block">
                Password
              </label>
              <input
                onChange={handlePassword}
                value={userinfo.password}
                name="password"
                type="password"
                className="text-slate-800 bg-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                placeholder="Enter password"
              />
            </div>  
            
            


            {/* gender radio box */}

            {/* <div className="items-center gap-5">
                <p className=" text-slate-800 text-sm font-medium mb-2" >  Gender:</p>
                
              <div className="inline-flex gap-5 items-center">
              
                <label
                  className="relative flex items-center cursor-pointer"
                  htmlFor="html"
                >
                 
                  <input
                   onChange={handleGender}
                   value= "male"
                    name="gender"
                    type="radio"
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all"
                    id="html"
                  />
                  <span className="absolute bg-slate-800 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                </label>
                <label
                  className="ext-slate-800 cursor-pointer text-sm font-medium ml-2"
                  htmlFor="html"
                >
                  Male
                </label>
              </div>
              <div className="inline-flex ml-10 items-center">
                <label
                  className="relative flex items-center cursor-pointer"
                  htmlFor="react"
                >
                  <input
                     onChange={handleGender}
                   value= "female"
                    name="gender"
                    type="radio"
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all"
                    id="react"
                    defaultChecked=""
                  />
                  <span className="absolute bg-slate-800 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                </label>
                <label
                  className="text-slate-800 cursor-pointer text-sm font-medium ml-2"
                  htmlFor="react"
                >
                  Female
                </label>
              </div>
            </div> */}

            
          </div>
          <div className="mt-12">
            <button
              type="submit"
              className="w-full py-3 px-4 text-sm tracking-wider font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer"
            >
              Create an account
            </button>
          </div>
          <p className="text-slate-800 text-sm mt-6 text-center">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="text-blue-600 font-medium hover:underline ml-1"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
