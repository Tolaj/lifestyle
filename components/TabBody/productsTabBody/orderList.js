import GridBody from 'components/Cards/GridBody';
import SmCardBody from 'components/Cards/SmCardBody';
import React, { useEffect, useState } from 'react';
import HeroIcon, { heroIconsNames } from 'utils/heroIcon';

function OrderList(props) {
  const [windowWidth, setWindowWidth] = useState(null);

  useEffect(() => {
      setWindowWidth(window.outerWidth)
  },[]) 

  
  const dataFilter = (params) => {
    let myGroup = params?._as?.user?.groups?.find((data) => data._id === localStorage.getItem('projectLifestyle_activeGroup'))
    return params.data.filter((data) => myGroup.orders.includes(data._id));
  }

  const IconComponent = (params) => {
    return(<>
        <span className={`flex items-center justify-center w-10 h-10 shrink-0 rounded-full ${params.data?.color || params.data?.category?.color || 'bg-black'} text-black `} >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-white">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
          </svg>
        </span>
      </>)
  }
  const columnComponentPaidBy = (params) => {
    return( <>{params.data.paidBy.name}</>)
  }
  const columnComponentCreatedBy = (params) => {
    return( <>{params.data.createdBy.name}</>)
  }
  if(windowWidth<700){
    return(<>
      <SmCardBody columns = {['name','totalPrice','date','paidBy','createdBy']} columnComponents = {['','','',columnComponentPaidBy,columnComponentCreatedBy]} setFormData={props._as.setCategoryData} IconComponent={IconComponent}   _as = {props._as} dataFilter={dataFilter} gridApi = {process.env.SERVER_API+"/api/orders"} />
    </>)
  }else{
    const columnComponentIcon = (params) => {
      
      if(heroIconsNames.includes(params.data.icon)) {
        return( <div className='flex items-center justify-center w-full h-full'> <HeroIcon style="" iconTitle = {params.data.icon? params.data.icon:"ExclamationTriangleIcon"} /> </div> )
      } else {
        return( <div className='flex items-center justify-center w-full h-full'> <HeroIcon style="" iconTitle = {"ExclamationTriangleIcon"} /> </div> )
      }
    }
    const columnComponentColor = (params) => {
      return( <div className='flex items-center justify-center w-full h-full'><div className={`${params.data.color} rounded-lg w-16 h-5`}></div></div> )
    }

    const columnComponentPaidBy = (params) => {
      return( <>{params.data.paidBy.name}</>)
    }
    const columnComponentCreatedBy = (params) => {
      return( <>{params.data.createdBy.name}</>)
    }
    return (<>
      <GridBody columns = {['name','totalPrice','date','paidBy','createdBy']} columnComponents = {['','','',columnComponentPaidBy,columnComponentCreatedBy]} setFormData={props._as.setCategoryData}  _as = {props._as} dataFilter={dataFilter} gridApi = {process.env.SERVER_API+"/api/orders"} />
    </>);
  }
  
}

export default OrderList;