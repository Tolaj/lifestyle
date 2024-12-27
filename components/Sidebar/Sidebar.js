import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import NotificationDropdown from "components/Dropdowns/NotificationDropdown.js";
import UserDropdown from "components/Dropdowns/UserDropdown.js";

export default function Sidebar(props) {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const router = useRouter();
  const [windowWidth, setWindowWidth] = useState(null);
  useEffect(() => {
      setWindowWidth(window.outerWidth)
  },[]) 

  const logoutUser = async () => {
      await fetch('/api/logout', { method: 'POST' });
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i);
        if (key.startsWith('projectLifestyle_')) {
          localStorage.removeItem(key);
        }
      }
      window.location.reload();
  }
  let disableAddButton = false
  switch (router.route) {
    case "/admin/profile":
      props._as.profileTab == 0 ? disableAddButton = true :  disableAddButton = false;
      break;
    case "/admin/products":
        props._as.productsTab == 3 || props._as.productsTab == 5 ? disableAddButton = true :  disableAddButton = false;
        break;
    // case "/admin/products":
    //     props._as.productsTab == 3 || props._as.productsTab == 5 ? disableAddButton = true :  disableAddButton = false;
    //     break;
    default:
        disableAddButton = false
      break;
  }

  return (
    <>
      {windowWidth<700?<>
        <div className="absolute bottom-0 w-screen z-50 bg-black h-16">
          <div className="fixed w-full bottom-2  p-3 px-6 mb-3  flex items-center justify-between   bg-black shadow-3xl text-white  cursor-pointer">
            {/* 1 */}
            <a href="/admin/dashboard" className="flex flex-col items-center transition ease-in duration-20 hover:text-blue-400 p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z">
                </path>
              </svg>
            </a>
            
            {/* 2 */}

            <a href="/admin/products" className="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 p-2 ">
              {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg> */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                <path fill-rule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z" clip-rule="evenodd" />
              </svg>

            </a>

            {/* 3 Action Button */}
            
            <div className="flex flex-col items-center  hover:text-blue-400 p-2 ">
              <div onClick={()=>{disableAddButton?false:props._as.setModalToggle(router.route)}} className={`absolute bottom-5 text-center flex items-center justify-center rounded-full border-4  border-[#F9FAFE] ${disableAddButton?"bg-gray-300":"bg-black"}  w-16 h-16  p-2 text-black  `}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class=" size-6 stroke-colors-white  text-white   ">
                  <path fill-rule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>

            {/* 4 */}
            <a href="/admin/finance" className="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 p-2 ">
              {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
              </svg> */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                <path d="M12 7.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
                <path fill-rule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 14.625v-9.75ZM8.25 9.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM18.75 9a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V9.75a.75.75 0 0 0-.75-.75h-.008ZM4.5 9.75A.75.75 0 0 1 5.25 9h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75V9.75Z" clip-rule="evenodd" />
                <path d="M2.25 18a.75.75 0 0 0 0 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 0 0-.75-.75H2.25Z" />
              </svg>

            </a>

            {/* 5 */}
            <a href="/admin/profile" className="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 p-2 ">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z">
                </path>
              </svg>
            </a>
          </div>
        </div>
        </>:<>
        <div className="relative overflow-y-auto  h-screen w-full max-w-[18rem] flex-col rounded-xl bg-[#F9FAFE] bg-clip-border p-4 text-gray-700 ">
        <div className="flex items-center justify-evenly gap-4 p-4  mt-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
          </svg>
          <h5 className="block font-sans font-extrabold text-3xl antialiased  leading-snug tracking-normal text-blue-gray-900">
            Lifestyle
          </h5>
          <div className="md:hidden" onClick={()=>{props._as.setSidebarToggle(0)}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>

          </div>
        </div>

        {/* ----- */}

        <nav className="flex min-w-[240px] mt-10 flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
          <div className="relative block w-full">
            {props._ac.map((sideBarTab,index)=>{

              if(index == props._ac.length - 3) return  <hr className="my-2 border-blue-gray-50" />
                return(<>
                  <div className="overflow-hidden">
                    <div className="block w-full py-1 font-sans text-sm antialiased font-light leading-normal text-gray-700">
                      <nav className="flex min-w-[240px] flex-col gap-1 p-0 font-sans text-base font-normal text-blue-gray-700">
                        <a 
                            href={sideBarTab.route}
                          className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-gray-100 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-gray-100 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-gray-100 active:bg-opacity-80 active:text-blue-gray-900">
                          <div className="grid mr-4 place-items-center">
                        

                          </div>
                          {sideBarTab.title}
                          <div className="grid ml-auto place-items-center justify-self-end">
                            <div
                              className="relative grid items-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-full select-none whitespace-nowrap bg-gray-1000/20 text-blue-gray-900">
                              <span className="">2</span>
                            </div>
                          </div>
                        </a>
                      </nav>
                    </div>
                  </div>
                </>)
            })}
           
          </div>
          
         
         
        
          
          <div role="button" onClick={()=>{logoutUser()}}
            className=" hover:cursor-pointer bg-black text-white  border-2 border-gray-300  flex items-center justify-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start  hover:text-red-400  hover:text-blue-gray-900 focus:bg-gray-100 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-gray-100 active:bg-opacity-80 active:text-blue-gray-900">
            <div className="grid mr-4 place-items-center">
           
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 0 1-3.6 9.75m6.633-4.596a18.666 18.666 0 0 1-2.485 5.33" />
</svg>

            </div>
            Log Out
          </div>
        </nav>

        {/* ----------- */}
        {/* <div role="alert"
          className="relative flex w-full px-4 py-4 mt-auto text-base text-white bg-gray-900 rounded-lg font-regular">
          <div className="mr-12">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
              aria-hidden="true" className="w-12 h-12 mb-4">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25">
              </path>
            </svg>
            <h6
              className="block mb-1 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit">
              Upgrade to PRO
            </h6>
            <p className="block font-sans text-sm antialiased font-normal leading-normal text-inherit opacity-80">
              Upgrade to Material Tailwind PRO and get even more components,
              plugins, advanced features and premium.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="block font-sans text-sm antialiased font-medium leading-normal text-inherit opacity-80">
                Dismiss
              </a>
              <a href="#" className="block font-sans text-sm antialiased font-medium leading-normal text-inherit">
                Upgrade Now
              </a>
            </div>
          </div>
          <button
            className="!absolute  top-3 right-3 h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-white transition-all hover:bg-white/10 active:bg-white/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button">
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                className="w-6 h-6" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </span>
          </button>
        </div> */}
      </div>
        </>}
    </>
  );
}
