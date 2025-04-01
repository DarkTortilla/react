import styles from "./App.module.css"
import Alert from "./components/Alert/Alert"
import Form from "./components/Form/Form"
import WeatherDetail from "./components/WeatherDetail/WeatherDetail"
import useWeather from "./hooks/useWeather"

function App() {
  const { fetchWeather, weather, hasWeatherData, loading , notFound} = useWeather()

  return (
    <>
      <h1 className={styles.title}>Buscador de clima</h1>
      <div className={styles.container}>
        {loading && <p>Cargando...</p> }
        <Form fetchWeather={fetchWeather}></Form>
        {hasWeatherData && <WeatherDetail weather={weather} ></WeatherDetail>}
        {notFound && <Alert>Que te pasa pervertido?</Alert>}
      </div>
    
    </>
  )
}

export default App
