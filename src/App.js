import React, { useState } from 'react'
import WeatherCard from './components/WeatherCard/component'
import './App.css'

function App() {
  const [query, setQuery] = useState('london, gb')
  const [city, setCity] = useState('')
  const [unit, setUnit] = useState('metric')
  const [temp, setTemp] = useState('')
  const [condition, setCondition] = useState('')
  const [country, setCountry] = useState('')

  const data = async q => {
    const apiRes = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${q}&units=${unit}&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`
    )
    const resJSON = await apiRes.json()
    return resJSON
  }
  const handleSearch = e => {
    e.preventDefault()
    data(query).then(res => {
      setTemp(Math.floor(res.main.temp))
      setCondition(res.weather[0].main)
      setCountry(res.sys.country)
      setCity(res.name)
    })
  }
  const handleUnitChange = () => {
    unit === 'imperial' ? setUnit('metric') : setUnit('imperial')
    let unitTemp = ''
    if (unit === 'imperial') {
      unitTemp = ((temp - 32) * 5) / 9
      setTemp(Math.floor(unitTemp))
    } else {
      unitTemp = (temp * 9) / 5 + 32
      setTemp(Math.floor(unitTemp))
    }
  }
  return (
    <div className="App">
      <WeatherCard
        unit={unit}
        handleUnitChange={handleUnitChange}
        setUnit={setUnit}
        temp={temp}
        condition={condition}
        city={city}
        country={country}
      />
      <form onSubmit={e => handleSearch(e)}>
        <input value={query} onChange={e => setQuery(e.target.value)} />
        <button type="submit">Search</button>
      </form>
    </div>
  )
}

export default App
