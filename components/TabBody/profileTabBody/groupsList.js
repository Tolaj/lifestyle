import GridBody from 'components/Cards/GridBody';
import SmCardBody from 'components/Cards/SmCardBody';
import InputFields from 'components/InputFields';
import FetchAPI from 'controllers/fetchAPI';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import HeroIcon, { heroIconsNames } from 'utils/heroIcon';

function GroupsList(props) {
  const [windowWidth, setWindowWidth] = useState(null);
  const [userData, setUserData] = useState({}); 
  const [groupToggle, setGroupToggle] = useState(0); 
  const dataRef = useRef();
  dataRef.current = groupToggle
  const router = useRouter()
  
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
            <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
          </svg>        
        </span>
      </>)
  }
  
  const columnComponentName = (params) => {

    return (
        <>
        <div className="flex items-center justify-start gap-2">
          {/* <div  onClick={()=>{params.paramPass.setGroupToggle((prev)=>prev!=-1?prev==params.rowIndex?-1:params.rowIndex:params.rowIndex)}}
            title="Drop down" className="hover:bg-black hover:bg-opacity-10 hover:rounded-md hover:cursor-pointer">
            
            <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class={`w-5 h-5 ${params.paramPass.groupToggle()==params.rowIndex?'rotate-90':'' } `}>
              <path fill-rule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
            </svg>
          </div> */}
          {params?.data?.name}
        </div>
        </>
    );
  };

  const columnComponentTotalMembers = (params) => {
  return (
      <>
      
      {/* ${params.paramPass.groupToggle()==params.rowIndex?'flex-col  gap-1':'flex-row'} */}
      <div className={`flex   flex-row py-1`}>
        {params.data.members.length}
      </div>
      </>
  );
  };

  const columnComponentMembers = (params) => {
    return (
        <>
        
        {/* ${params.paramPass.groupToggle()==params.rowIndex?'flex-col  gap-1':'flex-row'} */}
        <div className={`flex   flex-row items-center  h-full py-1`}>
          {params?.data?.members.map((item,index)=>{
              return(<div class="flex-shrink-0 inline-flex max-w-fit items-center px-2 py-1 mr-2 text-xs text-white bg-black rounded">
              <span className="">{item.name}</span>
            </div>)
          })}
        </div>
        </>
    );
  };

  
  const ActionsComponent = (params) => {

    const handleAction = async (method,data) => {
        try {
            const response = await FetchAPI('/api/groups', method, data);
            params.setPreLoader(false)
            params._as.setReloadChild(Math.random())
        } catch (error) {
            console.error("Error deleting data:", error);
        }

    };

    return (<>
                    <div   className="flex items-center justify-center text-transparent md:gap-4">  
                        <InputFields.GridButton title="Edit" type="EDIT"  onClick={()=>{params._as.setModalToggle(router.route);params.setFormData(params.data)}} className="w-6 h-6 text-black hover:cursor-pointer" />
                        <InputFields.GridButton title="Edit" type="DELETE"  onClick={()=>{params.setPreLoader(true);handleAction("DELETE",{"_id":params.data._id})}}  className={`flex items-center justify-center gap-2 hover:cursor-pointer text-black font-semibold`}/>
                        <InputFields.GridButton title="Edit" type="ARROW" onClick={()=>{params.setReadMore(params.readMore==params.index+'i'?null:params.index+'i')}} className={`w-5 h-5 md:hidden  text-black ${params.readMore == params.index+'i' ?"rotate-90":""}`}/>
                    </div>
        </>);
  };

  const dataFilter = (params) => {
    return params.data.filter((data) => data.name !== "ISOLATED_GROUP");
  }

  if(windowWidth<700){
    return(<>
      <SmCardBody columns = {['name','Total Members','Members']} setFormData={props._as.setGroupsData} columnComponents = {[columnComponentName,columnComponentTotalMembers,columnComponentMembers]} ActionsComponent = {ActionsComponent} IconComponent={IconComponent}  _as = {props._as} dataFilter={dataFilter} gridApi={process.env.SERVER_API+"/api/groups"}   />
    </>)
  }else{
    return (<>
      <GridBody columns = {['name','members']} columnComponents = {[columnComponentName,columnComponentMembers]} ActionsComponent = {ActionsComponent} paramPass = {{"setGroupToggle":setGroupToggle,groupToggle:()=>dataRef.current}} setFormData = {props._as.setGroupsData}  _as = {props._as} dataFilter={dataFilter} gridApi={process.env.SERVER_API+"/api/groups"}  />
    </>);
  }
  
}

export default GroupsList;