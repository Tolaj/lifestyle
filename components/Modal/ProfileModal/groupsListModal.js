import React, { useEffect, useState } from "react";
import Modal from "../components/Modal";
import FetchAPI from "controllers/fetchAPI";
import mongoose from 'mongoose';


function GroupsListModal(props) {

  const [friendList, setFriendList] = useState(); 

  useEffect(() => {
    const fetchData = async () => {
        setFriendList(props._as.user.friends);
    };

    fetchData();
  }, [props._as.reloadChild]);


  const formFields =[
    {
      "type":"text",
      "name":"name",
      "label":"Name",
      "placeholder":"Jehiro"
    },
    {
      "type":"checkBoxSelect",
      "name":"members",
      "label":"Members",
      "placeholder":"Select a member",
     "optionValues": friendList 
      ? friendList
          .filter(obj => obj?.status === "ACCEPTED")
          .map(obj => obj.requester?._id)
      : [],

    "options": friendList 
      ? friendList
          .filter(obj => obj?.status === "ACCEPTED")
          .map(obj => obj.requester.name)
      : []
    },
  
  ]
  return (<>
    <Modal formData = {props._as.groupsData} setFormData = {props._as.setGroupsData} _as = {props._as} additionalData = {{"userId":props._as.user._id}} formTitle = "Create a Group" formFields = {formFields} formAPI={process.env.SERVER_API+"/api/groups/"} style="" />
  </>);
}

export default GroupsListModal;