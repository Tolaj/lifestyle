import React, { useEffect } from "react";
import Modal from "../components/Modal";
import HeroIcon, { heroIcons, heroIconsNames }  from 'utils/heroIcon';
import Colors from "utils/colors";

function CategoryListModal(props) {



  const formFields =[
      {
        "type":"text",
        "name":"name",
        "label":"Name",
        "placeholder":"Jehiro"
      },
      {
        "type":"email",
        "name":"email",
        "label":"Email",
        "placeholder":"example@gmail.com"
      },
      {
        "type":"password",
        "name":"password",
        "label":"Password",
        "placeholder":"a7f@b3*7fn^47%8f@" 
      },
    ]
    return (<>
      <Modal formData = {props._as.userData} setFormData = {props._as.setUserData} _as = {props._as} formTitle = "Manage Profile" formFields = {formFields} formAPI={process.env.SERVER_API+"/api/users/"} />
  </>);
}

export default CategoryListModal;