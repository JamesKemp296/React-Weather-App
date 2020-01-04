import React from 'react'
import WeatherCard from './components/WeatherCard/component'
import './App.css'

function App() {
  const data = async () => {
    const apiRes = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`
    )
    const resJSON = await apiRes.json()
    return resJSON
  }
  data().then(res => {
    console.log(res.main)
  })

  return (
    <div className="App">
      <WeatherCard temp={30} condition="Clear" city="Sydney" country="AU" />
      <WeatherCard temp={-5} condition="Clouds" city="New York" country="USA" />
      <WeatherCard temp={40} condition="Tornado" city="Miami" country="USA" />
    </div>
  )
}

export default App
