import React from "react";
import { useEffect, useState } from "react"

import UserDropdown from "components/Dropdowns/UserDropdown.js";
import { useRouter } from "next/router"
import { Tabs,Tab } from "./components/tabs";

export default function Navbar(props) {

    return(<>
          <Tabs >
            {props._ac.map((tab)=>{
              return <Tab _acTab = {tab} _as={props._as} />
            })}
          </Tabs>
    </>)
 
}
