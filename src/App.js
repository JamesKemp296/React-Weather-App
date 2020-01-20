import React from 'react'

import WeatherEngine from './components/WeatherEngine'
import './App.css'

function App() {
  return (
    <div className="App">
      <WeatherEngine location="miami, us" />
      <WeatherEngine location="new york, us" />
      <WeatherEngine location="melbourne, au" />
    </div>
  )
}

export default App
