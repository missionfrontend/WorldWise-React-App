import styles from "./CountryItem.module.css"

function CountryItem({country}){
    return <li className={styles.countryItem}>
           <span>{country.emoji}</span>
           <h4>{country.country}</h4>
    </li>
}

export default CountryItem;