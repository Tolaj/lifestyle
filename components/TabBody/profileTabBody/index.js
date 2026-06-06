// components/TabBody/profileTabBody/index.js
import React from "react";
import MyProfile from "./profile";
import FriendsList from "./friendsList";
import GroupsList from "./groupsList";
import TemplateTab from "./templateTab";

// components



// layout for page


export default function ProfileTabBody(props) {

    return (<>
        {props._as.profileTab == 0 && <MyProfile _as={props._as} reloadChild={props._as.reloadChild} setReloadChild={props._as.setReloadChild} />}
        {props._as.profileTab == 1 && <FriendsList _as={props._as} reloadChild={props._as.reloadChild} setReloadChild={props._as.setReloadChild} />}
        {props._as.profileTab == 2 && <GroupsList _as={props._as} reloadChild={props._as.reloadChild} setReloadChild={props._as.setReloadChild} />}
        {props._as.profileTab == 3 && <TemplateTab _as={props._as} reloadChild={props._as.reloadChild} setReloadChild={props._as.setReloadChild} />}

    </>)


}



