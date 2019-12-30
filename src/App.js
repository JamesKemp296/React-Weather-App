import React from 'react'

import WeatherCard from './components/WeatherCard/component'
import './App.css'

function App() {
  return (
    <div className="App">
      <WeatherCard temp={30} condition="Clear" city="Sydney" country="AU" />
      <WeatherCard temp={-5} condition="Clouds" city="New York" country="USA" />
      <WeatherCard temp={40} condition="Tornado" city="Miami" country="USA" />
    </div>
  )
}

export default App
