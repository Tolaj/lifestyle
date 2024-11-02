  import React from "react";
  import Link from "next/link";
  import { useState } from 'react';
  import { useRouter } from 'next/router';
  // layout for page
  import axios from "axios";
  import Auth from "layouts/Auth.js";

  export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (event) => {
      event.preventDefault();
      // Replace the URL with your API endpoint to handle login logic
      // const userLoginUrl = `${process.env.SERVER_API}api/users/login`
      let loginForm = {email:email,password:password}
      // const response =  await axios.post(userLoginUrl, loginForm)

      // const response = {}

      // if(email == "root@gmail.com" && password == "root"){
      //   router.push('/admin/dashboard')
      // }else{
        
      // }

      // if (response.status == 200) {
      //   // Redirect to the dashboard page after successful login
        router.push('/admin/dashboard');
      //   const token = response.data.token;
      //   localStorage.setItem('token', token);
      // } else {
      //   // Handle login failure
      //   alert('Invalid email or password');
      // }
    };

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
                  {/* <div className="btn-wrapper text-center">
                    <button
                      className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                      type="button"
                    >
                      <img alt="..." className="w-5 mr-1" src="/img/github.svg" />
                      Github
                    </button>
                    <button
                      className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                      type="button"
                    >
                      <img alt="..." className="w-5 mr-1" src="/img/google.svg" />
                      Google
                    </button>
                  </div> */}
                  {/* <hr className="mt-6 border-b-1 bg-[#F9FAFE]" /> */}
                </div>
                <div className="flex-auto pt-0">
                  {/* <div className="text-white text-center py-4 text-lg font-medium">
                    Welcome to LifeStyle 
                  </div> */}
                  <form onSubmit={handleSubmit}>
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

                        type="email"
                        id="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
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

                        type="password"
                        id="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                      />
                    </div>
                    {/* <div>
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          id="customCheckLogin"
                          type="checkbox"
                          className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                        />
                        <span className="ml-2 text-sm font-semibold text-blueGray-600">
                          Remember me
                        </span>
                      </label>
                    </div> */}

                    <div className="text-center mt-6 ">
                    <div onClick={()=>{router.push('/auth/login')}} class=" my-6 md:my-8   text-sm text-[#cacaca] hover:cursor-pointer hover:text-black hover:bg-gray-200  border border-opacity-50 border-[#cacaca] rounded-3xl px-5 py-[7px]  ">
                      Sign In
							      </div>
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
                {/* <div className="w-1/2 text-right">
                  <Link legacyBehavior href="/auth/register">
                    <a href="#pablo" className="text-blueGray-200">
                      <small>Create new account</small>
                    </a>
                  </Link>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  Login.layout = Auth;
