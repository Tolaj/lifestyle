// components/Modal/ProductsModal/categoryListModal.js
import React, { useEffect } from "react";
import Modal from "../components/Modal";
import HeroIcon, { heroIcons, heroIconsNames } from 'utils/heroIcon';
import Colors from "utils/colors";

function CategoryListModal(props) {

  let iconList = heroIconsNames.map((heroIcon, index) => {
    return (<>
      <HeroIcon style="" iconTitle={heroIconsNames[index]} />
    </>)
  })

  iconList = [<></>, ...iconList]
  let heroIconsNamesVal = ['', ...heroIconsNames]


  const coloredDisks = Colors.map((color, index) => (
    <div className={`${color} rounded-full w-4 h-4 `}></div>
  ));

  const formFields = [
    {
      "type": "text",
      "name": "name",
      "label": "Name",
      "placeholder": "Jehiro"
    },
    {
      "type": "text",
      "name": "description",
      "label": "Description",
      "placeholder": "Milk for Jehiro from Walmart"
    },
    {
      "type": "customSelect",
      "name": "color",
      "label": "Color",
      "placeholder": "Select a Color",
      "optionValues": Colors,
      "options": coloredDisks
    },
    {
      "type": "customSelect",
      "name": "icon",
      "label": "Icon",
      "placeholder": "Select a Icon",
      "optionValues": heroIconsNamesVal,
      "options": iconList
    },
  ]
  return (<>
    <Modal formData={props._as.categoryData} setFormData={props._as.setCategoryData} _as={props._as} formTitle="Create a Category" additionalData={{ "groupId": typeof window !== 'undefined' ? localStorage.getItem("projectLifestyle_activeGroup") : '' }} formFields={formFields} formAPI={process.env.SERVER_API + "/api/categories/"} />
  </>);
}

export default CategoryListModal;