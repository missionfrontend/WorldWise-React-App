import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { useContext, useEffect, useState } from "react";
import { CityContexts } from "../Contexts/CityProvider";
import Button from "./Button";
import { useGeolocation } from "../Hooks/Geolocation";
import { useUrlPosition } from "../Hooks/useUrlPosition";

function Map() {
  const [lat,lng] = useUrlPosition()
  const navigate = useNavigate();
  const [mapPosition, setmapPosition] = useState([40, 0]);
  
  const { cities } = useContext(CityContexts);
  const {position:geolocationposition,getPosition,isLoading} = useGeolocation()
  useEffect(
    function () {
      if (lat && lng) setmapPosition([lat, lng]);
    },
    [lat,lng]
  );
  useEffect(function(){
   if(geolocationposition) setmapPosition([geolocationposition.lat,geolocationposition.lng])
  },[geolocationposition])
  return (
    <div className={styles.mapContainer}>
      <Button type="position" onClick={getPosition}>{isLoading ? "is Loading..." : "Use Your Position"}</Button>
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.mapContainer}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>
                {city.emoji} <span>{city.cityName}</span>
              </span>
            </Popup>
          </Marker>
        ))}
        <Changeposition position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}
function Changeposition({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick(){
  const navigate = useNavigate()

  useMapEvents({click:(e)=> {navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)}})
}
export default Map;
