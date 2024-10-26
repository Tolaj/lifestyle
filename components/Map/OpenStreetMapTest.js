import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const OpenStreetMapTest = () => {
  const [center, setCenter] = useState({ lat: 30.043477, lng: 4.668205 })
  const ZOOM_LEVEL = 2.5
  const position = [51.505, -0.09]

  

  return (
    <>
      <MapContainer  center={center} zoom={ZOOM_LEVEL} scrollWheelZoom={false} style={{ height: "400px", borderRadius: "20px" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </>
  )
}

export default OpenStreetMapTest
