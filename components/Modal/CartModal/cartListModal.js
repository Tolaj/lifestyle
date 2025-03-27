import React, { useEffect, useRef, useState } from "react";
import Modal from "../components/Modal";
import FetchAPI from "controllers/fetchAPI";
import HeroIcon from "utils/heroIcon";
import { getUserGroupDetails, useClickOutside } from "utils/helperFunctions";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";



function CartListModal(props) {
  const [checkoutData, setCheckoutData] = useState({})
  const router = useRouter()
  const [tempData, setTempData] = useState(() => {
    const cart = props?._as?.cart || [];
    return groupAndCountProducts(cart);
  });
  const { activeGroupMembers } = getUserGroupDetails(props._as.user, localStorage.getItem("projectLifestyle_activeGroup"));

  useEffect(()=>{
    if(props?._as?.cart.length>0){
      if(JSON.parse(localStorage.getItem("projectLifestyle_cart_checkout"))?.name){
        let tempCheckout = JSON.parse(localStorage.getItem("projectLifestyle_cart_checkout"))
        
        tempCheckout.items = Object.values(tempData).map(product => ({
          product: product._id,  
          unit: String(product.unit || '0'),   
          price: String(product.price || '0'),   
          splitType: product.splitType || 'equal',  
          splitAmong: product.splitAmong || [],  
          count: String(product.count || '0'),  
        }));       

        tempCheckout.totalPrice = parseFloat(Object.values(tempData).reduce((total, product) => total + (product.price * product.count || 0), 0)).toFixed(2)
        setCheckoutData(tempCheckout)
      }else{
        let tempItems =  Object.values(tempData).map(product => ({
          product: product._id,  
          unit: String(product.unit || '0'),   
          price: String(product.price || '0'),   
          splitType: product.splitType || 'equal',  
          splitAmong: product.splitAmong || [],  
          count: String(product.count || '0'),  
        }));  
        setCheckoutData({"name":"order-"+Math.floor(Math.random() * 10000) ,"paidBy":props._as.user._id,"createdBy":props._as.user._id,"totalPrice":parseFloat(Object.values(tempData).reduce((total, product) => total + (product.price * product.count || 0), 0)).toFixed(2),"date": new Date().toISOString().split("T")[0],"items":tempItems})
      }
    }else{
      setCheckoutData({})
    }
  },[tempData])

  useEffect(()=>{
    localStorage.setItem("projectLifestyle_cart_checkout",JSON.stringify(checkoutData));
  },[checkoutData])

  const handleChange = (e, key, memberId) => {
    const { name, value, checked } = e.target;
  
    setTempData((prevData) => {
      const updatedData = { ...prevData };
  
      if (updatedData[key]) {
        if (name == "count" && value < 1) {
          delete updatedData[key];
        } else {
          updatedData[key] = {
            ...updatedData[key],
            [name]:
              name === "splitAmong"
                ? checked
                  ? [...(updatedData[key].splitAmong || []), memberId]
                  : (updatedData[key].splitAmong || []).filter((id) => id !== memberId)
                : value,
          };
        }
      }
      const flattenData = unGroupAndFlattenProducts(updatedData)
      props._as.setCart(flattenData);
      const mergedData = groupAndCountProducts(flattenData)

      if(Object.keys(mergedData).length < Object.keys(updatedData).length){
        const userConfirmed = window.confirm("Multiple products with same properties wanna merge?");
        if (!userConfirmed) {
          return updatedData;  
        }
        return mergedData
      }else{
        return updatedData;
      }
    });
  };

  const handleChangeCheckout = (e) =>{
    const { name, value, checked } = e.target;

    setCheckoutData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const handleSave = async (endpoint) => {

    let additionalData = {
              ...checkoutData,
              ...{"groupId":localStorage.getItem("projectLifestyle_activeGroup")}
            }

    try {
      const result = await FetchAPI(process.env.SERVER_API+"/api/"+endpoint, 'POST', additionalData);
      if (result?.message == "Order created successfully") {
        let inventoryData = additionalData.items.map((item) => {
          return {
            
            product: item.product,            
            unit: item.unit,                
            price: item.price,               
            splitAmong: item.splitAmong,     
            quantityAvailable: item.count, 
            lastUpdated: additionalData.date,   
          };
        });
        let inventoryObject = {...{"inventoryData":[inventoryData]},...{"groupId": additionalData.groupId,}}
        await FetchAPI(process.env.SERVER_API+"/api/inventory", 'POST', inventoryObject);
      }

      setCheckoutData({})
      props._as.setCart([])
      props._as.setToast(endpoint=="orders"?"Order Placed successfully!":"Wish list created successfully!")
      props._as.setModalToggle(""); 
      props._as.setReloadChild(Math.random()); 
  
    } catch (error) {
      console.log('_____Upload failed!_____');
      console.log(error);
    }
  };

  const refs1 = Array(100).fill(null).map(() => useRef(null));
  const clickHandlers1 = refs1.map((ref, index) => useClickOutside(ref)); 
  const visibilityStates1 = clickHandlers1.map(handler => handler.isVisible);
  const setVisibilityStates1 = clickHandlers1.map(handler => handler.setIsVisible);

  const refs2 = Array(100).fill(null).map(() => useRef(null));
  const clickHandlers2 = refs2.map((ref, index) => useClickOutside(ref)); 
  const visibilityStates2 = clickHandlers2.map(handler => handler.isVisible);
  const setVisibilityStates2 = clickHandlers2.map(handler => handler.setIsVisible);

  const refs3 = Array(100).fill(null).map(() => useRef(null));
  const clickHandlers3 = refs3.map((ref, index) => useClickOutside(ref)); 
  const visibilityStates3 = clickHandlers3.map(handler => handler.isVisible);
  const setVisibilityStates3 = clickHandlers3.map(handler => handler.setIsVisible);

  const refs4 = Array(100).fill(null).map(() => useRef(null));
  const clickHandlers4 = refs4.map((ref, index) => useClickOutside(ref)); 
  const visibilityStates4 = clickHandlers4.map(handler => handler.isVisible);
  const setVisibilityStates4 = clickHandlers4.map(handler => handler.setIsVisible);

  const refs5 = useRef(null);
  const {isVisible:isVisible5,setIsVisible:setIsVisible5} = useClickOutside(refs5); 

  return(
    <div class="relative z-50" aria-labelled-by="slide-over-title" role="dialog" aria-modal="true">
      {/* <!--
      Background backdrop, show/hide based on slide-over state.

      Entering: "ease-in-out duration-500"
      From: "opacity-0"
      To: "opacity-100"
      Leaving: "ease-in-out duration-500"
      From: "opacity-100"
      To: "opacity-0"
      --> */}
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
          {/* <!--
            Slide-over panel, show/hide based on slide-over state.

            Entering: "transform transition ease-in-out duration-500 sm:duration-700"
              From: "translate-x-full"
              To: "translate-x-0"
            Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
              From: "translate-x-0"
              To: "translate-x-full"
          --> */}
            <div class="pointer-events-auto w-screen max-w-md">
              <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl ">
                {/* cart Header */}
                <div className="bg-white flex items-center justify-between px-6 py-4 border-b-2">
                  <h2 class="text-lg font-medium text-gray-900" id="slide-over-title">Shopping cart</h2>
                  <div>
                    <svg onClick={()=>{props._as.setModalToggle("")}} xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 hover:cursor-pointer hover:text-gray-400 rounded-full" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </div>
                </div>
                {/* cart List */}
                
                <div class="flex-1 overflow-y-auto px-4  sm:px-6 ">
                  <div class="mt-4">
                    <div class="flow-root">
                      <ul role="list" class="-my-6 divide-y divide-gray-200">
                      { Object.keys(tempData).length > 0 ? Object.entries(tempData).map(([key, product], index) => {
                            
                        return(
                        <li class="flex py-6">
                          <div class=" flex-shrink-0 overflow-hidden rounded-md flex items-center">
                            {/* <img src={product.imageUrl} alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." class="h-full w-full object-cover object-center"/> */}
                            <span className={`flex items-center justify-center w-10 h-10 shrink-0 rounded-full ${product?.category?.color || 'bg-black'} text-black `} >
                              <HeroIcon  style="size-6 text-black" iconTitle = {product?.category?.icon} />              
                            </span>
                          </div>

                          <div class="ml-4 flex flex-1 flex-col">
                            <div className=""> 
                              <div class="flex justify-between text-base font-semibold ">
                                <h3>
                                  <a href="#">{product.name}</a>
                                </h3>
                                <p class="ml-4">$ {parseFloat(product.price*product.count).toFixed(2)}</p>
                              </div>
                              <div className="text-sm  flex md:gap-8 gap-2">
                                  <div className="flex flex-col">
                                  <div className="flex md:w-36 w-28   justify-between">
                                      <div>Unit</div>
                                      <div  className="flex items-center w-8/12 md:w-7/12 ">
                                      
                                        {/* <svg  onClick={()=>{handleChange({"target":{"name":"unit","value":(parseFloat(product.unit) - 1).toFixed(0)}},key)}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5 flex-shrink-0 hover:cursor-pointer   ">
                                          <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM6.75 9.25a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5h-6.5Z" clip-rule="evenodd" />
                                        </svg> */}
                                        {
                                          // visibilityStates2[index]?
                                          false?
                                          <input
                                          ref={refs2[index]}
                                            type="text"
                                            name='unit'
                                            value={product.unit}  
                                            onChange={(e)=>{handleChange(e,key)}}
                                            style={{ width: '100%', padding: '0px 0 0 6px' }}
                                            className=" min-w-8 rounded-md text-xs "
                                          /> :

                                          <div onClick={()=>{setVisibilityStates2[index](1)}} className=' hover:cursor-text w-full flex items-center justify-center  flex-grow'> {product.unit}</div>
                                        }
                                        
                                        {/* <svg onClick={()=>{handleChange({"target":{"name":"unit","value":(parseFloat(product.unit) + 1).toFixed(0)}},key)}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 flex-shrink-0 hover:cursor-pointer  ">
                                          <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z" clip-rule="evenodd" />
                                        </svg> */}
                                      </div>
                                    </div>
                                    <div className="flex md:w-36 w-28  justify-between">
                                      <div>Price</div>
                                      <div  className="flex items-center w-8/12 md:w-7/12">
                                      
                                        <svg  onClick={()=>{handleChange({"target":{"name":"price","value":(parseFloat(product.price) - 0.05).toFixed(2)}},key)}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5 flex-shrink-0 hover:cursor-pointer   ">
                                          <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM6.75 9.25a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5h-6.5Z" clip-rule="evenodd" />
                                        </svg>
                                        {
                                          visibilityStates1[index]?
                                          <input
                                          ref={refs1[index]}
                                            type="text"
                                            name='price'
                                            value={product.price}  
                                            onChange={(e)=>{handleChange(e,key)}}
                                            style={{ width: '100%', padding: '0px 0 0 6px' }}
                                            className=" min-w-8 rounded-md text-xs "
                                          /> :
                                          
                                          <div onClick={()=>{setVisibilityStates1[index](1)}} className=' hover:cursor-text w-full flex items-center justify-center  flex-grow'> {product.price}</div>
                                        }
                                        
                                        <svg onClick={()=>{handleChange({"target":{"name":"price","value":(parseFloat(product.price) + 0.05).toFixed(2)}},key)}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 flex-shrink-0 hover:cursor-pointer  ">
                                          <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z" clip-rule="evenodd" />
                                        </svg>
                                      </div>
                                    </div>
                                    
                                    
                                  </div>
                                  
                                  <div className="flex flex-col relative">
                                    <div>Split Among</div>
                                    
                                    <div onClick={() => setVisibilityStates4[index](1)}  className=" absolute hover:cursor-pointer justify-around items-center flex w-full mt-6   px-2 py-1  text-xs text-white bg-black rounded-md">
                                        <span className=""> {product.splitAmong.length == activeGroupMembers.length?"Even":"Uneven"} </span>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                    <div ref={refs4[index]} id="dropdownDefaultCheckbox" className={`${visibilityStates4[index] ? "mt-8" : "hidden"}  z-10 absolute w-40 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}>
                                        <ul className="p-3 space-y-3 shadow-xl text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownCheckboxButton">
                                            {activeGroupMembers.map((member, indexM) => {
                                                return (
                                                    <li key={indexM}>
                                                        <div className="flex items-center">
                                                            <input
                                                                checked={product.splitAmong.includes(member._id)}
                                                                onChange={(e) =>  handleChange(e,key,member._id)} 
                                                                id={"checkbox-" + indexM}
                                                                type="checkbox"
                                                                name="splitAmong"
                                                                className="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded focus:ring-black  focus:ring-2 "
                                                            />
                                                            <label htmlFor={"checkbox-" + indexM} className="ms-2 text-sm font-medium text-gray-900 ">
                                                                {member.name}
                                                            </label>
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                  </div>
                              </div>
                            </div>
                            <div class="flex flex-1 items-end justify-between text-sm  ">
                              <div className="flex md:w-36 w-28  justify-between ">
                                      <div>Count</div>
                                      <div  className="flex items-center w-8/12 md:w-7/12">
                                      
                                        <svg onClick={()=>{handleChange({"target":{"name":"count","value":(parseFloat(product.count) - 1).toFixed(0)}},key)}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5 flex-shrink-0 hover:cursor-pointer   ">
                                          <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM6.75 9.25a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5h-6.5Z" clip-rule="evenodd" />
                                        </svg>
                                        {
                                          visibilityStates3[index]?
                                          <input
                                            ref={refs3[index]}
                                            type="text"
                                            name='count'
                                            value={product.count}  
                                            onChange={(e)=>{handleChange(e,key)}}
                                            style={{ width: '100%', padding: '0px 0 0 6px' }}
                                            className=" min-w-8 rounded-md text-xs "
                                          /> :
                                          
                                          <div onClick={()=>{setVisibilityStates3[index](1)}} className=' hover:cursor-text w-full flex items-center justify-center  flex-grow'> {product.count}</div>
                                        }
                                        
                                        <svg onClick={()=>{handleChange({"target":{"name":"count","value":(parseFloat(product.count) + 1).toFixed(0)}},key)}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 flex-shrink-0 hover:cursor-pointer  ">
                                          <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z" clip-rule="evenodd" />
                                        </svg>
                                      </div>
                              </div>

                              <div class="flex">
                                <div onClick={()=>{handleChange({"target":{"name":"count","value":'0'}},key)}}  class="font-medium text-red-600 hover:text-red-500 hover:cursor-pointer">Remove</div>
                              </div>
                            </div>
                          </div>
                        </li>
                            )
                        }):<></>}

                        {/* <!-- More products... --> */}
                      </ul>
                    </div>
                  </div>
                </div>
                {/* cart Footer */}
                <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div class="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>Rs.{checkoutData.totalPrice}</p>
                  </div>
                  
                  <div class="mt-0.5 flex gap-3 text-sm text-gray-500 w-full ">
                    <div className="w-1/3">
                      Order name
                      <input disabled={Object.values(tempData).length>0?0:1} className="w-[100%] border-2 px-2 text-black rounded-md " name="name" value={checkoutData.name?checkoutData.name:""} placeholder="order" onChange={(e) => handleChangeCheckout(e)} />                       
                    </div>
                    <div className="w-1/3">
                      Paid By
                      <select disabled={Object.values(tempData).length>0?0:1} name="paidBy" id="paidBy" value={checkoutData.paidBy?checkoutData.paidBy:""} placeholder="user" onChange={(e) => handleChangeCheckout(e)}  className="border-2 px-2 h-6 w-[100%] border-gray-200 text-sm py-0 text-black rounded-md" >
                        {activeGroupMembers.map((member, indexM) => {
                          return(<>
                            <option value={member._id}>{member.name}</option>
                          </>)
                        })}
                      </select>
                    </div>
                    <div className="w-1/3">
                      Date
                      <input disabled={Object.values(tempData).length>0?0:1} className="border-2 px-2 h-6 w-[100%] border-gray-200 text-sm py-0 text-black rounded-md" name="date" type="date" value={checkoutData.date?checkoutData.date:"---"} placeholder="date" onChange={(e) => handleChangeCheckout(e)} />                       
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-between gap-2">
                  <div class="mt-6 w-full">
                      <button 
                      onClick={()=>{
                        handleSave("orders")   
                      }}  
                      disabled={Object.values(tempData).length>0?0:1} class={` ${Object.values(tempData).length>0? '' : 'opacity-10'}  w-full flex items-center justify-center rounded-md border border-transparent bg-[#161616] px-2 py-3 text-base font-medium text-white shadow-sm hover:bg-[#2b2a2a]`}>Place Order</button>
                  </div>
                  <div class="mt-6  w-full">
                      <button 
                      onClick={()=>{
                        handleSave("wishlists")   
                      }}  
                      disabled={Object.values(tempData).length>0?0:1} class={` ${Object.values(tempData).length>0? '' : 'opacity-10'}  w-full flex items-center justify-center rounded-md border border-transparent bg-[#161616] px-2 py-3 text-base font-medium text-white shadow-sm hover:bg-[#2b2a2a]`}>Add to Wish List</button>
                  </div>
                  </div>
                  <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or&nbsp; 
                      <div onClick={()=>{router.route=='/admin/products'&&props._as.productsTab == 0?props._as.setModalToggle(""):router.push("/admin/products")}} type="button" class="font-medium hover:cursor-pointer text-black">
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </div>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function groupAndCountProducts(cart) {
  return cart.reduce((acc, product) => {
    // Serialize the splitAmong array to include it in the key
    const splitAmongKey = product.splitAmong?.join(",") || "none";
    const key = `${product._id}-${product.price}-${product.unit}-${splitAmongKey}`;

    if (!acc[key]) {
      acc[key] = {
        ...product,
        count: 0, // Initialize count
      };
    }
    acc[key].count += 1; // Increment count
    return acc;
  }, {});
}

function unGroupAndFlattenProducts(groupedProducts) {
  return Object.values(groupedProducts).reduce((acc, product) => {
    const count = product.count;
    
    for (let i = 0; i < count; i++) {
      acc.push(product);
    }
    return acc;
  }, []);
}

export default CartListModal;