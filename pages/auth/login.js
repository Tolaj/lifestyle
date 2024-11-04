import React from "react";
import { useState } from 'react';
import { useRouter } from 'next/router';
// layout for page

import Auth from "layouts/Auth.js";
import FetchAPI from "controllers/fetchAPI";
import PageChange from "components/PreLoader";

export default function Login() {
  const router = useRouter();
  const [preLoader, setPreLoader] = React.useState(0);
  const [tempData, setTempData] = React.useState({});

  const handleChange = (e) => {
      const { name, value } = e.target;
      setTempData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        
      const file = e.target.files?e.target.files[0]:null;

      if (file) {
          setTempData((prevState) => ({
            ...prevState,
            file: file,
          }));
      }
  }

  const handleSave = async () => {
    setPreLoader(true);

    try {
      const result = await FetchAPI('/api/login', 'POST', tempData);
      if (result.message === 'Login successful') {
        // Redirect to dashboard
        router.push('/admin/dashboard'); // Change to your dashboard route
    } else {
        // Handle login failure (show an error message, etc.)
        alert(result.message || 'Login failed');
    }
      setPreLoader(false); // Stop the preloader

    } catch (error) {
      console.log('_____login Account Failed!_____');
      setPreLoader(false);
      console.log(error);
    }
  };

  if(preLoader) return <PageChange />

  return (
    <>
      
      <div className="container mx-auto px-4 h-full md:mt-20 mt-14">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full md:w-2/5 px-4 ">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6  bg-[#161616] border-0">
              <div className="rounded-t px-6 py-6">
                <div className="flex items-center w-full justify-center ">
                  <div className=" flex justify-center items-center  rounded-full  ">
                    <img src="/assets/images/logo.png" className="px-2  w-52     rounded-full " alt="" />
                  </div>
                </div>
              </div>
              <div className="flex-auto pt-0">
                {/* <div className="text-white text-center py-4 text-lg font-medium">
                  Welcome to LifeStyle 
                </div> */}
                <form onSubmit={(e)=>{e.preventDefault();handleSave()}}>
                  
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      {/* Email */}
                    </label>
                    <input
    
                      className="border-0 px-3 py-4 placeholder-blueGray-400 drop-shadow-sm  font-medium text-blueGray-600 bg-white rounded text-base  focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email address"
                      name="email"
                      type="email"
                      id="email"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      {/* Password */}
                    </label>
                    <input
        
                      className="border-0 px-3 py-4 placeholder-blueGray-400 font-medium drop-shadow-sm text-blueGray-600 bg-white rounded text-base  focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      name="password"
                      type="password"
                      id="password"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="inline-flex text-white items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        Remember me
                      </span>
                    </label>
                  </div>

                  <div className=" flex items-center justify-center ">
                    <button type="submit" class=" my-6 md:my-8  w-fit text-sm text-[#cacaca] hover:cursor-pointer hover:text-black hover:bg-gray-200  border border-opacity-50 border-[#cacaca] rounded-3xl px-5 py-[7px]  ">
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap justify-center -mt-9 relative ">
              <div className="">
                <a
                  href="#pablo"
                  onClick={()=>alert("For security reasons we did not automate this process, to reset password please contact swapnilhgf@gmail.com")}
                  
                >
                  <p className="text-white hover:text-blueGray-600 text-base font-medium drop-shadow-sm">Forgot password?</p>
                </a>
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Login.layout = Auth;
