import GridBody from 'components/Cards/GridBody';
import SmCardBody from 'components/Cards/SmCardBody';
import React, { useEffect, useState } from 'react';
import HeroIcon, { heroIconsNames } from 'utils/heroIcon';

function CategoryList(props) {
  const [windowWidth, setWindowWidth] = useState(null);

  useEffect(() => {
      setWindowWidth(window.outerWidth)
  },[]) 

  
  const dataFilter = (params) => {
    let myGroup = params?._as?.user?.groups?.find((data) => data._id === localStorage.getItem('projectLifestyle_activeGroup'))
    return params.data.filter((data) => myGroup.categories.includes(data._id));
  }

  const IconComponent = (params) => {
    return(<>
        <span className={`flex items-center justify-center w-10 h-10 shrink-0 rounded-full ${params.data?.color || params.data?.category?.color || 'bg-black'} text-black `} >
                  <HeroIcon  style="size-6 text-black" iconTitle = {params.data?.icon || params.data?.category?.icon} />              
        </span>
      </>)
  }

  if(windowWidth<700){
    return(<>
      <SmCardBody columns = {['name','description','color','icon']} setFormData={props._as.setCategoryData} IconComponent={IconComponent}   _as = {props._as} dataFilter={dataFilter} gridApi = {process.env.SERVER_API+"/api/categories"} />
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
    return (<>
      <GridBody columns = {['name','description','color','icon','action']} columnComponents = {['','',columnComponentColor,columnComponentIcon]} setFormData={props._as.setCategoryData}  _as = {props._as} dataFilter={dataFilter} gridApi = {process.env.SERVER_API+"/api/categories"} />
    </>);
  }
  
}

export default CategoryList;