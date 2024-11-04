import PageChange from 'components/PreLoader';
import FetchAPI from 'controllers/fetchAPI';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { BeakerIcon } from '@heroicons/react/24/solid'
import HeroIcon, { heroIcons, heroIconsNames }  from 'utils/heroIcon';
import ReadLess from './components/readLess';

function SmCardBody(props) {
    
    const router = useRouter()
    const [rowData, setRowData] = useState(); 
    const [preLoader, setPreLoader] = React.useState(0);
    const [readMore, setReadMore] = React.useState(0);
    
    useEffect(() => {
        const fetchData = async () => {
        if(props.gridData){
            setRowData(props.gridData.friends)
        }else{
            try {
                const data = await FetchAPI(props.gridApi, 'GET');
                setRowData(data); // Set the response data to state
              } catch (error) {
                console.error("Error fetching data:", error);
              }
        }   
          
        };
    
        fetchData();
      }, [props._as.reloadChild,props._as.userData]);

    const ActionDelete = async (data) => {
        setPreLoader(true);
        try {
            await FetchAPI(props.gridApi, "DELETE", data);
        } catch (error) {
            console.error("Error during API call:", error);
            // Optionally handle the error, e.g., show an alert or toast
        } finally {
            setPreLoader(false);
            props._as.setReloadChild(Math.random());
        }
    }

      if (!rowData) {
        return  <PageChange />; // A loader while data is being fetched
      }


    return(<>
        {preLoader?<PageChange />:<></>}
        <div className='flex flex-col space-y-2 '>
            {rowData?rowData.map((data,index)=>{
                return(<>
                    <div key={index} aria-label="content" className={` grid gap-2.5 ${readMore==index+'i'?"bg-white shadow-lg rounded-t-[35px] rounded-b-lg":"rounded-full bg-white shadow-lg"} `}>
                        <div className="flex items-center space-x-4 p-3.5 " >
                            <span className={`flex items-center justify-center w-10 h-10 shrink-0 rounded-full ${data?.color || data?.category?.color || 'bg-black'} text-black `} >
                            {data.icon||data?.category?.icon?<HeroIcon  style="size-6 text-black" iconTitle = {data.icon || data?.category?.icon} />:
                                router.route == '/admin/profile' && props._as.profileTab == 2 ?
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                                </svg>
                            :
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-white">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                </svg>
                            }
                            </span>
                            <div className={`${ readMore==index+'i' ? 'invisible' : ' ' } flex flex-col flex-1`}>
                                <h3 className="text-sm font-medium"> {props.customComponents? props.customComponents[index](data) : data[props.columns[0]]}  </h3>
                                
                                <span className={` ${props.columns[1] != 'price'?'':'hidden' }   text-xs leading-none text-gray-400 font-normal `} >swapnilhgf@gmail.com</span>
                            
                                <div className={`${props.columns[1] != 'price'?'hidden':'' } divide-x divide-gray-200 mt-auto `}>
                                    <span className="inline-block px-3 text-xs leading-none text-gray-400 font-normal first:pl-0">
                                        $ {data[props.columns[1]]} 
                                    </span>
                                    <span className="inline-block px-3 text-xs leading-none text-gray-400 font-normal first:pl-0" >
                                        {data[props.columns[2]]} ml
                                    </span>
                                </div>
                            </div>
                            {
                                props.customComponentActions ? props.customComponentActions({data,index,_as:props._as,setPreLoader,readMore,setReadMore}):
                            
                                <div className='flex items-center justify-center gap-1'>
                                    <svg  onClick={()=>{props._as.setModalToggle(router.route);props.setFormData(data)}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                        <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                    </svg>

                                    <svg onClick={()=>{ActionDelete(data)}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                        <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                                    </svg>

                                    <svg onClick={()=>{setReadMore(readMore==index+'i'?null:index+'i')}} className={`w-5 h-5 shrink-0 ${readMore == index+'i' ?"rotate-90":""}`} xmlns="http://www.w3.org/2000/svg"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" >
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M9 6l6 6l-6 6"></path>
                                    </svg>
                                </div>
                            }
                        </div>
                        <div className={`${readMore==index+'i'?' p-3 -mt-6 divide-y ':"hidden"}`}>
                            {props.columns.map((column,index)=>{
                                if (column === "category"){
                                    return(<>
                                        <div key = {index} className=' divide-y'>
                                            <div className='text-gray-400'>
                                                category
                                            </div>
                                            <div>
                                                {data.category.name}
                                            </div>
                                        </div>
                                    </>)
                                }else{
                                    if(props.customComponents && (typeof(props.customComponents[index]) != 'function')){
                                        return(<>
                                            <div key = {index} className=' divide-y'>
                                                <div className='text-gray-400'>
                                                    {column}
                                                </div>
                                                <div>
                                                    {data[column]}
                                                </div>
                                            </div>
                                        </>)
                                    }else{
                                        return(<>
                                            <div key = {index} className=' divide-y'>
                                                <div className='text-gray-400'>
                                                    {column}
                                                </div>
                                                <div>
                                                    {props.customComponents[index](data)}
                                                </div>
                                            </div>
                                        </>)
                                    }
                                    
                                }
                                
                            })}                             
                        </div>
                    </div>
                </>)
            }):<></>}
        </div>
    </>) 
}

export default SmCardBody;