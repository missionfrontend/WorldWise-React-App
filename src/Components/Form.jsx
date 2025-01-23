// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useContext, useEffect, useState } from "react";
import Button from "./Button";
import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton"
import { useUrlPosition } from "../Hooks/useUrlPosition";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { CityContexts } from "../Contexts/CityProvider";
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [lat,lng] = useUrlPosition()
  const {addnewCity} = useContext(CityContexts)
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji,setemoji] = useState('')
  const [isLoadinggeocoding,setisLoadinggeocoding] = useState(false)
  const navigate = useNavigate()
  
  async function handleSumbit(e){
    e.preventDefault();
    if(!cityName || !date) return;

    const newcity = {cityName,country,date,notes,emoji,position:{lat,lng}}
    await addnewCity(newcity)
    navigate(-1)
  }
  useEffect(function (){
   async function fetchcitydata() {
     try{
        setisLoadinggeocoding(true)
        const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`)
        const data = await res.json()
        
        setCityName(data.city)
        setCountry(data.countryName)
        setemoji(convertToEmoji(data.countryCode))
     }catch(err){
       
     }finally{
      setisLoadinggeocoding(false)
     }
   }
   fetchcitydata()
  },[lat,lng])
  return (
    <form className={styles.form} onSubmit={handleSumbit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker selected ={date} onChange={date=> setDate(date)} dateFormat="dd/MM/yyyy"/>
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton/>
      </div>
    </form>
  );
}

export default Form;
