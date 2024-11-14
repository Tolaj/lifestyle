import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import HeroIcon, { heroIcons, heroIconsNames }  from 'utils/heroIcon';

const InputFields = () => {};

const Text = (props) => {
    return(<>
        <div className={`${props.style? props.style:""} `}>
          <label for="name" className={` block mb-2 text-sm font-medium text-gray-900 dark:text-white`}>{props.label?props.label:"Name"}</label>
          <input type="text" name={props.name} onChange={props.onChange?props.onChange:()=>{}}  value = {props.value?props.value:null} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 " placeholder={props.placeholder?props.placeholder:"Jehiro"} required=""/>
        </div>
    </>)
}


const Password = (props) => {
    return(<>
        <div>
          <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{props.label?props.label:"Password"}</label>
          <input type="password" name={props.name} onChange={props.onChange?props.onChange:()=>{}} value = {props.value?props.value:null} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 " placeholder={props.placeholder?props.placeholder:"******"} required=""/>
        </div>
    </>)
}

const Email = (props) => {
    return(<>
        <div>
          <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{props.label?props.label:"Email"}</label>
          <input type="email" name={props.name} onChange={props.onChange?props.onChange:()=>{}} value = {props.value?props.value:null} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 " placeholder={props.placeholder?props.placeholder:"jehiro@example.com"} required=""/>
        </div>
    </>)
}


const Button = (props) => {
    return(<>
        <button onClick={props.onClick} type={props.type?props.props:"submit"} className={` w-full text-white  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center  ${props.styleBg?props.styleBg:"bg-blue-600 hover:bg-blue-700 focus:ring-blue-300"}`}>{props.label}</button>
    </>)
}

const NoticeTag = (props) => {
    return(<>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">{props.label?props.label:"Not sure what to input?"} <a
                className="font-bold text-black  hover:underline dark:text-black" href="#">{props.srcLabel?props.srcLabel:"Try Help"}</a>
            </p>    
        </>)
}

const Select = (props) => {
    return(<>
        <div>
          <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{props.label?props.label:"Name"}</label>
          <select name={props.name} onChange={props.onChange?props.onChange:()=>{}}  value = {props.value?props.value:null} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 " placeholder={props.placeholder?props.placeholder:"Jehiro"} required="">
                <option >Choose a option</option>
               {props.options.map((option,index)=>{
                return(<>
                    <option value={props.optionValues[index]} >{option}</option>
                </>)
               })}
               
            </select>
        </div>
    </>)
}

const GridSelect = (props) => {
    const [showSelect,setShowSelect] = useState(0)
    const [optionSelect, setOptionSelect] = useState(props.value || '');
    const dropdownRef = useRef(null); 

    useEffect(() => {
       
            if(props.value){
                if(props.name=='icon'){
                    heroIconsNames.includes(props.value)?setOptionSelect(<HeroIcon style="" iconTitle = {props.value} />):setOptionSelect(<HeroIcon style="" iconTitle = {"ExclamationTriangleIcon"} />)
                    
                }else if(props.name == 'color'){
                    setOptionSelect( <div className={`${props.value} rounded-full w-4 h-4 `}></div>)
                }else{
                    setOptionSelect(props.value) 
                }
            }else{
                return null
            }
        
        
    }, [props.value]);

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (!dropdownRef.current?.contains(event.target)) {
            setShowSelect(false); // Close the dropdown if clicked outside
          }else{
            setShowSelect(true);
          }
        };
        
        // Add event listener for clicks
        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
          // Clean up the event listener on unmount
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [dropdownRef]);

      
    return(<>
        <div  className='relative'  >
          <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{props.label?props.label:"Name"}</label>
          
            <div ref={dropdownRef}   id="name" className="bg-gray-50 border hover:cursor-default  border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 min-h-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 "> {props.placeholder && !optionSelect ?props.placeholder:optionSelect}
                <svg onClick={()=>{setShowSelect(1)}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-6 absolute top-[50%] right-[10px]">
                    <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                </svg>
            
                <div  className={` ${showSelect?"block":"hidden"} overflow-y-auto  absolute left-0 z-50 w-full max-h-48 md:max-h-52 -ml-2  -mt-7 origin-top-left bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-xl focus:outline-none`} >
                        <div className="py-1 bg-gray-200 grid grid-cols-6  drop-shadow-2xl rounded-md" >
                            {props.options.map((option,index)=>{
                                return(<>
                                    <div onClick={()=>{props.onClick({"target":{"name":props.name,"value":props.optionValues[index]}});setOptionSelect(option);setShowSelect(0);}} key={index} name="icon" value="value" className="  text-center items-center justify-center flex mx-2 py-1 text-sm  hover:bg-blue-200 text-gray-700  rounded-md" >{option}</div>
                                </>)
                            })}
                        </div>
                </div>            
            </div>
          
        </div>
    </>)
}

