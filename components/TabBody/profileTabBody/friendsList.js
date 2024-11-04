import GridBody from 'components/Cards/GridBody';
import SmCardBody from 'components/Cards/SmCardBody';
import FetchAPI from 'controllers/fetchAPI';
import React, { useEffect, useState } from 'react';
import HeroIcon, { heroIconsNames } from 'utils/heroIcon';

function FriendsList(props) {
  const [windowWidth, setWindowWidth] = useState(null);
  const [userData, setUserData] = useState({}); 

  useEffect(() => {
    let tempData = props?._as?.userData;
    setUserData(tempData);
  }, [props._as.userData]);
  


  useEffect(() => {
      setWindowWidth(window.outerWidth)
  },[]) 

  const customComponentName = (params) => {
      
    return( <> {params.requester.name} </> )
  }

  const customComponentEmail = (params) => {
      
    return( <> {params.requester.email} </> )
  }
  
  const customComponentActions = (params) => {
      
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
                  <div   className="flex items-center justify-center text-transparent  gap-2 z-99 fixed left-40   bg-white  bg-opacity-50 right-0">.
                    
                    <div title="Accept" onClick={()=>{params.setPreLoader(true);handleAction("POST",{"userId":params._as.userData._id,"friendId":params.data.requester._id,'action':"ACCEPTED"})}}  className={`${params.data.status == "ACCEPTED" ? "hidden" : "visible "}`} >

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-black hover:cursor-pointer">
                          <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
                        </svg>

                    </div>

                    <div title="Reject" onClick={()=>{params.setPreLoader(true);handleAction("POST",{"userId":params._as.userData._id,"friendId":params.data.requester._id,'action':"REJECTED"})}}  className={`${params.data.status == "REJECTED" ? "hidden" : "visible "}`} >
                        
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-black hover:cursor-pointer">
                          <path d="M10.375 2.25a4.125 4.125 0 1 0 0 8.25 4.125 4.125 0 0 0 0-8.25ZM10.375 12a7.125 7.125 0 0 0-7.124 7.247.75.75 0 0 0 .363.63 13.067 13.067 0 0 0 6.761 1.873c2.472 0 4.786-.684 6.76-1.873a.75.75 0 0 0 .364-.63l.001-.12v-.002A7.125 7.125 0 0 0 10.375 12ZM16 9.75a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5h-6Z" />
                        </svg>


                    </div>
                     
                      
                      <div title="Delete" onClick={()=>{params.setPreLoader(true);handleAction("POST",{"userId":params._as.userData._id,"friendId":params.data.requester._id,'action':"DELETE"})}}  className={`flex items-center justify-center gap-2 hover:cursor-pointer text-black font-semibold`}>
                          
                          <svg className="w-6 h-6 text-black hover:cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" >
                            <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                          </svg>

                      </div> 

                      <svg onClick={()=>{params.setReadMore(params.readMore==params.index+'i'?null:params.index+'i')}} className={`w-5 h-5  text-black ${params.readMore == params.index+'i' ?"rotate-90":""}`} xmlns="http://www.w3.org/2000/svg"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" >
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M9 6l6 6l-6 6"></path>
                                    </svg>

                  </div>
      </>);
  
}


  if(windowWidth<700){
    return(<>
      <SmCardBody columns = {['name','email','status']} setFormData={props._as.setUserData} customComponents = {[customComponentName,customComponentEmail,""]} customComponentActions = {customComponentActions}  _as = {props._as} gridData={props._as.userData}   />
    </>)
  }else{
  
    const columnComponentStatus = (params) => {
      
      return( <div className='flex items-center justify-center w-full h-full'><div className={` items-center flex justify-center bg-black text-white px-2 py-2  rounded-lg max-h-6 `}> {params.data.status}  </div></div> )
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
                      <div   className="flex items-center justify-center text-transparent gap-4">.
                        
                        <div title="Accept" onClick={()=>{params.setPreLoader(true);handleAction("POST",{"userId":params._as.userData._id,"friendId":params.data.requester._id,'action':"ACCEPTED"})}}  className={`${params.data.status == "ACCEPTED" ? "invisible" : "visible"}`} >

                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-black hover:cursor-pointer">
                              <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
                            </svg>

                        </div>

                        <div title="Reject" onClick={()=>{params.setPreLoader(true);handleAction("POST",{"userId":params._as.userData._id,"friendId":params.data.requester._id,'action':"REJECTED"})}}  className={`${params.data.status == "REJECTED" ? "invisible" : "visible"}`} >
                            
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-black hover:cursor-pointer">
                              <path d="M10.375 2.25a4.125 4.125 0 1 0 0 8.25 4.125 4.125 0 0 0 0-8.25ZM10.375 12a7.125 7.125 0 0 0-7.124 7.247.75.75 0 0 0 .363.63 13.067 13.067 0 0 0 6.761 1.873c2.472 0 4.786-.684 6.76-1.873a.75.75 0 0 0 .364-.63l.001-.12v-.002A7.125 7.125 0 0 0 10.375 12ZM16 9.75a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5h-6Z" />
                            </svg>

  
                        </div>
                         
                          
                          <div title="Delete" onClick={()=>{params.setPreLoader(true);handleAction("POST",{"userId":params._as.userData._id,"friendId":params.data.requester._id,'action':"DELETE"})}}  className={`flex items-center justify-center gap-2 hover:cursor-pointer text-black font-semibold`}>
                              
                              <svg className="w-6 h-6 text-black hover:cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" >
                                <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                              </svg>
  
                          </div> 
    
                      </div>
          </>);
    };

    return (<>
      <GridBody columns = {['name','email','request']} columnComponents = {[columnComponentName,columnComponentEmail,columnComponentStatus]} ActionsComponent = {ActionsComponent}   _as = {props._as} gridData={userData.friends}  />
    </>);
  }
  
}

export default FriendsList;