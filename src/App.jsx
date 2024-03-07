import { useState } from 'react'
import './App.css'
import { axiosWeatherForecast as weatherForecast } from './components/weatherForecast'


function App() {


  return (
    <>
      <h1 className="font-bold">Testing connection with backend</h1>
      <p className="font-bold">Let's get started!</p>
      <button onClick={weatherForecast}>Get Weather Forecast</button>
    </>
  )
}

export default App
