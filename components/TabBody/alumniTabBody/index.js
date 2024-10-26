import React from "react";
import AlumniList from ".alumniList";
import AlumniActivity from "./alumniActivities";
import AlumniAchivement from "./alumniAchivements";
import AlumniGallery from "./alumniGallery";

// components



// layout for page


export default function AlumniTabBody(props) {
   
    switch(props.alumniTab){
        case 0 :return (
            <>
    
            <div className="flex flex-wrap relative items-center z-0 justify-center ">
              <img src="/img/display.png" className="absolute top-0 blur-sm z-0 w-2/4" alt="" />
              <div className="h-full w-full  z-20 -mt-10  ">
    
                <AlumniList setModalToggle = {props.setModalToggle} setAlumniData={props.setAlumniData} reloadChild = {props.reloadChild}  setReloadChild ={props.setReloadChild}/>
              </div>
            </div>
               
            </>
          );
          case 1 :return (
            <>
    
            <div className="flex flex-wrap relative items-center z-0 justify-center ">
              <img src="/img/display.png" className="absolute top-0 blur-sm z-0 w-2/4" alt="" />
              <div className="h-full w-full  z-20 -mt-10 ">
        
              <AlumniActivity setModalToggle = {props.setModalToggle} setAlumniData={props.setAlumniData} reloadChild = {props.reloadChild}  setReloadChild ={props.setReloadChild}/>
              </div>
            </div>
               
            </>
          );
          case 2 :return (
            <>
    
            <div className="flex flex-wrap relative items-center z-0 justify-center ">
              <img src="/img/display.png" className="absolute top-0 blur-sm z-0 w-2/4" alt="" />
              <div className="h-full w-full  z-20 -mt-10 ">
        
              <AlumniAchivement  setModalToggle = {props.setModalToggle} setAlumniData={props.setAlumniData} reloadChild = {props.reloadChild}  setReloadChild ={props.setReloadChild}/>
              </div>
            </div>
               
            </>
          );
          case 3 :return (
            <>
    
            <div className="flex flex-wrap relative items-center z-0 justify-center ">
              <img src="/img/display.png" className="absolute top-0 blur-sm z-0 w-2/4" alt="" />
              <div className="h-full w-full  z-20 -mt-10 ">
                <AlumniGallery setModalToggle = {props.setModalToggle} setAlumniData={props.setAlumniData} reloadChild = {props.reloadChild}  setReloadChild ={props.setReloadChild}/>
              </div>
            </div>
               
            </>
          );
        default: return (
            <>
            <div className="flex flex-wrap relative items-center z-0 justify-center ">
              <img src="/img/display.png" className="absolute top-0 blur-sm z-0 w-2/4" alt="" />
              <div className="h-full w-full  z-20 top-0 ">
                  555555
              </div>
            </div>
               
            </>
          );
    }
  
}