const CheckBoxSelect = (props) => {
    const [showSelect,setShowSelect] = useState(0)
    const [optionSelect, setOptionSelect] = useState(props.value || '');
    const dropdownRef = useRef(null); 

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (!dropdownRef.current?.contains(event.target)) {
            setShowSelect(false); // Close the dropdown if clicked outside
          }else{
            setShowSelect(true);
          }
        };
        
        // Add event listener for clicks
        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
          // Clean up the event listener on unmount
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [dropdownRef]);

    const handleCheckboxChange = (option,index) => {
        // Create an array of checked values based on the current props
        const currentCheckedNames = props.options.filter((opt, i) => 
            document.getElementById(`checkbox-item-${i}`).checked
        );
        const currentCheckedValues = props.optionValues.filter((opt, i) => 
            document.getElementById(`checkbox-item-${i}`).checked
        );
        setOptionSelect(currentCheckedNames)
        props.onClick({
            target: {
                name: props.name,
                value: currentCheckedValues // Array of checked values
            }
        });
    };
      
    return(<>
        <div  className='relative'  >
          <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{props.label?props.label:"Name"}</label>
          
            <div  ref={dropdownRef}  id="name" className="bg-gray-50 border hover:cursor-default  border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 min-h-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 ">{props.placeholder && !optionSelect ?props.placeholder:optionSelect.map((item,i)=>{ if(i==0){return item}else{return ", "+item } })}
                {/* <svg onClick={()=>{setShowSelect(1)}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-6 absolute top-[50%] right-[10px]">
                    <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                </svg> */}
            {/* onClick={()=>{props.onClick({"target":{"name":props.name,"value":props.optionValues[index]}});setOptionSelect(option);setShowSelect(0);}} */}
                <div  className={` ${showSelect?"block":"hidden"} overflow-y-auto  absolute left-0 z-50 w-full max-h-48 md:max-h-52 -ml-2  -mt-7 origin-top-left bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-xl focus:outline-none`} >
                        <div className="py-2 bg-gray-200 px-2 flex gap-2 flex-col drop-shadow-2xl rounded-md" >
                            {props.options.map((option,index)=>{
                                return(<>
                                    <div  key={index} class="flex items-center rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                        <input onClick={()=>{handleCheckboxChange(index)}} id={"checkbox-item-"+index} type="checkbox"  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label for="checkbox-item-11" class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">{option}</label>
                                    </div>
                                </>)
                            })}
                        </div>
                </div>            
            </div>
          
        </div>
    </>)
}

