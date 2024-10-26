import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import NotificationDropdown from "components/Dropdowns/NotificationDropdown.js";
import UserDropdown from "components/Dropdowns/UserDropdown.js";

export default function Sidebar(props) {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const router = useRouter();

  return (
    <>
      <div className="relative overflow-y-auto  h-screen w-full max-w-[30rem] flex-col rounded-xl bg-[#F9FAFE] bg-clip-border p-4 text-gray-700 ">
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
          {/* <div className="relative block w-full">
            <div role="button"
              className="flex items-center w-full p-0 leading-tight transition-all rounded-lg outline-none text-start hover:bg-gray-100 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-gray-100 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-gray-100 active:bg-opacity-80 active:text-blue-gray-900">
              <button type="button"
                className="flex items-center justify-between w-full p-3 font-sans text-xl antialiased font-semibold leading-snug text-left transition-colors border-b-0 select-none border-b-blue-gray-100 text-blue-gray-700 hover:text-blue-gray-900">
                <div className="grid mr-4 place-items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                    className="w-5 h-5">
                    <path fill-rule="evenodd"
                      d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z"
                      clip-rule="evenodd"></path>
                  </svg>
                </div>
                <p className="block mr-auto font-sans text-base antialiased font-normal leading-relaxed text-blue-gray-900">
                  E-Commerce
                </p>
                <span className="ml-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5"
                    stroke="currentColor" aria-hidden="true" className="w-4 h-4 mx-auto transition-transform">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
                  </svg>
                </span>
              </button>
            </div>
            <div className="overflow-hidden">
              <div className="block w-full py-1 font-sans text-sm antialiased font-light leading-normal text-gray-700">
                <nav className="flex min-w-[240px] flex-col gap-1 p-0 font-sans text-base font-normal text-blue-gray-700">
                  <div role="button"
                    className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-gray-100 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-gray-100 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-gray-100 active:bg-opacity-80 active:text-blue-gray-900">
                    <div className="grid mr-4 place-items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3"
                        stroke="currentColor" aria-hidden="true" className="w-5 h-3">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"></path>
                      </svg>
                    </div>
                    Orders
                  </div>
                  <div role="button"
                    className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-gray-100 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-gray-100 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-gray-100 active:bg-opacity-80 active:text-blue-gray-900">
                    <div className="grid mr-4 place-items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3"
                        stroke="currentColor" aria-hidden="true" className="w-5 h-3">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"></path>
                      </svg>
                    </div>
                    Products
                  </div>
                </nav>
              </div>
            </div>
          </div> */}
          <hr className="my-2 border-blue-gray-50" />
          <div role="button"
            className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-gray-100 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-gray-100 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-gray-100 active:bg-opacity-80 active:text-blue-gray-900">
            <div className="grid mr-4 place-items-center">
            

            </div>
            Documentation
            <div className="grid ml-auto place-items-center justify-self-end">
              <div
                className="relative grid items-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-full select-none whitespace-nowrap bg-gray-1000/20 text-blue-gray-900">
                <span className="">14</span>
              </div>
            </div>
          </div>
          <div role="button"
            className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-gray-100 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-gray-100 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-gray-100 active:bg-opacity-80 active:text-blue-gray-900">
            <div className="grid mr-4 place-items-center">
         

            </div>
            Profile
          </div>
          {/* <div role="button"
            className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-gray-100 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-gray-100 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-gray-100 active:bg-opacity-80 active:text-blue-gray-900">
            <div className="grid mr-4 place-items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                className="w-5 h-5">
                <path fill-rule="evenodd"
                  d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                  clip-rule="evenodd"></path>
              </svg>
            </div>
            Settings
          </div> */}
          <div role="button"
            className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-gray-100 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-gray-100 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-gray-100 active:bg-opacity-80 active:text-blue-gray-900">
            <div className="grid mr-4 place-items-center">
           

            </div>
            Log Out
          </div>
        </nav>

        {/* ----------- */}
        <div role="alert"
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
        </div>
      </div>
    </>
  );
}
