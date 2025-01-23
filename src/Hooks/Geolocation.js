import { useEffect, useState } from "react";

export function useGeolocation() {
  const [isLoading, setisLoading] = useState(false);
  const [position, setposition] = useState();
  const [error, seterror] = useState("");

  function getPosition() {
    if (!navigator.geolocation)
      return seterror("Your browser does not support");

    setisLoading(true);
    navigator.geolocation.getCurrentPosition((pos) => {
      setposition({ lat: pos.coords.latitude,lng: pos.coords.longitude });
    });
    setisLoading(false);
  }

  return { isLoading, position, error, getPosition };
}
