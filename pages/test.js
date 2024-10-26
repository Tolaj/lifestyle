import React from "react";
import dynamic from 'next/dynamic'

const OpenStreetMapTest = dynamic(() => import('../components/Map/OpenStreetMapTest'), {
    ssr: false,
  })

const Test = () =>{
    
    return(<div >
         <OpenStreetMapTest />
    </div>)
}

export default Test