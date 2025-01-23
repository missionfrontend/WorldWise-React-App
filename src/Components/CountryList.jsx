import styles from './CountryList.module.css' 
import CountryItem from './CountryItem';
import { useContext } from 'react';
import { CityContexts } from '../Contexts/CityProvider';

function CountryList(){
    const {cities} = useContext(CityContexts)
    const countries = cities.reduce((arr,city)=>
        {if(!arr.map(el=>el.country).includes(city.country))
            return [...arr,{country:city.country,emoji:city.emoji}];
        else return arr}
        ,[] )
    if(!countries.length){
            return <h2>👋Add Your Tour Country by clicking on Map</h2>
    }
    return <ul className={styles.countryList}>
         {countries.map((country)=><CountryItem country ={country} key ={country.country} />)}
    </ul>
}

export default CountryList;