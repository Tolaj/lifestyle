import InputFields from 'components/InputFields';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

function Tabs({children},props) {
    const router = useRouter()
    const currentChild = children.length > 1? children.filter(item => item.props._acTab.route === router.route) : children.props._acTab.route == router.route ? children : "No Tab For This Route";
    return currentChild    
}

const Tab = (props) => {
    const [windowWidth, setWindowWidth] = useState(null);
    const [mobileButtonToggle, setMobileButtonToggle] = useState(0);
    useEffect(() => {
        setWindowWidth(window.outerWidth)
    },[]) 

    return(
        <>        
        <nav className=" pt-10 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
            <div className="w-full  mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">            
                <div className={` text-black text-lg uppercase  font-bold flex justify-between w-full md:w-fit `} >
                    <div>
                        { props._acTab.title }                  
                    </div>
                    <div className='md:hidden' onClick={()=>{props._as.setSidebarToggle(1)}}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
                        </svg>
                    </div>
                </div>
               {windowWidth<700?<>
                    <div className='flex flex-col gap-2'>
                        <ul className={`mt-6 md:mt-0   ${props._acTab.tabSections.length>1?"border-b":""}  flex flex-wrap  text-sm font-medium text-center text-gray-500  border-gray-200 dark:border-gray-700 dark:text-gray-400`}>
                            {props._acTab.tabSections.map((section,index)=>{
                                return(
                                    <>
                                        <li className="mr-2" onClick={()=>{props._acTab.setActiveTabSection(index)}}>
                                            <a href="#" aria-current="page" className={` md:p-4 p-2   ${props._acTab.activeTabSection == index ? "text-white bg-gray-900 active" : "text-gray-500 hover:text-gray-600 hover:bg-gray-100  " }  inline-block rounded-t-lg   `}>{section}</a>
                                        </li>
                                    </>
                                )  
                            })}
                            
                        </ul>  
                        <div className='absolute bottom-8 right-8'>
                                
                                <div className='flex flex-col items-end'>                               
                                    <div className={`${mobileButtonToggle?"":"hidden"}`}>
                                        {props._acTab.tabButtons.length>0 && props._acTab.tabButtons[props._acTab.activeTabSection] ? props._acTab.tabButtons[props._acTab.activeTabSection].map((button,index)=>{
                                            let buttonType = 
                                            props._acTab.tabButtonType &&
                                            props._acTab.tabButtonType[props._acTab.activeTabSection] &&
                                            props._acTab.tabButtonType[props._acTab.activeTabSection][index]
                                                ? props._acTab.tabButtonType[props._acTab.activeTabSection][index]
                                                : "ADD_BUTTON";
                                            return(<>                        
                                                <InputFields.TabButton type={buttonType} clickButton={props._acTab.setModalToggle} placeholder={button} />
                                            </>)
                                        }):<></>} 
                                    </div>
                                    {/* <div className='p-1' onClick={()=>{}}>
                                        <div className='bg-black items-center flex justify-center h-12 w-12 rounded-full'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-white" >
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                            </svg>
                                        </div>
                                    </div> */}
                                    {/* <div className='' onClick={()=>{props._acTab.setModalToggle(props._acTab.route)}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-14">
                                            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clip-rule="evenodd" />
                                        </svg>
                                    </div> */}
                                </div>
                                
                                
                            
                        </div>
                    </div>
                </>:<>
                    <ul className={`mt-6 md:mt-0   ${props._acTab.tabSections.length>1?"border-b":""}  flex flex-wrap  text-sm font-medium text-center text-gray-500  border-gray-200 dark:border-gray-700 dark:text-gray-400`}>
                        {props._acTab.tabSections.map((section,index)=>{
                            return(
                                <>
                                    <li className="mr-2" onClick={()=>{props._acTab.setActiveTabSection(index)}}>
                                        <a href="#" aria-current="page" className={` md:p-4 p-2   ${props._acTab.activeTabSection == index ? "text-white bg-gray-900 active" : "text-gray-500 hover:text-gray-600 hover:bg-gray-100  " }  inline-block rounded-t-lg   `}>{section}</a>
                                    </li>
                                </>
                            )  
                        })}
                        {props._acTab.tabButtons.length>0 && props._acTab.tabButtons[props._acTab.activeTabSection] ? props._acTab.tabButtons[props._acTab.activeTabSection].map((button,index)=>{
                        let buttonType = 
                        props._acTab.tabButtonType &&
                        props._acTab.tabButtonType[props._acTab.activeTabSection] &&
                        props._acTab.tabButtonType[props._acTab.activeTabSection][index]
                            ? props._acTab.tabButtonType[props._acTab.activeTabSection][index]
                            : "ADD_BUTTON";
                        return(<>                        
                                <InputFields.TabButton type={buttonType} clickButton={props._acTab.setModalToggle} placeholder={windowWidth<700?"Add":button} />
                            </>)
                        }):<></>}
                    </ul>   
                </>}           
               
            </div>
        </nav>
        
        </>
    )
}

Tabs.Tab = Tab;

export { Tabs, Tab };
