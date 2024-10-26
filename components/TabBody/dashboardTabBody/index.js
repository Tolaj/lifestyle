import React from "react";
import ContactList from "./contactList";
import AdmissionEnquiry from "./admissionEnquiry";
import NewsLetters from "./newsLetters";
import CreateProject from "./createProject";
// components



// layout for page


export default function DashboardTabBody(props) {
   
    switch(props._as.dashboardTab){
        case 0 :return (
            <>
    
  

            <CreateProject _as = {props._as} reloadChild = {props._as.reloadChild}  setReloadChild ={props._as.setReloadChild} />
               
            </>
          );
          case 1 :return (
            <>
    
    <CreateProject _as = {props._as} reloadChild = {props._as.reloadChild}  setReloadChild ={props._as.setReloadChild} />
               
            </>
          );
          case 2 :return (
            <>
    
    <CreateProject _as = {props._as} reloadChild = {props._as.reloadChild}  setReloadChild ={props._as.setReloadChild} />
               
            </>
          );
        default: return(<>Default Tab Body</>)
    }
  
}



