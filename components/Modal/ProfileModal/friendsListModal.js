import React, { useEffect } from "react";
import Modal from "../components/Modal";
import HeroIcon, { heroIcons, heroIconsNames }  from 'utils/heroIcon';
import Colors from "utils/colors";

function FriendsListModal(props) {

  const formFields =[
      {
        "type":"email",
        "name":"friendEmail",
        "label":"Email",
        "placeholder":"user@example.com"
      },

    ]
    return (<>
      <Modal formData = {props._as.user} _as = {props._as} formTitle = "Send a friend request" formFields = {formFields} formAPI={process.env.SERVER_API+"/api/sendFriendReq/"} />
  </>);
}

export default FriendsListModal;