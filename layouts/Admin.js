import React, { useEffect } from "react";
import { useRouter } from "next/router"
import { parse } from 'cookie';
import { verify } from 'jsonwebtoken';
// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";
import Modal from "components/Modal";
import useDynamicState from "../utils/dynamicState";
import TabBody from "components/TabBody";
import useSession from "utils/useSession";
import FetchAPI from "controllers/fetchAPI";
import PageChange from "components/PreLoader";


export default function Admin({ children }) {

  const router = useRouter()
  const { sessionData, loading } = useSession();

  let _as = useDynamicState(
    'modalToggle',
    'reloadChild',
    'alumni',
    'dashboard',
    'shopping',
    'products',
    'category',
    'sidebarToggle',
    'orders',
    'inventory',
    'resourcePlans',
    'wishLists',
    'cart',
    'profile',
    'user'
  )

  useEffect(() => {
    const fetchData = async () => {
        if (!sessionData) return; // Exit if no session data
        
        try {
            const res = await FetchAPI('/api/users', "GET", sessionData.user);
            _as.setUserData(res);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    fetchData(); // Call the fetch function
}, [sessionData, _as.reloadChild]); 
  



  let _ac = [
      {
        title: "Dashboard",
        route: "/admin/dashboard",
        tabSections: ["code Template","Test Cases","Documentation"],
        tabButtons : [],
        setActiveTabSection: _as.setDashboardTab,
        activeTabSection: _as.dashboardTab,
        setModalToggle: _as.setModalToggle,
      },
      
      { 
        title: "Products", 
        route: "/admin/products",
        tabSections: ["Products List","Category","Wish List","Inventory","Resource Plan","Orders"],
        tabButtons:[["ADD","CART"],["ADD","CART"],["ADD","CART"],["CART"],["ADD","CART"],["CART"]],
        setActiveTabSection: _as.setProductsTab,
        activeTabSection: _as.productsTab,
        setModalToggle: _as.setModalToggle,
      },

      { title: "Finance", 
        route: "/admin/finance", 
        tabSections: [],
        tabButtons : [],
        setActiveTabSection: _as.setFinanceTab,
        activeTabSection: _as.financeTab,
        setModalToggle: _as.setModalToggle,
      },
      {},
      { title: "Documentation", 
        route: "/admin/documentation", 
        tabSections: [],
        tabButtons : [],
        setActiveTabSection: _as.setShoppingTab,
        activeTabSection: _as.shoppingTab,
        setModalToggle: _as.setModalToggle,
      },
      { title: "Profile", 
        route: "/admin/profile", 
        tabSections: ["My Profile","Friends","Groups"],
        tabButtons : [["CART"],["ADD","CART"],["ADD","CART"]],
        setActiveTabSection: _as.setProfileTab,
        activeTabSection: _as.profileTab,
        setModalToggle: _as.setModalToggle,
      },

    ]



  return (

    <div className={`flex  h-fit  bg-[#F9FAFE] `}>
      {/* <div className={` ${_as.sidebarToggle?"absolute md:relative z-50":"hidden md:block"} `}> */}
        <Sidebar _ac={_ac} _as={_as} />
      {/* </div> */}
      <div className="flex flex-col  w-full h-screen ">
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
