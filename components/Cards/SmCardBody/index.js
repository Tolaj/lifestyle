import PageChange from 'components/PreLoader';
import FetchAPI from 'controllers/fetchAPI';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { BeakerIcon } from '@heroicons/react/24/solid'
import HeroIcon, { heroIcons, heroIconsNames }  from 'utils/heroIcon';
import ReadLess from './components/readLess';
import { isEmpty } from 'lodash';

function SmCardBody(props) {
    
    const router = useRouter()
    const [rowData, setRowData] = useState(); 
    const [preLoader, setPreLoader] = React.useState(0);
    const [readMore, setReadMore] = React.useState(router.route =="/admin/profile" && props._as.profileTab == 0 ? 0+'i':0);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = props.gridApi?await FetchAPI(props.gridApi, 'GET', props?.gridData?props?.gridData:{}):props?.gridData;
                let dataList = Array.isArray(data) ? data: [data]
                props?.dataFilter ?   
                setRowData(props.dataFilter({data:dataList,_as:props._as})):
                setRowData(dataList)
              } catch (error) {
                console.error("Error fetching data:", error);
              }          
    };
        !isEmpty(props._as.user)?fetchData():null;
        
      }, [props._as.reloadChild,props._as.user]);

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
                        {/* icon section */}
                            {props?.IconComponent?
                                props?.IconComponent({data})
                                :
                                <span className={`flex items-center justify-center w-10 h-10 shrink-0 rounded-full bg-black text-black `} > 
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-white">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z" />
                                    </svg>
                                </span>
                            }
                        {/* read less section */}

                            <div className={`${ readMore==index+'i' ? 'invisible' : ' ' } flex flex-col flex-1`}>
                                <h3 className="text-sm font-medium"> {props?.columnComponents && typeof(props.columnComponents[0]) == 'function' ? props?.columnComponents[0]({data}) : data[props.columns[0]]}  </h3>
                                <span className={`text-xs leading-none text-gray-400 font-normal `} > {props?.columnComponents && typeof(props.columnComponents[1]) == 'function' ? props?.columnComponents[1]({data,readMore,index}) : data[props.columns[1]]}</span>
                            </div>

                        {/* action section */}

                            {
                                props?.ActionsComponent ? 
                                    props?.ActionsComponent({data,index,_as:props._as,setPreLoader,readMore,setReadMore,setFormData:props.setFormData})
                                    :
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

                        {/* read more section */}

                        <div className={`${readMore==index+'i'?' p-3 -mt-6 divide-y ':"hidden"}`}>
                            {props.columns.map((column,index2)=>{   
                                                         
                                    if(props.columnComponents){
                                        if( (typeof(props.columnComponents[index2]) != 'function')){
                                            return(<>
                                                <div key = {index2} className=' divide-y'>
                                                    <div className='text-gray-400'>
                                                        {column}
                                                    </div>
                                                    <div>
                                                    {typeof data[column] === "object" ? (
                                                            // Render a JSON string for debugging or handle gracefully
                                                            JSON.stringify(data[column])
                                                        ) : (
                                                            data[column]
                                                        )}
                                                    </div>
                                                </div>
                                            </>)
                                        }else{
                                            return(<>
                                                <div key = {index2} className=' divide-y'>
                                                    <div className='text-gray-400'>
                                                        {column}
                                                    </div>
                                                    <div>
                                                        {props.columnComponents[index2]({data,readMore,setRowData,_as:props._as,index:index})}
                                                    </div>
                                                </div>
                                            </>)
                                        }
                                    }else{
                                        return(<>
                                            <div key = {index2} className=' divide-y'>
                                                <div className='text-gray-400'>
                                                    {column}
                                                </div>
                                                <div>
                                                    {data[column]}
                                                </div>
                                            </div>
                                        </>)
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