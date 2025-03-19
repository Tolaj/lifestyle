import React, { useEffect, useRef, useState } from "react";
import Modal from "../components/Modal";
import FetchAPI from "controllers/fetchAPI";
import HeroIcon from "utils/heroIcon";
import { getUserGroupDetails, useClickOutside } from "utils/helperFunctions";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";



function CartWishListModal(props) {
  const [checkoutData, setCheckoutData] = useState({})
  const [categories, setCategories] = useState({})
  const router = useRouter()
  const [tempData, setTempData] = useState(() => {
    console.log("tempData", props?._as?.wishList);
    const cart = props?._as?.wishList ? JSON.parse(JSON.stringify(props?._as?.wishList)) : {};
    return cart;
  });
  const { activeGroupMembers } = getUserGroupDetails(props._as.user, localStorage.getItem("projectLifestyle_activeGroup"));

  useEffect(()=>{
    const fetchData = async () => {
      try {
        let data = await FetchAPI(process.env.SERVER_API+"/api/categories", 'GET');
        if (data ) {
          setCategories(dataFilter({data,_as:props._as}))
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchData();
  },[])

 

  const handleChange = (e, index, memberId) => {
    const { name, value, checked } = e.target;
  
    setTempData((prevState) => {
      const updatedState = { ...prevState };
  
      if (index >= 0) {

        if (name !== "splitAmong") {
          if (name == "count" && value < 1) {
            updatedState.items.splice(index, 1); 
          }else{
            updatedState.items[index][name] = value;
          }
          
          if (name === "count" || name === "price") {
            updatedState["totalPrice"] = parseFloat(
              updatedState.items.reduce((total, item) => {
                return total + (parseFloat(item.price) * parseInt(item.count) || 0);
              }, 0)
            ).toFixed(2);
          }
        }
  
        if (name === "splitAmong") {
          const splitAmong = [...updatedState.items[index].splitAmong];
          
          if (checked) {
            if (!splitAmong.find((member) => member._id === memberId)) {
              splitAmong.push({ _id: memberId });
            }
          } else {
            const memberIndex = splitAmong.findIndex((member) => member._id === memberId);
            if (memberIndex >= 0) {
              splitAmong.splice(memberIndex, 1);
            }
          }

          updatedState.items[index].splitAmong = splitAmong;
        }
      } else {
        updatedState[name] = value;
      }
  
      return updatedState;
    });
  };
  

  const handleSave = async (endpoint) => {

    let additionalData = {
              ...tempData,
              ...{"groupId":localStorage.getItem("projectLifestyle_activeGroup")}
            }

    try {
      const result = await FetchAPI(process.env.SERVER_API+"/api/"+endpoint, 'PUT', additionalData);
      setTempData({})
      props._as.setToast("Wish list created successfully!")
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
  const key = 2
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
                  <h2 class="text-lg font-medium text-gray-900" id="slide-over-title">Wish list cart</h2>
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
                      { tempData?.items?.length > 0 ? tempData?.items?.map((item, index) => {
                        
                        return(
                        <li class="flex py-6">
                          <div class=" flex-shrink-0 overflow-hidden rounded-md flex items-center">
                            {/* <img src={product.imageUrl} alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." class="h-full w-full object-cover object-center"/> */}
                            <span className={`flex items-center justify-center w-10 h-10 shrink-0 rounded-full ${categories.length>0? categories?.find(category => category._id === item?.product.category).color : 'bg-black'} text-black `} >
                              <HeroIcon  style="size-6 text-black" iconTitle = {categories.length>0?categories?.find(category => category._id === item?.product.category).icon:"ArrowDownCircleIcon"} />              
                            </span>
                          </div>

                          <div class="ml-4 flex flex-1 flex-col">
                            <div className=""> 
                              <div class="flex justify-between text-base font-semibold ">
                                <h3>
                                  <a href="#">{item.product.name}</a>
                                </h3>
                                <p class="ml-4">$ {parseFloat(item.price*item.count).toFixed(2)}</p>
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

                                          <div onClick={()=>{setVisibilityStates2[index](1)}} className=' hover:cursor-text w-full flex items-center justify-center  flex-grow'> {item.unit}</div>
                                        }
                                        
                                        {/* <svg onClick={()=>{handleChange({"target":{"name":"unit","value":(parseFloat(product.unit) + 1).toFixed(0)}},key)}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 flex-shrink-0 hover:cursor-pointer  ">
                                          <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z" clip-rule="evenodd" />
                                        </svg> */}
                                      </div>
                                    </div>
                                    <div className="flex md:w-36 w-28  justify-between">
                                      <div>Price</div>
                                      <div  className="flex items-center w-8/12 md:w-7/12">
                                      
                                        <svg  onClick={()=>{handleChange({"target":{"name":"price","value":(parseFloat(item.price) - 0.05).toFixed(2)}},index)}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5 flex-shrink-0 hover:cursor-pointer   ">
                                          <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM6.75 9.25a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5h-6.5Z" clip-rule="evenodd" />
                                        </svg>
                                        {
                                          visibilityStates1[index]?
                                          <input
                                          ref={refs1[index]}
                                            type="text"
                                            name='price'
                                            value={item.price}  
                                            onChange={(e)=>{handleChange(e,index)}}
                                            style={{ width: '100%', padding: '0px 0 0 6px' }}
                                            className=" min-w-8 rounded-md text-xs "
                                          /> :
                                          
                                          <div onClick={()=>{setVisibilityStates1[index](1)}} className=' hover:cursor-text w-full flex items-center justify-center  flex-grow'> {item.price}</div>
                                        }
                                        
                                        <svg onClick={()=>{handleChange({"target":{"name":"price","value":(parseFloat(item.price) + 0.05).toFixed(2)}},index)}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 flex-shrink-0 hover:cursor-pointer  ">
                                          <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z" clip-rule="evenodd" />
                                        </svg>
                                      </div>
                                    </div>
                                    
                                    
                                  </div>
                                  
                                  <div className="flex flex-col relative">
                                    <div>Split Among</div>
                                    
                                    <div onClick={() => setVisibilityStates4[index](1)}  className=" absolute hover:cursor-pointer justify-around items-center flex w-full mt-6   px-2 py-1  text-xs text-white bg-black rounded-md">
                                        <span className=""> {item.splitAmong.length == activeGroupMembers.length?"Even":"Uneven"} </span>
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
                                                            
                                                                checked={item?.splitAmong?.find(people => people._id === member._id)}
                                                                onChange={(e) =>  handleChange(e,index,member._id)} 
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
                                      
                                        <svg onClick={()=>{handleChange({"target":{"name":"count","value":(parseFloat(item.count) - 1).toFixed(0)}},index)}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5 flex-shrink-0 hover:cursor-pointer   ">
                                          <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM6.75 9.25a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5h-6.5Z" clip-rule="evenodd" />
                                        </svg>
                                        {
                                          visibilityStates3[index]?
                                          <input
                                            ref={refs3[index]}
                                            type="text"
                                            name='count'
                                            value={item.count}  
                                            onChange={(e)=>{handleChange(e,index)}}
                                            style={{ width: '100%', padding: '0px 0 0 6px' }}
                                            className=" min-w-8 rounded-md text-xs "
                                          /> :
                                          
                                          <div onClick={()=>{setVisibilityStates3[index](1)}} className=' hover:cursor-text w-full flex items-center justify-center  flex-grow'> {item.count}</div>
                                        }
                                        
                                        <svg onClick={()=>{handleChange({"target":{"name":"count","value":(parseFloat(item.count) + 1).toFixed(0)}},index)}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 flex-shrink-0 hover:cursor-pointer  ">
                                          <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z" clip-rule="evenodd" />
                                        </svg>
                                      </div>
                              </div>

                              <div class="flex">
                                <div onClick={()=>{handleChange({"target":{"name":"count","value":'0'}},index)}}  class="font-medium text-red-600 hover:text-red-500 hover:cursor-pointer">Remove</div>
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
                    <p>Rs.{tempData.totalPrice}</p>
                  </div>
                  
                  <div class="mt-0.5 flex gap-3 text-sm text-gray-500 w-full ">
                    <div className="w-1/3">
                      Order name
                      <input className="w-[100%] border-2 px-2 text-black rounded-md " name="name" value={tempData.name?tempData.name:""} placeholder="order" onChange={(e) => handleChange(e)} />                       
                    </div>
                    <div className="w-1/3">
                      Paid By
                      <select name="paidBy" id="paidBy" value={tempData.paidBy?tempData.paidBy._id:""} placeholder="user" onChange={(e) => handleChange(e)}  className="border-2 px-2 h-6 w-[100%] border-gray-200 text-sm py-0 text-black rounded-md" >
                        {activeGroupMembers.map((member, indexM) => {
                          return(<>
                            <option value={member._id}>{member.name}</option>
                          </>)
                        })}
                      </select>
                    </div>
                    <div className="w-1/3">
                      Date
                      <input  className="border-2 px-2 h-6 w-[100%] border-gray-200 text-sm py-0 text-black rounded-md" name="date" type="date" value={tempData.date?tempData.date:"---"} placeholder="date" onChange={(e) => handleChange(e)} />                       
                    </div>
                  </div>
                  <div class="mt-6 w-full">
                      <button 
                      onClick={()=>{
                        handleSave("wishlists")   
                      }}  
                       class={` ${Object.values(tempData).length>0? '' : 'opacity-10'}  w-full flex items-center justify-center rounded-md border border-transparent bg-[#161616] px-2 py-3 text-base font-medium text-white shadow-sm hover:bg-[#2b2a2a]`}>Save Changes</button>
                  </div>
              
                  {/* <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or&nbsp; 
                      <div onClick={()=>{router.route=='/admin/products'&&props._as.productsTab == 0?props._as.setModalToggle(""):router.push("/admin/products")}} type="button" class="font-medium hover:cursor-pointer text-black">
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </div>
                    </p>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function dataFilter (params) {
  let myGroup = params?._as?.user?.groups?.find((data) => data._id === localStorage.getItem('projectLifestyle_activeGroup'))
  return params.data.filter((data) => myGroup.categories.includes(data._id));
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

export default CartWishListModal;