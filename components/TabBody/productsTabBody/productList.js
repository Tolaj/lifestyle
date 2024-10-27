import GridBody from 'components/Cards/GridBody';
import SmCardBody from 'components/Cards/SmCardBody';
import React, { useEffect, useState } from 'react';
import HeroIcon, { heroIconsNames } from 'utils/heroIcon';


export default function ProductList(props)  {
  const [windowWidth, setWindowWidth] = useState(null);
  useEffect(() => {
      setWindowWidth(window.outerWidth)
  },[]) 
  
  if(windowWidth<700){
    return(<>
      <SmCardBody columns = {['name','price','quantity','description','category','manufacturer']} setFormData={props._as.setProductsData}  _as = {props._as} gridApi = {process.env.SERVER_API+"/api/products"} />
    </>)
  }else{
    const columnComponentIcon = (params) => {
      
      if(params.data.category.icon) {
        return(<div className='flex  items-center justify-start w-full h-full gap-2'>  
          <span className={`rounded-full  ${params.data.category.color} w-fit h-fit p-1 `}>
            <HeroIcon style="" iconTitle = {params.data.category.icon? params.data.category.icon:"ExclamationTriangleIcon"} />
          </span>
          {params.data.category.name} 
        </div> )
      } else {
        return( <div className='flex items-center justify-center w-full h-full'> <HeroIcon style="" iconTitle = {"ExclamationTriangleIcon"} /> </div> )
      }
    }
  
    return (<>
      <GridBody columns = {['name','description','category','price','quantity','manufacturer']} columnComponents = {['','',columnComponentIcon]}  setFormData={props._as.setProductsData}  _as = {props._as} gridApi = {process.env.SERVER_API+"/api/products"} />
    </>);
  }
  
}


