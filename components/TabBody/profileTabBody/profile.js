import SmCardBody from 'components/Cards/SmCardBody';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import PageChange from 'components/PreLoader';
import InputFields from 'components/InputFields';
import { TimeAgo } from 'utils/helperFunctions'; // Adjust path as needed


export default function Profile(props)  {
  const router = useRouter()
 
 
  const IconComponent = (params) => {
    return(<>
        <span className={`flex items-center justify-center w-10 h-10 shrink-0 rounded-full bg-black text-black `} >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-white">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>      
        </span>
      </>)
  }

  const customComponentGroups = (params) => {
      
    return( <> {params.data.groups.length} </> )
  }

  const customComponentFriends = (params) => {
      
    return( <> {params.data.friends.length} </> )
  }

  const customComponentCreatedAt = (params) => {
      
    return( <> {TimeAgo(params.data.createdAt)} </> )
  }
  
  const ActionsComponent = (params) => {
    return (<>
                    <div className='flex items-center justify-center gap-1'>
                      <InputFields.GridButton type="EDIT" title="Edit" onClick={()=>{props._as.setModalToggle(router.route);params.setFormData(params.data)}} className="size-6 hover:cursor-pointer"/>
                      <InputFields.GridButton type="ARROW" title="" onClick={()=>{params.setReadMore(params.readMore==params.index+'i'?null:params.index+'i')}} className={`w-5 h-5 hover:cursor-pointer  text-black ${params.readMore == params.index+'i' ?"rotate-90":""}`} />
                    </div>
        </>);
    
  }

  
  return(<>
    <SmCardBody columns = {['name','email','totalGroups','totalFriends','createdAt']} setFormData={props._as.setUserData} columnComponents = {["","",customComponentGroups,customComponentFriends,customComponentCreatedAt]} ActionsComponent = {ActionsComponent} IconComponent={IconComponent}  _as = {props._as} gridApi = {process.env.SERVER_API+"/api/users"} gridData = {props._as.user} />
  </>)

}


