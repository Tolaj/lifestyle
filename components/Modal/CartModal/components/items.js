import React from 'react';
import HeroIcon from 'utils/heroIcon';

function Items(props) {
    
   if(Object.keys(tempData).length > 0){
                    // { Object.keys(tempData).length > 0 ? Object.entries(tempData).map(([key, product], index) => {
    Object.entries(tempData).map(([key, product], index) => {   
      return(<>
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
                          <p class="ml-4">$ {product.price}</p>
                        </div>
                        <div className="text-sm  flex gap-8">
                            <div className="flex flex-col">
                              <div className="flex w-36 justify-between">
                                <div>Price</div>
                                <div  className="flex items-center w-7/12">
                                
                                  <svg  onClick={()=>{handleChange({"target":{"name":"price","value":(parseFloat(product.price) - 0.05).toFixed(2)}},key)}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5 flex-shrink-0 hover:cursor-pointer   ">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM6.75 9.25a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5h-6.5Z" clip-rule="evenodd" />
                                  </svg>
                                  {
                                    isVisible1?
                                    <input
                                    // ref={refs1[index]}
                                      type="text"
                                      name='price'
                                      
                                      value={product.price}  
                                      onChange={(e)=>{handleChange(e,key)}}
                                      style={{ width: '100%', padding: '0px 0 0 6px' }}
                                      className="UCOQS_price min-w-8 rounded-md text-xs "
                                    /> :
                                    
                                    <div onClick={()=>{setIsVisible1(1)}} className=' hover:cursor-text w-full flex items-center justify-center  flex-grow'> {product.price}</div>
                                  }
                                  
                                  <svg onClick={()=>{handleChange({"target":{"name":"price","value":(parseFloat(product.price) + 0.05).toFixed(2)}},key)}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 flex-shrink-0 hover:cursor-pointer  ">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z" clip-rule="evenodd" />
                                  </svg>
                                </div>
                              </div>
                              {/* <div className="flex w-36 justify-between">
                                <div>Unit</div>
                                <div  className="flex items-center w-7/12 ">
                                
                                  <svg  onClick={()=>{handleChange({"target":{"name":"unit","value":(parseFloat(product.unit) - 1).toFixed(0)}},key)}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5 flex-shrink-0 hover:cursor-pointer   ">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM6.75 9.25a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5h-6.5Z" clip-rule="evenodd" />
                                  </svg>
                                  {
                                    isVisible2?
                                    <input
                                    ref={ref2}
                                      type="text"
                                      name='unit'
                                      value={product.unit}  
                                      onChange={(e)=>{handleChange(e,key)}}
                                      style={{ width: '100%', padding: '0px 0 0 6px' }}
                                      className=" min-w-8 rounded-md text-xs "
                                    /> :

                                    <div onClick={()=>{setIsVisible2(1)}} className=' hover:cursor-text w-full flex items-center justify-center  flex-grow'> {product.unit}</div>
                                  }
                                  
                                  <svg onClick={()=>{handleChange({"target":{"name":"unit","value":(parseFloat(product.unit) + 1).toFixed(0)}},key)}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 flex-shrink-0 hover:cursor-pointer  ">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z" clip-rule="evenodd" />
                                  </svg>
                                </div>
                              </div> */}
                              
                            </div>
                            
                            {/* <div className="flex flex-col relative">
                              <div>Split Among</div>
                              
                              <div onClick={() => setIsVisible4(1)}  className=" absolute hover:cursor-pointer justify-around items-center flex w-full mt-6   px-2 py-1  text-xs text-white bg-black rounded-md">
                                  <span className=""> {product.splitAmong.length == activeGroupMembers.length?"Even":"Uneven"} </span>
                                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                  </svg>
                              </div>
                              <div ref={ref4} id="dropdownDefaultCheckbox" className={`${isVisible4 ? "mt-8" : "hidden"}  z-10 absolute w-40 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}>
                                  <ul className="p-3 space-y-3 shadow-xl text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownCheckboxButton">
                                      {activeGroupMembers.map((member, index) => {
                                          return (
                                              <li key={index}>
                                                  <div className="flex items-center">
                                                      <input
                                                          checked={product.splitAmong.includes(member._id)}
                                                          onChange={(e) =>  handleChange(e,key,member._id)} 
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
                            </div> */}
                        </div>
                        {/* <p class="mt-1 text-sm text-gray-500">Price {product.price}</p> */}
                      </div>
                      <div class="flex flex-1 items-end justify-between text-sm  ">
                        {/* <div className="flex w-36 justify-between ">
                                <div>Count</div>
                                <div  className="flex items-center w-7/12">
                                
                                  <svg onClick={()=>{handleChange({"target":{"name":"count","value":(parseFloat(product.count) - 1).toFixed(0)}},key)}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5 flex-shrink-0 hover:cursor-pointer   ">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM6.75 9.25a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5h-6.5Z" clip-rule="evenodd" />
                                  </svg>
                                  {
                                    isVisible3?
                                    <input
                                      ref={ref3}
                                      type="text"
                                      name='count'
                                      value={product.count}  
                                      onChange={(e)=>{handleChange(e,key)}}
                                      style={{ width: '100%', padding: '0px 0 0 6px' }}
                                      className=" min-w-8 rounded-md text-xs "
                                    /> :
                                    
                                    <div onClick={()=>{setIsVisible3(1)}} className=' hover:cursor-text w-full flex items-center justify-center  flex-grow'> {product.count}</div>
                                  }
                                  
                                  <svg onClick={()=>{handleChange({"target":{"name":"count","value":(parseFloat(product.count) + 1).toFixed(0)}},key)}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 flex-shrink-0 hover:cursor-pointer  ">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z" clip-rule="evenodd" />
                                  </svg>
                                </div>
                        </div> */}

                        <div class="flex">
                          <div onClick={()=>{handleChange({"target":{"name":"count","value":'0'}},key)}}  class="font-medium text-red-600 hover:text-red-500 hover:cursor-pointer">Remove</div>
                        </div>
                      </div>
                    </div>
                  </li>
      </>)
     })              
   }else{
    return(<></>)
   }

}

export default Items;