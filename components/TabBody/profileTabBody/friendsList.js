import GridBody from 'components/Cards/GridBody';
import SmCardBody from 'components/Cards/SmCardBody';
import InputFields from 'components/InputFields';
import FetchAPI from 'controllers/fetchAPI';
import React, { useEffect, useState } from 'react';
import HeroIcon, { heroIconsNames } from 'utils/heroIcon';

function FriendsList(props) {
  const [windowWidth, setWindowWidth] = useState(null);
  const [userData, setUserData] = useState({}); 

  useEffect(() => {
    let tempData = props?._as?.user;
    setUserData(tempData);
  }, [props._as.user]);
  


  useEffect(() => {
      setWindowWidth(window.outerWidth)
  },[]) 

  const IconComponent = (params) => {
    return(<>
        <span className={`flex items-center justify-center w-10 h-10 shrink-0 rounded-full bg-black text-black `} >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-white">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
          </svg>     
        </span>
      </>)
  }

  const columnComponentStatus = (params) => {
      
    return( <div className=' w-full h-full flex items-center justify-start md:justify-center'><div className={`  flex items-center justify-center bg-black text-white px-2 py-2  rounded-lg max-h-6 `}> {params.data.status}  </div></div> )
  }

  const columnComponentName = (params) => {
    
    return( <> {params.data.requester.name} </> )
  }

  const columnComponentEmail = (params) => {
    
    return( <> {params.data.requester.email} </> )
  }
  
  const ActionsComponent = (params) => {

    const handleAction = async (method,data) => {
        try {
            const response = await FetchAPI('/api/receiveFriendReq', method, data);
        //   console.log("Action successful:", response);
            params.setPreLoader(false)
            params._as.setReloadChild(Math.random())
        } catch (error) {
            console.error("Error deleting data:", error);
        }

    };


    
    return (<>
              <div   className="flex items-center justify-center text-transparent md:gap-4">.
                <InputFields.GridButton type="ADD_USER" title={"Accept"} onClick={()=>{params.setPreLoader(true);handleAction("POST",{"userId":params._as.user._id,"friendId":params.data.requester._id,'action':"ACCEPTED"})}} className={params.data.status == "ACCEPTED" ? "invisible" : "visible"} />
                <InputFields.GridButton type="RM_USER" title={"Reject"} onClick={()=>{params.setPreLoader(true);handleAction("POST",{"userId":params._as.user._id,"friendId":params.data.requester._id,'action':"REJECTED"})}} className={params.data.status == "REJECTED" ? "invisible" : "visible"} />
                <InputFields.GridButton type="DELETE" title={"Delete"} onClick={()=>{params.setPreLoader(true);handleAction("POST",{"userId":params._as.user._id,"friendId":params.data.requester._id,'action':"DELETE"})}} className={"flex items-center justify-center gap-2 hover:cursor-pointer text-black font-semibold"} />
                <InputFields.GridButton type="ARROW" title={""} onClick={()=>{params.setReadMore(params.readMore==params.index+'i'?null:params.index+'i')}} className={`w-5 h-5 md:hidden  text-black ${params.readMore == params.index+'i' ?"rotate-90":""}`} />
              </div>
        </>);
  };



  if(windowWidth<700){
    return(<>
      <SmCardBody columns = {['name','email','status']} setFormData={props._as.setUserData} columnComponents = {[columnComponentName,columnComponentEmail,columnComponentStatus]} ActionsComponent = {ActionsComponent} IconComponent={IconComponent}  _as = {props._as} gridData={props._as.user.friends}   />
    </>)
  }else{
    return (<>
      <GridBody columns = {['name','email','request']} columnComponents = {[columnComponentName,columnComponentEmail,columnComponentStatus]} ActionsComponent = {ActionsComponent}   _as = {props._as} gridData={userData.friends}  />
    </>);
  }
  
}

export default FriendsList;