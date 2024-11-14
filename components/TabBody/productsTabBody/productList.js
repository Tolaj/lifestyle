import GridBody from 'components/Cards/GridBody';
import SmCardBody from 'components/Cards/SmCardBody';
import React, { useEffect, useState } from 'react';
import HeroIcon, { heroIconsNames } from 'utils/heroIcon';


export default function ProductList(props)  {
  const [windowWidth, setWindowWidth] = useState(null);
  useEffect(() => {
      setWindowWidth(window.outerWidth)
  },[]) 

  

  const IconComponent = (params) => {
    return(<>
        <span className={`flex items-center justify-center w-10 h-10 shrink-0 rounded-full ${params.data?.color || params.data?.category?.color || 'bg-black'} text-black `} >
                  <HeroIcon  style="size-6 text-black" iconTitle = {params.data?.icon || params.data?.category?.icon} />              
        </span>
      </>)
  }

  const columnComponentCategory = (params) => {
    return(<>{params.data.category.name}</>)
  }

  const columnComponentPrice = (params) => {
    return(<>
       
        <div className={`divide-x divide-gray-200 mt-auto `}>
          <span className="inline-block px-3 text-xs leading-none text-gray-400 font-normal first:pl-0">
              $ {params.data.price} 
          </span>
          <span className="inline-block px-3 text-xs leading-none text-gray-400 font-normal first:pl-0" >
            {params.data.quantity} ml
          </span>
        </div>
        
        
      </>)
  }

  const dataFilter = (params) => {
    
    let myGroup = params?._as?.user?.groups?.find((data) => data._id === localStorage.getItem('activeGroup'))
    return params.data.filter((data) => myGroup.products.includes(data._id));
  }

  if(windowWidth<700){
    return(<>
      <SmCardBody columns = {['name','price','quantity','description','category','manufacturer']} columnComponents={["",columnComponentPrice,"","",columnComponentCategory]}  IconComponent={IconComponent} setFormData={props._as.setProductsData}   _as = {props._as} dataFilter={dataFilter}  gridApi = {process.env.SERVER_API+"/api/products"} />
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
      <GridBody columns = {['name','description','category','price','quantity','manufacturer']} columnComponents = {['','',columnComponentIcon]}  setFormData={props._as.setProductsData}  _as = {props._as} dataFilter={dataFilter}  gridApi = {process.env.SERVER_API+"/api/products"} />
    </>);
  }
  
}


