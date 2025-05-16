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
  });
 let navigate = useNavigate()
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
          sendEmailVerification(auth.currentUser).then(() => {
            // Email verification sent!
            updateProfile(auth.currentUser, {
              displayName: userinfo.name,
              photoURL: "person.jpg",
            })
              .then(() => {
                const user = userCredential.user;
                console.log(user);
                navigate("/")
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
          });
        });
    }
  };
  return (
    <div className="flex flex-col justify-center sm:h-screen p-4">
      <Toaster />
      <div className="max-w-md w-full mx-auto border border-slate-300 rounded-2xl p-8">
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
            {/* <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
          />
          <label
            htmlFor="remember-me"
            className="text-slate-800 ml-3 block text-sm"
          >
            I accept the{" "}
            <a
              href="javascript:void(0);"
              className="text-blue-600 font-medium hover:underline ml-1"
            >
              Terms and Conditions
            </a>
          </label>
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
              to={"/"}
              href="javascript:void(0);"
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
