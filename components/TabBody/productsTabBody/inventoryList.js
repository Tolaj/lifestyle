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

  useEffect(() => {
      setWindowWidth(window.outerWidth)
  },[]) 

  const dataFilter = (params) => {
    
    let myGroup = params?._as?.user?.groups?.find((data) => data._id === localStorage.getItem('projectLifestyle_activeGroup'))
    return params.data.filter((data) => myGroup.products.includes(data._id));
  }

  const ActionsComponent = (params) => {

    const handleAction = async (method,data) => {
        try {
            const response = await FetchAPI('/api/products', method, data);
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
                              props._as.setToast((prevToast) => {                              
                                return `${(typeof prevToast === 'string' ? parseInt(prevToast.split(' ')[0], 10) : 0) + 1} Item(s) added to cart successfully!`;
                              });
                              props._as.setCart((prevCart) => [...prevCart, { ...params.data }])
                            }} 
                          className="w-6 h-6 text-black hover:cursor-pointer" />
                        <InputFields.GridButton title="Edit" type="EDIT"  onClick={()=>{params._as.setModalToggle(router.route);params.setFormData(params.data)}} className="w-6 h-6 text-black hover:cursor-pointer" />
                        <InputFields.GridButton title="Delete" type="DELETE"  onClick={()=>{params.setPreLoader(true);handleAction("DELETE",{"_id":params.data._id})}}  className={`flex items-center justify-center gap-2 hover:cursor-pointer text-black font-semibold`}/>
                        <InputFields.GridButton title="Edit" type="ARROW" onClick={()=>{params.setReadMore(params.readMore==params.index+'i'?null:params.index+'i')}} className={`w-5 h-5 md:hidden  text-black ${params.readMore == params.index+'i' ?"rotate-90":""}`}/>
                    </div>
        </>);
  };

  if(windowWidth<700){
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
  
    const ColumnComponentPrice = ({ params }) => {
      const {isVisible,setIsVisible,isVisibleRef} = useClickOutside()
      const [tempData, setTempData] = useState(params.data);
    
  
      const handleChange = (e) => {
        const { name, value } = e.target;
        setTempData((prevState) => ({
          ...prevState,
          [name]: value,
        }));

        params.setRowData((prevRowData) => 
          prevRowData.map(row => 
            row._id === tempData._id
                  ? { ...row, price: value }
                  : { ...row }
          )
        );

      };
    
      return (<>
        {
          params.readMore == params.index+'i' ? 
          <div  className="flex items-center w-full h-full  justify-between space-x-1 px-2">
            <svg  onClick={()=>{handleChange({"target":{"name":"price","value":(parseFloat(tempData.price) - 0.05).toFixed(2)}})}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5 flex-shrink-0 hover:cursor-pointer   ">
              <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM6.75 9.25a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5h-6.5Z" clip-rule="evenodd" />
            </svg>
            {
              isVisible?
              <input
              ref={isVisibleRef}
                type="text"
                name='price'
                value={tempData.price}  
                onChange={handleChange}
                style={{ width: '100%', padding: '0px 0 0 6px' }}
                className=" min-w-8 rounded-md "
              /> :
              <div onClick={()=>{setIsVisible(1)}} className=' hover:cursor-text w-full flex items-center justify-center  flex-grow'>{tempData.price}</div>
            }
            
            <svg onClick={()=>{handleChange({"target":{"name":"price","value":(parseFloat(tempData.price) + 0.05).toFixed(2)}})}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 flex-shrink-0 hover:cursor-pointer  ">
              <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z" clip-rule="evenodd" />
            </svg>
          </div>
          :
          <div className={`divide-x divide-gray-200 mt-auto `}>
            <span className="inline-block px-3 text-xs leading-none text-gray-400 font-normal first:pl-0">
                $ {params.data.price} 
            </span>
            <span className="inline-block px-3 text-xs leading-none text-gray-400 font-normal first:pl-0" >
              {params.data.unit} 
            </span>
          </div>
         }
      </>);
    };

    const ColumnComponentUnit = ({ params }) => {
      const {isVisible,setIsVisible,isVisibleRef} = useClickOutside()
      const [tempData, setTempData] = useState(params.data);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setTempData((prevState) => ({
          ...prevState,
          [name]: value,
        }));

        params.setRowData((prevRowData) => 
          prevRowData.map(row => 
            row._id === tempData._id
                  ? { ...row, unit: value }
                  : { ...row }
          )
        );

      };
    
      return (<>
        {
          params.readMore ? 
          <div  className="flex items-center w-full h-full  justify-between space-x-1 px-2">
            <svg  onClick={()=>{handleChange({"target":{"name":"unit","value":(parseFloat(tempData.unit) - 1).toFixed(0)}})}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5 flex-shrink-0 hover:cursor-pointer   ">
              <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM6.75 9.25a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5h-6.5Z" clip-rule="evenodd" />
            </svg>
            {
              isVisible?
              <input
              ref={isVisibleRef}
                type="text"
                name='unit'
                value={tempData.unit}  
                onChange={handleChange}
                style={{ width: '100%', padding: '0px 0 0 6px' }}
                className=" min-w-8 rounded-md "
              /> :
              <div onClick={()=>{setIsVisible(1)}} className=' hover:cursor-text w-full flex items-center justify-center  flex-grow'>{tempData.unit}</div>
            }
            
            <svg onClick={()=>{handleChange({"target":{"name":"unit","value":(parseFloat(tempData.unit) + 1).toFixed(0)}})}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 flex-shrink-0 hover:cursor-pointer  ">
              <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z" clip-rule="evenodd" />
            </svg>
        </div>
          :
          <></>
         }
      </>);
    };

    const ColumnComponentSplit = ({params}) => {
      const {isVisible,setIsVisible,isVisibleRef} = useClickOutside()

      const [tempData, setTempData] = React.useState(() => {

        if(params?.data?.splitAmong){
            return params?.data
        }else{
          const  {activeGroupMembers} = getUserGroupDetails(params?._as?.user, localStorage.getItem("projectLifestyle_activeGroup"));
          const allMemberIds = activeGroupMembers?.map((member) => member._id) || [];
          params.setRowData((prevRowData) => 
            prevRowData.map(row => 
              row._id === tempData._id
                    ? { ...row, splitAmong: allMemberIds }
                    : { ...row }
            )
          );
          return {
              ...params.data,
              splitAmong: allMemberIds,
          };
        }        
         
      });
  
      const { activeGroupMembers } = getUserGroupDetails(params?._as?.user, localStorage.getItem("projectLifestyle_activeGroup"));
  

      const handleChange = (e, memberId) => {
        const { checked } = e.target; 
        setTempData((prevState) => {
            const newSplitAmong = checked
                ? [...prevState.splitAmong, memberId] 
                : prevState.splitAmong.filter(id => id !== memberId);  

                params.setRowData((prevRowData) => 
                  prevRowData.map(row => 
                    row._id === tempData._id
                          ? { ...row, splitAmong: newSplitAmong }
                          : { ...row }
                  )
                );
            return {
                ...prevState,
                splitAmong: newSplitAmong,
            };
        });

        
    };

  
      return (
          <>
              <div className={`flex flex-row items-center h-full py-1`}>
                  <div onClick={() => setIsVisible(1)} className=" hover:cursor-pointer justify-between items-center flex w-full px-2 py-1 mr-2 text-xs text-white bg-black rounded">
                      <span className=""> {tempData.splitAmong.length == activeGroupMembers.length?"Even":"Uneven"} </span>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                      </svg>
                  </div>  
              </div>
              <div ref={isVisibleRef} id="dropdownDefaultCheckbox" className={`${isVisible ? "" : "hidden"} z-10 absolute w-72 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}>
                  <ul className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownCheckboxButton">
                      {activeGroupMembers.map((member, index) => {
                          return (
                              <li key={index}>
                                  <div className="flex items-center">
                                      <input
                                          checked={tempData.splitAmong.includes(member._id)}
                                          onChange={(e) => handleChange(e, member._id)} // Pass the event and memberId to handleChange
                                          id={"checkbox-" + index}
                                          type="checkbox"
                                          name="splitAmong"
                                          className="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded focus:ring-black  focus:ring-2 "
                                      />
                                      <label htmlFor={"checkbox-" + index} className="ms-2 text-sm font-medium text-gray-900 ">
                                          {member.name}
                                      </label>
                                  </div>
                              </li>
                          );
                      })}
                  </ul>
              </div>
          </>
      );
    };
    
    return(<> 
      <SmCardBody columns = {['name','price','unit',"splitAmong",'description','category','manufacturer']} columnComponents={["",(params) => <ColumnComponentPrice params={params} />,(params) => <ColumnComponentUnit params={params} />,(params) => <ColumnComponentSplit params={params} />,"",columnComponentCategory]}  IconComponent={IconComponent} ActionsComponent = {ActionsComponent}  setFormData={props._as.setProductsData}   _as = {props._as} dataFilter={dataFilter}  gridApi = {process.env.SERVER_API+"/api/products"} />
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

    const columnComponentPrice = (params) => {
      const {isVisible,setIsVisible,isVisibleRef} = useClickOutside()
      const [tempData, setTempData] = React.useState(params.data);

      const handleChange = (e) => {
        
        const { name, value } = e.target;
        setTempData((prevState) => ({
              ...prevState,
              [name]: value,
          }));
        params.setValue(value)
      }
      
      return(<>
          
        <div  className="flex items-center w-full h-full  justify-between space-x-1">
            <svg  onClick={()=>{handleChange({"target":{"name":"price","value":(parseFloat(tempData.price) - 0.05).toFixed(2)}})}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5 flex-shrink-0 hover:cursor-pointer   ">
              <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM6.75 9.25a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5h-6.5Z" clip-rule="evenodd" />
            </svg>
            {
              isVisible?
              <input
                ref={isVisibleRef}
                type="text"
                name='price'
                value={tempData.price}
                onChange={handleChange}
                style={{ width: '100%', padding: '0px 0 0 6px' }}
                className="flex-grow min-w-8 rounded-md "
              /> :
              <div onClick={()=>{setIsVisible(1)}} className=' hover:cursor-text w-full flex items-center justify-center  flex-grow'>{tempData.price}</div>
            }
            
            <svg onClick={()=>{handleChange({"target":{"name":"price","value":(parseFloat(tempData.price) + 0.05).toFixed(2)}})}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 flex-shrink-0 hover:cursor-pointer  ">
              <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z" clip-rule="evenodd" />
            </svg>
        </div>

      </>)
    }
    
    const columnComponentUnit = (params) => {
      const {isVisible,setIsVisible,isVisibleRef} = useClickOutside()
      const [tempData, setTempData] = React.useState(params.data);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setTempData((prevState) => ({
              ...prevState,
              [name]: value,
          }));
        params.setValue(value)
      }
      
      return(<>
          
        <div  className="flex items-center w-full h-full justify-between space-x-1">
            <svg  onClick={()=>{handleChange({"target":{"name":"unit","value":(parseFloat(tempData.unit) - 1).toFixed(0)}})}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5 flex-shrink-0 hover:cursor-pointer   ">
              <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM6.75 9.25a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5h-6.5Z" clip-rule="evenodd" />
            </svg>
            {
              isVisible?
              <input
              ref={isVisibleRef}
                type="text"
                name='unit'
                value={tempData.unit}
                onChange={handleChange}
                style={{ width: '100%', padding: '0px 0 0 6px' }}
                className="flex-grow min-w-8 rounded-md "
              /> :
              <div onClick={()=>{setIsVisible(1)}} className=' hover:cursor-text w-full flex items-center justify-center  flex-grow'>{tempData.unit}</div>
            }
            
            <svg onClick={()=>{handleChange({"target":{"name":"unit","value":(parseFloat(tempData.unit) + 1).toFixed(0)}})}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 flex-shrink-0 hover:cursor-pointer  ">
              <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z" clip-rule="evenodd" />
            </svg>
        </div>

      </>)
    }

    const columnComponentSplit = (params) => {
      const {isVisible,setIsVisible,isVisibleRef} = useClickOutside()

      const [tempData, setTempData] = React.useState(() => {
          const  {activeGroupMembers} = getUserGroupDetails(params.paramPass._as.user, localStorage.getItem("projectLifestyle_activeGroup"));
          const allMemberIds = activeGroupMembers?.map((member) => member._id) || [];
          params.node.setDataValue('splitAmong', allMemberIds);
          return {
              ...params.data,
              splitAmong: allMemberIds,
          };
      });
  
      const dropdownRef = useRef(null);
      const { activeGroupMembers } = getUserGroupDetails(params.paramPass._as.user, localStorage.getItem("projectLifestyle_activeGroup"));
  

      const handleChange = (e, memberId) => {
        const { checked } = e.target; 
        setTempData((prevState) => {
            const newSplitAmong = checked
                ? [...prevState.splitAmong, memberId] 
                : prevState.splitAmong.filter(id => id !== memberId);  
          
            params.node.setDataValue('splitAmong', newSplitAmong);

            return {
                ...prevState,
                splitAmong: newSplitAmong,
            };
        });
    };

  
      return (
          <>
              <div className={`flex flex-row items-center h-full py-1`}>
                  <div onClick={() => setIsVisible(1)} className=" hover:cursor-pointer justify-between items-center flex max-w-fit px-2 py-1 mr-2 text-xs text-white bg-black rounded">
                      <span className=""> {tempData.splitAmong.length == activeGroupMembers.length?"Even":"Uneven"} </span>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                      </svg>
                  </div>  
              </div>
              <div ref={isVisibleRef} id="dropdownDefaultCheckbox" className={`${isVisible ? "" : "hidden"} z-10 absolute w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}>
                  <ul className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownCheckboxButton">
                      {activeGroupMembers.map((member, index) => {
                          return (
                              <li key={index}>
                                  <div className="flex items-center">
                                      <input
                                          checked={tempData.splitAmong.includes(member._id)}
                                          onChange={(e) => handleChange(e, member._id)} // Pass the event and memberId to handleChange
                                          id={"checkbox-" + index}
                                          type="checkbox"
                                          name="splitAmong"
                                          className="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded focus:ring-black  focus:ring-2 "
                                      />
                                      <label htmlFor={"checkbox-" + index} className="ms-2 text-sm font-medium text-gray-900 ">
                                          {member.name}
                                      </label>
                                  </div>
                              </li>
                          );
                      })}
                  </ul>
              </div>
          </>
      );
    };
  
    return (<>  
      <GridBody columns = {['name','description','category','price','unit','splitAmong','manufacturer','action']}  columnComponents = {['','',columnComponentIcon,columnComponentPrice,columnComponentUnit,columnComponentSplit]} ActionsComponent = {ActionsComponent} cellStyle={['','','','','',{overflow:'visible'}]} paramPass={{"_as":props._as.user._id != undefined  ?props._as:"nothing"}} setFormData={props._as.setProductsData}  _as = {props._as} dataFilter={dataFilter}  gridApi = {process.env.SERVER_API+"/api/products"} />
    </>);
  }
  
}


