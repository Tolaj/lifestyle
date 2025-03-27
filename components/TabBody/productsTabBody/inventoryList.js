import GridBody from 'components/Cards/GridBody';
import SmCardBody from 'components/Cards/SmCardBody';
import InputFields from 'components/InputFields';
import Toast from 'components/Toast';
import FetchAPI from 'controllers/fetchAPI';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { getUserGroupDetails } from 'utils/getUserGroupDetails';
import { useClickOutside } from 'utils/helperFunctions';
import HeroIcon, { heroIconsNames } from 'utils/heroIcon';


export default function InventoryList(props)  {
  const [windowWidth, setWindowWidth] = useState(null);
  const router = useRouter()

  const [category, setCategory] = useState(null);  // State to store fetched category data
  const [categorySm, setCategorySm] = useState(null);  // State to store fetched category data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data =  FetchAPI(process.env.SERVER_API + "/api/categories", 'GET');
        setCategory(data);  // Update state with the found category
        setCategorySm(await data)
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchData(); 
  }, []);

  useEffect(() => {
      setWindowWidth(window.outerWidth)
  },[]) 

  const dataFilter = (params) => {
    
    let myGroup = params?._as?.user?.groups?.find((data) => data._id === localStorage.getItem('projectLifestyle_activeGroup'))
    return params.data.filter((data) => myGroup.inventories.includes(data._id));
  }

  const ActionsComponent = (params) => {

    const handleAction = async (method,data) => {
        try {
            const response = await FetchAPI('/api/inventory', method, data);
            params.setPreLoader(false)
            params._as.setReloadChild(Math.random())
        } catch (error) {
            console.error("Error deleting data:", error);
        }

    };
    
    return (<>
                    <div   className="flex items-center justify-center md:h-full gap-1 md:w-full md:gap-4">
                        <InputFields.GridButton title="Add to cart" type="ADD_CART"  
                            onClick={() => {
                             
                              let tempInventoryData = JSON.parse(JSON.stringify(params?.data?.product))
                              tempInventoryData.price = params?.data?.price
                              tempInventoryData.unit = params?.data?.unit

                   
                                  if(params?.data?.category){
                                    tempInventoryData.category = params?.data?.category
                                    tempInventoryData.splitAmong = params?.data?.splitAmong.map(user => user._id);
                                  }

                                  props._as.setToast((prevToast) => {                              
                                    return `${(typeof prevToast === 'string' ? parseInt(prevToast.split(' ')[0], 10) : 0) + 1} Item(s) added to cart successfully!`;
                                  });

                                  props._as.setCart((prevCart) => [...prevCart, { ...tempInventoryData }])                             

                            
                              
                            }} 
                          className="w-6 h-6 text-black hover:cursor-pointer" />
                        {/* <InputFields.GridButton title="Edit" type="EDIT"  onClick={()=>{params._as.setModalToggle(router.route);params.setFormData(params.data)}} className="w-6 h-6 text-black hover:cursor-pointer" /> */}
                        <InputFields.GridButton title="Delete" type="DELETE"  onClick={()=>{params.setPreLoader(true);handleAction("DELETE",{"_id":params.data._id})}}  className={`flex items-center justify-center gap-2 hover:cursor-pointer text-black font-semibold`}/>
                        <InputFields.GridButton title="Edit" type="ARROW" onClick={()=>{params.setReadMore(params.readMore==params.index+'i'?null:params.index+'i')}} className={`w-5 h-5 md:hidden  text-black ${params.readMore == params.index+'i' ?"rotate-90":""}`}/>
                    </div>
        </>);
  };

  if(windowWidth<700){
    
    const IconComponent = (params) => {
      
      params.data.category = params.paramPass.categoryData.find(category => category._id === params.data.product.category)
      if(params.readMore==params.index+'i'){
        return(<>
          <span className={`flex items-center justify-center w-10 h-10 shrink-0 rounded-full ${params.data?.color || params.data?.category?.color || 'bg-black'} text-black `} >
                    <HeroIcon  style="size-6 text-black" iconTitle = {params.data?.icon || params.data?.category?.icon } />              
          </span>
        </>)
      }else{
        return(<>
        
          <span className={`flex items-center justify-center w-10 h-10 shrink-0 rounded-full ${params.data?.color || params.data?.category?.color || 'bg-black'} text-black `} >
             {params.data.quantityAvailable}
                    {/* <HeroIcon  style="size-6 text-black" iconTitle = {params.data?.icon || params.data?.category?.icon || } />               */}
          </span>
        </>)
      }
    }
    
    const columnComponentName = (params) => {
      return(<>{params?.data?.product?.name}</>)
    }

    const columnComponentCategory = (params) => {
      return(<>{params?.data?.category?.name}</>)
    }
  
    const columnComponentManufacturer = (params) => {
      return(<>{params?.data?.product?.manufacturer}</>)
    }
    const columnComponentDescription = (params) => {
      return(<>{params?.data?.product?.description}</>)
    }

    const columnComponentQuantityAvailable = (params) => {
      return(<> 
        <div  class="flex-shrink-0 inline-flex max-w-fit items-center px-2 py-1 mr-2 text-xs text-white bg-black rounded">
           <span className="">{params?.data?.quantityAvailable}</span>
         </div>
       </>)
    }

    const columnComponentLastUpdated = (params) => {
      return(<>  {timeAgo(params.data.lastUpdated)} </>)
    }

    const ColumnComponentPrice = ({ params }) => {
      
    
      return (<>
        {
          params.readMore == params.index+'i' ? 
          <> $ {params.data.price} </>
          :
          <div className={`divide-x divide-gray-200 mt-auto `}>
            <span className="inline-block px-3 text-xs leading-none text-gray-400 font-normal first:pl-0">
                $ {params.data.price} 
            </span>
            <span className="inline-block px-3 text-xs leading-none text-gray-400 font-normal first:pl-0" >
              {timeAgo(params.data.lastUpdated)} 
            </span>
          </div>
         }
      </>);
    };

    const ColumnComponentUnit = ({ params }) => {
      return <>{params?.data?.unit}</>
    };

    const ColumnComponentSplit = ({params}) => {
      const names = params.data.splitAmong.map(person => person.name);

      return(<>
        <div className={`flex   flex-row items-center  h-full py-1`}>
       {names.map((name,index)=>{
           return(<div key={index} class="flex-shrink-0 inline-flex max-w-fit items-center px-2 py-1 mr-2 text-xs text-white bg-black rounded">
           <span className="">{name}</span>
         </div>)
       })}
     </div>
     </>)
    };
    
    
    
    return(<> 
      <SmCardBody columns = {['name','price','unit','quantityAvailable','lastUpdated',"splitAmong",'description','category','manufacturer']} columnComponents={[columnComponentName,(params) => <ColumnComponentPrice params={params} />,(params) => <ColumnComponentUnit params={params} />,columnComponentQuantityAvailable,columnComponentLastUpdated,(params) => <ColumnComponentSplit params={params} />,columnComponentDescription,columnComponentCategory,columnComponentManufacturer]}  IconComponent={IconComponent} ActionsComponent = {ActionsComponent}  setFormData={props._as.setInventoryData} paramPass = {{"categoryData":categorySm?categorySm:"nothing"}}  _as = {props._as} dataFilter={dataFilter}  gridApi = {process.env.SERVER_API+"/api/inventory"} />
    </>)
  }else{

    const columnComponentQuantityAvailable = (params) => {
      return <>
        <div className='flex items-center justify-center w-full h-full'>
          <div className=' flex items-center justify-center w-8 h-8 rounded-full bg-colors-black text-white'>
            {params.data.quantityAvailable} 
          </div>
        </div>
      </> 
    }
    const columnComponentName = (params) => {
         return <>{params.data.product.name} </> 
    }
    const columnComponentDescription = (params) => {
      return <>{params.data.product.description} </> 
    }

    const columnComponentSplitAmong = (params) => {
      const names = params.data.splitAmong.map(person => person.name);
        return(<>
           <div className={`flex   flex-row items-center  h-full py-1`}>
          {names.map((name,index)=>{
              return(<div key={index} class="flex-shrink-0 inline-flex max-w-fit items-center px-2 py-1 mr-2 text-xs text-white bg-black rounded">
              <span className="">{name}</span>
            </div>)
          })}
        </div>
        </>)
        
    }
    const columnComponentManufacturer = (params) => {
      return <>{params.data.product.manufacturer} </> 
    }

    const columnComponentIcon =  (params) => {
    
      params.paramPass.categoryData.then((data)=>{        
        params.node.setDataValue('category', data.find(category => category._id === params.data.product.category));
      })

      if(params?.data?.category?.icon) {
        return(<div className='flex  items-center justify-start w-full h-full gap-2'>  
          <span className={`rounded-full  ${params?.data?.category?.color} w-fit h-fit p-1 `}>
            <HeroIcon style="" iconTitle = {params?.data?.category?.icon? params?.data?.category?.icon:"ExclamationTriangleIcon"} />
          </span>
          {params?.data?.category?.name} 
        </div> )
      } else {
        return( <div className='flex items-center justify-center w-full h-full'> <HeroIcon style="" iconTitle = {"ExclamationTriangleIcon"} /> </div> )
      }
    }

  
    return (<>  
      <GridBody columns = {['quantity available','name','description','category','price','unit','splitAmong','manufacturer','action']}  columnComponents = {[columnComponentQuantityAvailable,columnComponentName,columnComponentDescription,columnComponentIcon,"","",columnComponentSplitAmong,columnComponentManufacturer]} ActionsComponent = {ActionsComponent} cellStyle={['','','','','',{overflow:'visible'}]} paramPass={{"_as":props._as.user._id != undefined  ?props._as:"nothing","categoryData":category?category:"nothing"}} setFormData={props._as.setProductsData}  _as = {props._as} dataFilter={dataFilter}  gridApi = {process.env.SERVER_API+"/api/inventory"} />
    </>);
  }
  
}


function timeAgo(dateString) {
  const now = new Date();
  const past = new Date(dateString);
  const diffInSeconds = Math.floor((now - past) / 1000);

  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(diffInSeconds / 3600);
  const days = Math.floor(diffInSeconds / 86400);
  const weeks = Math.floor(diffInSeconds / (86400 * 7));
  const months = Math.floor(diffInSeconds / (86400 * 30));

  if (diffInSeconds < 60) return `${diffInSeconds} sec'${diffInSeconds !== 1 ? 's' : ''} ago`;
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  if (days < 7) return `${days} day${days !== 1 ? 's' : ''} ago`;
  if (weeks < 4) return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
  
  return `${months} month${months !== 1 ? 's' : ''} ago`;
}