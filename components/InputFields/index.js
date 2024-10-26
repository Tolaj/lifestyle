import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import HeroIcon, { heroIcons, heroIconsNames }  from 'utils/heroIcon';

const InputFields = () => {};

const Text = (props) => {
    return(<>
        <div>
          <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{props.label?props.label:"Name"}</label>
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
                <option  selected>Choose a country</option>
               {props.options.map((option,index)=>{
                return(<>
                    <option>{option}</option>
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
                    setOptionSelect( <HeroIcon style="" iconTitle = {props.value} />);
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

const TabButton = (props) => {
    const router = useRouter()
    switch (props.type) {
        case "ADD_BUTTON":
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

const TabButtonMobile = (props) => {
    const router = useRouter()
    switch (props.type) {
        case "ADD_BUTTON":
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

export default InputFields;