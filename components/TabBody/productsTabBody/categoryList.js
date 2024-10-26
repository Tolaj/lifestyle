import GridBody from 'components/Cards/GridBody';
import SmCardBody from 'components/Cards/SmCardBody';
import React, { useEffect, useState } from 'react';
import HeroIcon from 'utils/heroIcon';

function CategoryList(props) {
  const [windowWidth, setWindowWidth] = useState(null);
  useEffect(() => {
      setWindowWidth(window.outerWidth)
  },[]) 
  
  if(windowWidth<700){
    return(<>
      <SmCardBody columns = {['name','description','color','icon']}  _as = {props._as} gridApi = {process.env.SERVER_API+"/api/categories"} />
    </>)
  }else{
    const columnComponentIcon = (params) => {
      return( <div className='flex items-center justify-center w-full h-full'> <HeroIcon style="" iconTitle = {params.data.icon} /> </div> )
    }
    const columnComponentColor = (params) => {
      return( <div className='flex items-center justify-center w-full h-full'><div className={`${params.data.color} rounded-lg w-16 h-5`}></div></div> )
    }
    return (<>
      <GridBody columns = {['name','description','color','icon']} columnComponents = {['','',columnComponentColor,columnComponentIcon]}   _as = {props._as} gridApi = {process.env.SERVER_API+"/api/categories"} />
    </>);
  }
  
}

export default CategoryList;