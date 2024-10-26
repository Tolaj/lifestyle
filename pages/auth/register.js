import React from "react";

// layout for page

import Auth from "layouts/Auth.js";

export default function Register() {
  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-2/5 px-4 ">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6  bg-[#F9FAFE] border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <div className=" flex justify-center items-center ">
                    <img src="/has.png" className="px-2" alt="" /><div className="text-black  text-[45px]  font-extrabold italic ">HAS</div>
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
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-black text-center mb-9 text-lg font-medium">
                  Create a HAS account
                </div>
                <form>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      {/* Email */}
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-4 placeholder-blueGray-400 drop-shadow-sm  font-medium text-blueGray-600 bg-white rounded text-base  focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email address"
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
                      type="password"
                      className="border-0 px-3 py-4 placeholder-blueGray-400 font-medium drop-shadow-sm text-blueGray-600 bg-white rounded text-base  focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                    />
                  </div>
                  <div className="flex justify-center">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded  ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-400">
                        I agree with the{" "}
                        <a
                          href="#pablo"
                          className=" underline hover:text-lightBlue-500"
                          onClick={(e) => e.preventDefault()}
                        >
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6 ">
                    <button
                      className="bg-[#F0BD66] text-white active:bg-yellow-500 text-sm font-bold uppercase px-6 py-4 rounded-full shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-3/5 ease-linear transition-all duration-150"
                      type="button"
                    >
                      Create my account
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap justify-center -mt-9 relative ">
              <div className="">
                <a
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  
                >
                  <p className="text-blueGray-400 hover:text-blueGray-600 text-base font-medium drop-shadow-sm">Forgot password?</p>
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

Register.layout = Auth;
