// components/TabBody/profileTabBody/profile.js
import SmCardBody from 'components/Cards/SmCardBody';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import PageChange from 'components/PreLoader';
import InputFields from 'components/InputFields';
import { TimeAgo } from 'utils/helperFunctions'; // Adjust path as needed


export default function Profile(props) {
  const router = useRouter()


  const logoutUser = async () => {
    await fetch('/api/logout', { method: 'POST' });
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (key.startsWith('projectLifestyle_')) {
        localStorage.removeItem(key);
      }
    }
    window.location.reload();
  }

  const IconComponent = (params) => {
    return (<>
      <span className={`flex items-center justify-center w-10 h-10 shrink-0 rounded-full bg-black text-black `} >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-white">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      </span>
    </>)
  }

  const customComponentGroups = (params) => {

    return (<> {params.data.groups.length} </>)
  }

  const customComponentFriends = (params) => {

    return (<> {params.data.friends.length} </>)
  }

  const customComponentCreatedAt = (params) => {

    return (<> {TimeAgo(params.data.createdAt)} </>)
  }

  const ActionsComponent = (params) => {
    return (<>
      <div className='flex items-center justify-center gap-1'>
        <InputFields.GridButton type="EDIT" title="Edit" onClick={() => { props._as.setModalToggle(router.route); params.setFormData(params.data) }} className="size-6 hover:cursor-pointer" />
        <InputFields.GridButton type="ARROW" title="" onClick={() => { params.setReadMore(params.readMore == params.index + 'i' ? null : params.index + 'i') }} className={`w-5 h-5 hover:cursor-pointer  text-black ${params.readMore == params.index + 'i' ? "rotate-90" : ""}`} />
      </div>
    </>);

  }


  return (<>
    <SmCardBody columns={['name', 'email', 'totalGroups', 'totalFriends', 'createdAt']} setFormData={props._as.setUserData} columnComponents={["", "", customComponentGroups, customComponentFriends, customComponentCreatedAt]} ActionsComponent={ActionsComponent} IconComponent={IconComponent} _as={props._as} gridApi={process.env.SERVER_API + "/api/users"} gridData={props._as.user} />

    <div role="button" onClick={() => { logoutUser() }}
      className=" md:hidden my-6 hover:cursor-pointer bg-black text-white  border-2 border-gray-300  flex items-center justify-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start  hover:text-red-400  hover:text-blue-gray-900 focus:bg-gray-100 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-gray-100 active:bg-opacity-80 active:text-blue-gray-900">
      <div className="grid mr-4 place-items-center">

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 0 1-3.6 9.75m6.633-4.596a18.666 18.666 0 0 1-2.485 5.33" />
        </svg>

      </div>
      Log Out
    </div>
  </>)

}


