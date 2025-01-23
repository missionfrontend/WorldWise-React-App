import { createContext, useEffect, useState,useCallback } from "react";
const URL = "http://localhost:9000/cities";
const CityContexts = createContext();

function CityProvider({ children }) {
  const [cities, setcities] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [currentCity, setcurrentCity] = useState([]);
  useEffect(function () {
    async function fetchcities() {
      try {
        setisLoading(true);
        const res = await fetch(`${URL}`);
        const data = await res.json();
        setcities(data);
      } catch {
        alert("Cities not found");
      } finally {
        setisLoading(false);
      }
    }
    fetchcities();
  }, []);

  const getCity = useCallback(async function getCity(id) {
    try {
      const res = await fetch(`http://localhost:9000/cities/${id}`);
      const data = await res.json();
      setcurrentCity(data);
    } catch (err) {
      console.log(err);
    }
  },[currentCity.id]
)
  async function addnewCity(newcity) {
    try {
      const res = await fetch(`http://localhost:9000/cities/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newcity)
      });
      const data = await res.json();
      setcities((city)=>[...city,data])
      
    } catch (err) {
      console.log(err);
    }
  }
  async function deleteCity(id) {
    try {
      const res = await fetch(`http://localhost:9000/cities/${id}`,{method:"DELETE"});
      const data = await res.json();
      setcities(city=> city.filter(city=> city.id !== id));
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <CityContexts.Provider
      value={{ cities, isLoading, getCity, currentCity,addnewCity,deleteCity}}
    >
      {children}
    </CityContexts.Provider>
  );
}

export { CityProvider, CityContexts };
