import { useState,useRef,useMemo,useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup ,useMapEvents} from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';

const SelectLocation = ({position,setPosition,setShowMap,setLocation}) => {
  const center = {
    lat: 51.505,
    lng: -0.09,
  }
  const [marker,setMarker] = useState(null)
  function DraggableMarker() {
    const [draggable, setDraggable] = useState(false)
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current
          setMarker(marker)
          if (marker != null) {
            setPosition(marker.getLatLng())
          }
        },
      }),
      [],
    )
    const toggleDraggable = useCallback(() => {
      setDraggable((d) => !d)
    }, [])
  
    return (
      <Marker
        draggable={true}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}>
        <Popup minWidth={90}>
          <span onClick={toggleDraggable}>
            
               Drag marker to the desired location.
              
          </span>
        </Popup>
      </Marker>
    )
  }
// click and get lat,lang
  const LocationFinderDummy = () => {
    const map = useMapEvents({
        click(e) {
            setPosition(e.latlng)           
        },
    });
    return null;
};

const getLocation = ()=>{
    
  const latitude = position.lat; // Example latitude
const longitude = position.lng; // Example longitude

fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`)
.then(response => response.json())
.then(data => {
  console.log(data)
  setLocation(data)
  setShowMap(0)
})
.catch(error => {
  console.error(error);
});
}
  
  return(
    <div className='relative'>
<div className='absolute bottom-0 right-0 z-50 flex '>
      <button type="button" onClick={()=>{getLocation()}} className=" m-1  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Select Location</button>

  </div>
      <div className='z-0 relative'>
    <MapContainer center={center} zoom={13} scrollWheelZoom={true}  className='h-[400px] w-[890px] rounded-xl '>
       <LocationFinderDummy />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <DraggableMarker />
    </MapContainer>
    </div>
    </div>
    
  )
};

export default SelectLocation;
