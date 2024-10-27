import React from "react";
import { useRouter } from "next/router"

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";
import Modal from "components/Modal";
import useDynamicState from "../utils/dynamicState";
import TabBody from "components/TabBody";

export default function Admin({ children }) {

  const router = useRouter()

  let _as = useDynamicState(
    'modalToggle',
    'reloadChild',
    'alumni',
    'dashboard',
    'shopping',
    'products',
    'category',
    'sidebarToggle'
  )

  let _ac = [
      {
        title: "Dashboard",
        route: "/admin/dashboard",
        tabSections: ["code Template","Test Cases","Documentation"],
        tabButtons : [],
        setActiveTabSection: _as.setDashboardTab,
        activeTabSection: _as.dashboardTab,
        setModalToggle: _as.setModalToggle,
        tabButtonType:[]

      },
      { title: "Shopping", 
        route: "/admin/shopping", 
        tabSections: [],
        tabButtons : [],
        tabButtonType:[],
        setActiveTabSection: _as.setShoppingTab,
        activeTabSection: _as.shoppingTab,
        setModalToggle: _as.setModalToggle,
      }, 
      { 
        title: "Products", 
        route: "/admin/products",
        tabSections: ["Products List","Category"],
        tabButtons : [["Add Item"],["Add Category"],[]],
        tabButtonType:[["ADD_BUTTON"],["ADD_BUTTON"],[]],
        setActiveTabSection: _as.setProductsTab,
        activeTabSection: _as.productsTab,
        setModalToggle: _as.setModalToggle,
      }
    ]

  return (

    <div className={`flex  h-fit  bg-[#f9fafeb3] `}>
      <div className={` ${_as.sidebarToggle?"absolute md:relative z-50":"hidden md:block"} `}>
        <Sidebar _ac={_ac} _as={_as} />
      </div>
      <div className="flex flex-col  w-full h-full ">
        {/* admin header nav */}
        <AdminNavbar _ac={_ac} _as={_as} />
        {/* admin body */}
        <div className="   bg-opacity-50 flex-grow  p-4    max-w-full  flex flex-col  justify-between  ">
          <div className="  bg-[#f9fafeb3] h-full w-full rounded-3xl p-3">
            {/* below comment is to use pages/page as child component */}

            {/* {React.Children.map(children, (child) => {
              return React.cloneElement(child, { _as: _as });
            })} */}


          <TabBody  _as = {_as} /> 

          <Modal _as = {_as} />

          </div>
        </div>
        <div className="md:block hidden">
          <FooterAdmin />
        </div>
      </div>
    </div>

  );
}
