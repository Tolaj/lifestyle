import GridBody from 'components/Cards/GridBody';
import SmCardBody from 'components/Cards/SmCardBody';
import SmGridBody from 'components/Cards/SmGridBody';
import InputFields from 'components/InputFields';
import React, { useEffect, useState } from 'react';
import HeroIcon, { heroIconsNames } from 'utils/heroIcon';

function OrderList(props) {
  const [windowWidth, setWindowWidth] = useState(null);
  const [showItems, setShowItems] = useState(null);

  useEffect(() => {
      setWindowWidth(window.outerWidth)
  },[]) 

  
  const dataFilter = (params) => {
    let myGroup = params?._as?.user?.groups?.find((data) => data._id === localStorage.getItem('projectLifestyle_activeGroup'))
    return params.data.filter((data) => myGroup.orders.includes(data._id));
  }

  const IconComponent = (params) => {
    return(<>
        <span className={`flex items-center justify-center w-10 h-10 shrink-0 rounded-full ${params.data?.color || params.data?.category?.color || 'bg-black'} text-black `} >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-white">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
          </svg>
        </span>
      </>)
  }
  const columnComponentPaidBy = (params) => {
    return( <>{params.data.paidBy.name}</>)
  }
  const columnComponentCreatedBy = (params) => {
    return( <>{params.data.createdBy.name}</>)
  }
  const columnComponentItems = (params) => {

    return(<>
      <div onClick={()=>{setShowItems(!showItems)}} className='w-full h-6 border-2 rounded-xl my-1 hover:bg-gray-100 flex items-center justify-center'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class={`size-5 ${showItems?"rotate-180":"rotate-0"} `}>
          <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
        </svg>
      </div>
      <div className={` ${showItems?"":"hidden"}  divide-y  `}>
        {params.data.items.map((item,index)=>{
            return(<>
            <div className='grid grid-cols-5 divide-x'>
              <div className={` ${index!=0?"hidden":""} text-gray-400 pl-1 `}>
                Product
              </div>
              <div className={` ${index!=0?"hidden":""} text-gray-400 pl-1`}>
                Price
              </div>
              <div className={` ${index!=0?"hidden":""} text-gray-400 pl-1`}>
                Unit
              </div>
              <div className={` ${index!=0?"hidden":""} text-gray-400 pl-1`}>
                Count
              </div>
              <div className={` ${index!=0?"hidden":""} text-gray-400 pl-1`}>
                Split 
              </div>
              <div className='pl-1'>
                {item.product.name} 
              </div>
              <div className='pl-1'>
                {item.price}
              </div>
              <div className='pl-1'>
                {item.unit}
              </div>
              <div className='pl-1'>
                {item.count}
              </div>
              <div className='pl-1'>
                {item.splitAmong.map((split)=>{
                  return(<>
                    <div className=''>
                      {split.name}
                    </div>
                  </>)
                })}
              </div>
            </div>
              
            </>)
        })}
      </div>
    </>)
  }

   const ColumnComponentTotalPrice = (params) => {
        return (<>
          {
            params.readMore == params?.index+'i' ? 
              <span >
                  $ {params.data.totalPrice} 
              </span>
            :
            <div className={`divide-x divide-gray-200 mt-auto `}>
              <span className="inline-block px-3 text-xs leading-none text-gray-400 font-normal first:pl-0">
                  $ {params.data.totalPrice} 
              </span>
              <span className="inline-block px-3 text-xs leading-none text-gray-400 font-normal first:pl-0" >
                {params.data.date} 
              </span>
            </div>
           }
        </>);
      };
      
  const ActionsComponent = (params) => {

    // const handleAction = async (method,data) => {
    //     try {
    //         const response = await FetchAPI('/api/products', method, data);
    //         params.setPreLoader(false)
    //         params._as.setReloadChild(Math.random())
    //     } catch (error) {
    //         console.error("Error deleting data:", error);
    //     }

    // };
    
    return (<>
                    <div   className="flex items-center justify-center md:h-full gap-1 md:w-full md:gap-4">
                        {/* <InputFields.GridButton title="Add to cart" type="ADD_CART"  
                            onClick={() => {
                              props._as.setToast((prevToast) => {                              
                                return `${(typeof prevToast === 'string' ? parseInt(prevToast.split(' ')[0], 10) : 0) + 1} Item(s) added to cart successfully!`;
                              });
                              props._as.setCart((prevCart) => [...prevCart, { ...params.data }])}
                            } 
                          className="w-6 h-6 text-black hover:cursor-pointer" />
                        <InputFields.GridButton title="Edit" type="EDIT"  onClick={()=>{params._as.setModalToggle(router.route);params.setFormData(params.data)}} className="w-6 h-6 text-black hover:cursor-pointer" />
                        <InputFields.GridButton title="Delete" type="DELETE"  onClick={()=>{params.setPreLoader(true);handleAction("DELETE",{"_id":params.data._id})}}  className={`flex items-center justify-center gap-2 hover:cursor-pointer text-black font-semibold`}/> */}
                        <InputFields.GridButton title="Edit" type="ARROW" onClick={()=>{params.setReadMore(params.readMore==params.index+'i'?null:params.index+'i')}} className={`w-5 h-5 md:hidden  text-black ${params.readMore == params.index+'i' ?"rotate-90":""}`}/>
                    </div>
        </>);
  };

  if(windowWidth<700){
    return(<>
      <SmCardBody columns = {['name','totalPrice','items','date','paidBy','createdBy']} columnComponents = {['',ColumnComponentTotalPrice,columnComponentItems,'',columnComponentPaidBy,columnComponentCreatedBy]} ActionsComponent = {ActionsComponent} setFormData={props._as.setCategoryData}  IconComponent={IconComponent}   _as = {props._as} dataFilter={dataFilter} gridApi = {process.env.SERVER_API+"/api/orders"} />
    </>)
  }else{
    const columnComponentName = (params) => {
      return(<>
        <div className="flex items-center justify-start gap-2">
          <div onClick={()=>{params.setGroupGrid((prev)=>prev!=-1?prev==params.rowIndex?-1:params.rowIndex:params.rowIndex)}} title="Drop down" className="hover:bg-black hover:bg-opacity-10 hover:rounded-md hover:cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class={`w-5 h-5 ${params.groupGrid()==params.rowIndex?'rotate-90':''} `}>
              <path fill-rule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
            </svg>
          </div>
          {params.value}
        </div>
        </>)
    }
    const columnComponentPaidBy = (params) => {
      return( <>{params.data.paidBy.name}</>)
    }
    const columnComponentCreatedBy = (params) => {
      return( <>{params.data.createdBy.name}</>)
    }
    const columnComponentItems = (params) => {
      // return( <>{JSON.stringify(params.data.items)}</>)
      
      const columnComponentItemProduct = (subParams) => {
        return subParams?.data?.product?.name
      }
      const columnComponentItemSplitAmong = (subParams) => {
        console.log(subParams)
        const names = subParams.data.splitAmong.map(person => person.name);
        return(<>
          <div className='flex gap-2 divide-x-2   '>
            {names.map((name, index) =>{
              return(<div className='px-1' key={index}>{name}</div>)
            })}
          </div>
        </>)
      }

      
      return(<>
          <div>{params?.data?.items?.length}</div>
          {/* this element is there to just span space for grid  */}
          <div className={` ${params.groupGrid()==params.rowIndex?"invisible pt-10 pb-2":"hidden"} `}>
            <div class="relative overflow-x-auto">
              <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                          <th scope="col" class="px-6 py-3 rounded-s-lg">
                              Product
                          </th>
                          <th scope="col" class="px-6 py-3">
                              Price
                          </th>
                          <th scope="col" class="px-6 py-3 rounded-e-lg">
                              Unit
                          </th>
                          <th scope="col" class="px-6 py-3 rounded-e-lg">
                              Count
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                  {params.data.items.map((item,index)=>{
                    return(<>
                      <tr class="bg-white dark:bg-gray-800">
                          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {item.product.name}
                          </th>
                          <td class="px-6 py-4">
                            $ {item.price}
                          </td>
                          <td class="px-6 py-4">
                            {item.unit}
                          </td>
                          <td class="px-6 py-4">
                            {item.count}
                          </td>
                      </tr>
                    </>)
                  })}

                  </tbody>
                 
              </table>
            </div>
          </div>
         
          <div className={` ${params.groupGrid()==params.rowIndex?"absolute top-10 -left-8":"hidden"} `}>
            <SmGridBody columns = {['product','price','count','unit','splitAmong']} columnComponents = {[columnComponentItemProduct,"","","",columnComponentItemSplitAmong]}  _as = {props._as} dataFilter={dataFilter} gridData = {params.data.items} />
          </div>

        </>)
    }
    return (<>
      <GridBody columns = {['name','items','totalPrice','date','paidBy','createdBy',]} columnComponents = {[columnComponentName,columnComponentItems,'','',columnComponentPaidBy,columnComponentCreatedBy]} setFormData={props._as.setCategoryData} colProps={['',{autoHeight:true}]}  _as = {props._as} dataFilter={dataFilter} gridApi = {process.env.SERVER_API+"/api/orders"} />
    </>);
  }
  
}

export default OrderList;