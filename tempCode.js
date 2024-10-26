switch(router.route){

    case "/admin/dashboard" : return(<>
      {/* Navbar */}
      <nav className=" pt-10 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <a
            className={` text-black text-lg uppercase hidden ${props.sidebarToggle? "ml-0":"ml-14"} lg:inline-block font-bold `}
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            {
              NavTitle[router.route]
            
            }
            
          </a>
         
          <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                  <li className="mr-2" onClick={()=>{props.setDashboardTab(0)}}>
                      <a href="#" aria-current="page" className={`inline-block p-4 ${props.dashboardTab == 0 ? "text-white bg-gray-900 active" : "text-gray-500 hover:text-gray-600 hover:bg-gray-100  " }  rounded-t-lg  dark:bg-gray-800 `}>Contact List</a>
                  </li>
                  <li className="mr-2" onClick={()=>{props.setDashboardTab(1)}}>
                      <a href="#" className={`inline-block p-4 rounded-t-lg   ${props.dashboardTab == 1 ? "text-white bg-gray-900 active" : "text-gray-500 hover:text-gray-600 hover:bg-gray-100 " }   `}>Admission Enquiry</a>
                  </li>
                  <li className="mr-2" onClick={()=>{props.setDashboardTab(2)}}>
                      <a href="#" className={`inline-block p-4 rounded-t-lg ${props.dashboardTab == 2 ? "text-white bg-gray-900 active" : "text-gray-500 hover:text-gray-600 hover:bg-gray-100 " } `}>News Letters</a>
                  </li>
                 
              </ul>
          
          
        </div>
      </nav>
      {/* End Navbar */}
    </>);
    case "/admin/alumniManagement" : return(<>
      {/* Navbar */}
      <nav className="absolute top-10 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <a
            className={` text-black text-lg uppercase hidden ${props.sidebarToggle? "ml-0":"ml-14"} lg:inline-block font-bold `}
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            {
              NavTitle[router.route]
            
            }
            
          </a>
         

          <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                  <li className="mr-2" onClick={()=>{props.setAlumniTab(0)}}>
                      <a href="#" aria-current="page" className={`inline-block p-4 ${props.alumniTab == 0 ? "text-white bg-gray-900 active" : "text-gray-500 hover:text-gray-600 hover:bg-gray-100  " }  rounded-t-lg  dark:bg-gray-800 `}>Alumni List</a>
                  </li>
                  <li className="mr-2" onClick={()=>{props.setAlumniTab(1)}}>
                      <a href="#" className={`inline-block p-4 rounded-t-lg   ${props.alumniTab == 1 ? "text-white bg-gray-900 active" : "text-gray-500 hover:text-gray-600 hover:bg-gray-100 " }   `}>Activities</a>
                  </li>
                  <li className="mr-2" onClick={()=>{props.setAlumniTab(2)}}>
                      <a href="#" className={`inline-block p-4 rounded-t-lg ${props.alumniTab == 2 ? "text-white bg-gray-900 active" : "text-gray-500 hover:text-gray-600 hover:bg-gray-100 " } `}>Achivements</a>
                  </li>
                  <li className="mr-2" onClick={()=>{props.setAlumniTab(3)}}>
                      <a href="#" className={`inline-block p-4 rounded-t-lg ${props.alumniTab == 3 ? "text-white bg-gray-900 active" : "text-gray-500 hover:text-gray-600 hover:bg-gray-100 " } `}>Gallery</a>
                  </li>
                  <li>
                  <div className="text-center ">
              <button
                className="bg-white flex items-center gap-3 text-black active:bg-slate-200 text-sm font-medium  px-6 py-4 rounded-full  hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-fit ease-linear transition-all duration-150"
                type="submit"
              onClick={()=>{props.setModalToggle(router.route)}}
              >
                <div>
                  {props.alumniTab == 0 ? "Add Alumni" : props.alumniTab == 1 ? "Add Activities" : props.alumniTab == 2 ? "Add Achievements" : "Add Images"}
               
                </div>
                
                <div>

                <svg xmlns="http://www.w3.org/2000/svg" className="text-[#F0BD66] w-4 h-4 font-block" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>

                </div>

              </button>
            
            </div>                  </li>
              </ul>
          
        </div>
      </nav>
      {/* End Navbar */}
    </>);
     case "/admin/settings" : return(<>
      {/* Navbar */}
      <nav className="absolute top-10 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <a
            className={` text-black text-lg uppercase hidden ${props.sidebarToggle? "ml-0":"ml-14"} lg:inline-block font-bold `}
            href="#pablo"
            onClick={(e) => e.preventDefault()}
            
          >
            {
              NavTitle[router.route]
            
            }
            
          </a>
         
          <div className="text-center ">
              <button
                className="bg-white flex items-center gap-3 text-black active:bg-slate-200 text-sm font-medium  px-6 py-4 rounded-full  hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-fit ease-linear transition-all duration-150"
                type="submit"
              // onClick={()=>{props.setModalToggle(router.route);props.setSettingsEdit(1)}}
              onClick={()=>{alert("PLEASE CONTACT SUPER ADMIN FOR ACCOUNT MANAGEMENT")}}
              >
                <div>
                Edit Profile
                </div>
                
                <div>

                
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="text-[#F0BD66] w-4 h-4 font-block">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
</svg>

                </div>

              </button>
            
            </div>
          
          
        </div>
      </nav>
      {/* End Navbar */}
    </>); 
    default : return(<>
      {/* Navbar */}
      <nav className="absolute top-10 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <a
            className={` text-black text-lg uppercase hidden ${props.sidebarToggle? "ml-0":"ml-14"} lg:inline-block font-bold `}
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            {
              NavTitle[router.route]
            
            }
            
          </a>
         
            <div className="text-center ">
              <button
                className="bg-white flex items-center gap-3 text-black active:bg-slate-200 text-sm font-medium  px-6 py-4 rounded-full  hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-fit ease-linear transition-all duration-150"
                type="submit"
                onClick={()=>{props.setModalToggle(router.route)}}
              >
                <div>
                  Add Data
                </div>
              
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="text-[#F0BD66] w-4 h-4 font-block" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </div>
              </button>
            </div>
          
          
        </div>
      </nav>
      {/* End Navbar */}
    </>);

  }