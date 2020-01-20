import React, { useState, useEffect } from 'react'
import WeatherCard from './components/WeatherCard/component'
import './App.css'

function App() {
  const [query, setQuery] = useState('miami, us')
  const [unit, setUnit] = useState('metric')
  const [weather, setWeather] = useState({
    temp: null,
    city: null,
    condition: null,
    country: null
  })
  const { temp, condition, country, city } = weather

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
      setWeather({
        temp: Math.round(res.main.temp),
        city: res.name,
        condition: res.weather[0].main,
        country: res.sys.country
      })
    })
  }
  useEffect(() => {
    data(query).then(res => {
      setWeather({
        temp: Math.round(res.main.temp),
        city: res.name,
        condition: res.weather[0].main,
        country: res.sys.country
      })
    })
  }, [])
  const handleUnitChange = () => {
    unit === 'imperial' ? setUnit('metric') : setUnit('imperial')
    let unitTemp = ''
    if (unit === 'imperial') {
      unitTemp = ((temp - 32) * 5) / 9
      setWeather({ ...weather, temp: Math.round(unitTemp) })
    } else {
      unitTemp = (temp * 9) / 5 + 32
      setWeather({ ...weather, temp: Math.round(unitTemp) })
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
