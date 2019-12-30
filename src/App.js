import React from 'react'

import WeatherCard from './components/WeatherCard/component'
import './App.css'

function App() {
  return (
    <div className="App">
      <WeatherCard temp={30} condition="Clear" />
      <WeatherCard temp={-5} condition="Clouds" />
      <WeatherCard temp={40} condition="Rainy" />
    </div>
  )
}

export default App
