import { useContext } from "react";
import styles from "./CityItem.module.css";
import { Link, useParams } from "react-router-dom";
import { CityContexts } from "../Contexts/CityProvider";
const formatdate = (date)=> new Intl.DateTimeFormat("en",{
    day:"numeric",
    month:'long',
    year:'numeric',
}).format(new Date(date))

function CityItem({ city }) {
  
  const {currentCity,deleteCity} = useContext(CityContexts)
  const { date, cityName, emoji,id,position } = city;
  function handledeleteCity(e){
    e.preventDefault();
    deleteCity(id)
  }
  
  return <li  >
    <Link className={`${styles.cityItem} ${id === currentCity.id ? styles["cityItem--active"]: " "} `} to ={`${id}?lat=${position.lat}lng=${position.lng}`} >
    <p className={styles.emoji}>{emoji}</p>
    <h4 className={styles.name}>{cityName}</h4>
    <p className={styles.date}>{formatdate(date)}</p>
    <button className={styles.deleteBtn} onClick={handledeleteCity}>&#10008;</button>
    </Link>
  </li>;
}

export default CityItem;
