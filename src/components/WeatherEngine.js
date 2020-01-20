import React, { useState, useEffect } from 'react'

import WeatherCard from './WeatherCard/component'

const WeatherEngine = ({ location }) => {
  const [query, setQuery] = useState('')
  const [unit, setUnit] = useState('metric')
  const [weather, setWeather] = useState({
    temp: null,
    city: null,
    condition: null,
    country: null
  })
  const { temp, condition, country, city } = weather

  const getWeather = async q => {
    const apiRes = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${q}&units=${unit}&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`
    )
    const resJSON = await apiRes.json()
    setWeather({
      temp: Math.round(resJSON.main.temp),
      city: resJSON.name,
      condition: resJSON.weather[0].main,
      country: resJSON.sys.country
    })
  }
  const handleSearch = e => {
    e.preventDefault()
    getWeather(query)
  }
  useEffect(() => {
    getWeather(location)
  }, [location])
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
    <div>
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

export default WeatherEngine
