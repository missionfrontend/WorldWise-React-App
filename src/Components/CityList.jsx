import styles from'./CityList.module.css'
import CityItem from './CityItem';
import { useContext } from 'react';
import { CityContexts } from '../Contexts/CityProvider';


function CityList(){
  const {cities} = useContext(CityContexts)
  if(!cities.length){
    return <h2>👋Add Your Tour Cities by clicking on Map</h2>
  }
    return (
        <ul className={styles.cityList}>
          {cities.map((city)=> <CityItem city ={city} key={city.id}/>)}
        </ul>
    )
}

export default CityList;