import axios from "axios";
import { SearchType } from "../types";
import { z } from "zod";
import { useMemo, useState } from "react";

const Weather = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    temp_max: z.number(),
    temp_min: z.number(),
  }),
});

export type Weather = z.infer<typeof Weather>;
export default function useWeather() {


  const [weather, setWeather] = useState<Weather>({
    name:'',
    main:{
        temp:0,
        temp_max:0,
        temp_min:0
    }
  })
  const [loading, setLoading]= useState(false);
  const [notFound, setNotFound] = useState(false)

  const fetchWeather = async (search: SearchType) => {
    setLoading(true)
    try {
      const appId = import.meta.env.VITE_API_KEY;
      const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`;

      const { data } = await axios(geoUrl);
      console.log(data);

      if(!data[0]){
        setNotFound(true)
        return
      }

      const lat = data[0].lat;
      const lon = data[0].lon;

      const weaterUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`;
      const { data: weatherResponse } = await axios(weaterUrl);

      const result = Weather.safeParse(weatherResponse);

      if (result.success) {
        setWeather(result.data)
      } else {
        console.log("respuesta mal formada");
      }
    } catch (error) {
      console.log(error);
    }
    finally{
      setLoading(false)
    }
  };

  const hasWeatherData = useMemo(()=>weather.name,[weather])

  return {
    fetchWeather,
    weather,
    hasWeatherData,
    loading,
    notFound
  };
}