const TabButton = (props) => {
    switch (props.type) {
        case "ADD":
            return(<>
                    <div className="text-center ">
                        <button type="submit" onClick={()=>{props.clickButton(props.route)}} className={` ${props.className} md:px-6 md:py-4 px-3 py-2 md:gap-3 gap-1 shadow-lg md:shadow-none bg-white flex items-center  text-black active:bg-slate-200 text-sm font-medium  rounded-full  hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-fit ease-linear transition-all duration-150`} >
                            <div>
                                {props.placeholder}
                            </div>                                        
                            <div>
                            {/* text-[#F0BD66] */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="text-black w-4 h-4 font-block" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </div>
                        </button>
                    </div>    
                </>)
        case "CART":
            return(<>
                    <div className="text-center ">
                        <button type="submit" onClick={()=>{props.clickButton(props.route)}} className={` ${props.className} md:px-6 md:py-4 px-3 py-2 md:gap-3 gap-1 shadow-lg md:shadow-none bg-white flex items-center  text-black active:bg-slate-200 text-sm font-medium  rounded-full  hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-fit ease-linear transition-all duration-150 `}>
                            <div>
                                {props.placeholder}
                            </div>                                        
                            <div className='flex items-center'>
                            {/* text-[#F0BD66] */}
                                
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" strokeWidth="3" className="text-black w-4 h-4 font-block">
                                    <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                                </svg>
                                &nbsp;0  
                            </div>
                        </button>
                    </div>    
                </>)
        case "GROUP":
            return(<>
                    <div className="text-center ">
                        <button type="submit" onClick={()=>{props.clickButton(props.route)}} className={` ${props.className} md:px-6 md:py-4 px-3 py-2 md:gap-3 gap-1 shadow-lg md:shadow-none bg-white flex items-center  text-black active:bg-slate-200 text-sm font-medium  rounded-full  hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-fit ease-linear transition-all duration-150 `}>
                            <div>
                                {props.placeholder}
                            </div>                                        
                            <div className='flex items-center'>
                            {/* text-[#F0BD66] */}
                    
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="text-black w-4 h-4 font-block">
                                    <path fill-rule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z" clip-rule="evenodd" />
                                    <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
                                </svg>

                            </div>
                        </button>
                    </div>    
                </>)
        default:
            return(<>No Button</>)
    
}}

const GridButton = (props) => {

    switch (props.type) {
        case "ADD_USER":
            return(<>
                    <div title={props.title} onClick={props.onClick}  className={`${props.className}`} >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-black hover:cursor-pointer">
                            <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
                        </svg>
                    </div>  
                </>)
        case "RM_USER":
            return(<>
                   <div title={props.title} onClick={props.onClick}  className={`${props.className}`} >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-black hover:cursor-pointer">
                            <path d="M10.375 2.25a4.125 4.125 0 1 0 0 8.25 4.125 4.125 0 0 0 0-8.25ZM10.375 12a7.125 7.125 0 0 0-7.124 7.247.75.75 0 0 0 .363.63 13.067 13.067 0 0 0 6.761 1.873c2.472 0 4.786-.684 6.76-1.873a.75.75 0 0 0 .364-.63l.001-.12v-.002A7.125 7.125 0 0 0 10.375 12ZM16 9.75a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5h-6Z" />
                        </svg>
                    </div>  
                </>)
        case "DELETE":
            return(<>
                   <div title={props.title} onClick={props.onClick}  className={`${props.className}`} >          
                        <svg className="w-6 h-6 text-black hover:cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" >
                            <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                        </svg>
                    </div> 
                </>)
        case "ARROW":
            return(<>
                    <svg title={props.title} onClick={props.onClick}  className={`${props.className}`}  xmlns="http://www.w3.org/2000/svg"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M9 6l6 6l-6 6"></path>
                    </svg>
                </>)
        case "EDIT":
            return(<>
                    <svg  title={props.title} onClick={props.onClick}  className={`${props.className}`}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" >
                        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                        <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                    </svg>
                </>)
        default:
            return(<><div className='bg-black text-white text-xs p-1 rounded-xl'>No Button Type Provided</div></>)
    
}}

const TabButtonMobile = (props) => {
    const router = useRouter()
    switch (props.type) {
        case "ADD":
            return(<>
        <div className="text-center ">
            <button type="submit" onClick={()=>{props.clickButton(router.route)}} className=" md:px-6 md:py-4 px-3 py-2 md:gap-3 gap-1 shadow-lg md:shadow-none bg-white flex items-center  text-black active:bg-slate-200 text-sm font-medium  rounded-full  hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-fit ease-linear transition-all duration-150">
                <div>
                    {props.placeholder}
                </div>                                        
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="text-[#F0BD66] w-4 h-4 font-block" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </div>
            </button>
        </div>    
    </>)
        default:
            return(<>No Button</>)
    
}}




InputFields.Text = Text
InputFields.Password = Password
InputFields.Email = Email
InputFields.Button = Button
InputFields.NoticeTag = NoticeTag
InputFields.TabButton = TabButton
InputFields.Select = Select
InputFields.GridSelect = GridSelect
InputFields.CheckBoxSelect = CheckBoxSelect
InputFields.GridButton = GridButton

export default InputFields;