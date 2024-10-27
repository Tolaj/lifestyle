import React, { useEffect } from "react";
import Modal from "../components/Modal";
import HeroIcon, { heroIcons, heroIconsNames }  from 'utils/heroIcon';
import Colors from "utils/colors";

function CategoryListModal(props) {

  let iconList = heroIconsNames.map((heroIcon,index)=>{
    return(<>
        <HeroIcon style="" iconTitle = {heroIconsNames[index]} />
        </>)
  })

  iconList = [<></>,...iconList]
  let heroIconsNamesVal = ['',...heroIconsNames]
  

  const colors  = [
    
    'bg-red-100',
    'bg-red-200',
    'bg-red-300',
    'bg-red-400',
    'bg-red-500',
    'bg-red-600',
    'bg-blue-100',
    'bg-blue-200',
    'bg-blue-300',
    'bg-blue-400',
    'bg-blue-500',
    'bg-blue-600',
    'bg-green-100',
    'bg-green-200',
    'bg-green-300',
    'bg-green-400',
    'bg-green-500',
    'bg-green-600',
    'bg-yellow-100',
    'bg-yellow-200',
    'bg-yellow-300',
    'bg-yellow-400',
    'bg-yellow-500',
    'bg-yellow-600',
    'bg-purple-100',
    'bg-purple-200',
    'bg-purple-300',
    'bg-purple-400',
    'bg-purple-500',
    'bg-purple-600',
    'bg-teal-100',
    'bg-teal-200',
    'bg-teal-300',
    'bg-teal-400',
    'bg-teal-500',
    'bg-teal-600',
    ];

  const coloredDisks = Colors.map((color, index) => (
    <div className={`${color} rounded-full w-4 h-4 `}></div>
  ));

  const formFields =[
      {
        "type":"text",
        "name":"name",
        "label":"Name",
        "placeholder":"Jehiro"
      },
      {
        "type":"text",
        "name":"description",
        "label":"Description",
        "placeholder":"Milk for Jehiro from Walmart"
      },
      {
        "type":"customSelect",
        "name":"color",
        "label":"Color",
        "placeholder":"Select a Color",
        "optionValues": colors,
        "options": coloredDisks
      },
      {
        "type":"customSelect",
        "name":"icon",
        "label":"Icon",
        "placeholder":"Select a Icon",
        "optionValues": heroIconsNamesVal,
        "options" : iconList
      },
    ]
    return (<>
      <Modal formData = {props._as.categoryData} setFormData = {props._as.setCategoryData} _as = {props._as} formTitle = "Create a Category" formFields = {formFields} formAPI={process.env.SERVER_API+"/api/categories/"} />
  </>);
}

export default CategoryListModal;