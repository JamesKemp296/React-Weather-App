import React, { useState, useEffect } from 'react'

import WeatherCard from './WeatherCard/component'

const WeatherEngine = ({ location }) => {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [unit, setUnit] = useState('metric')
  const [weather, setWeather] = useState({
    ctemp: null,
    ftemp: null,
    city: null,
    condition: null,
    country: null
  })
  const { ctemp, ftemp, condition, country, city } = weather

  const getWeather = async q => {
    setQuery('')
    setLoading(true)
    try {
      const apiRes = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${q}&units=${unit}&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`
      )
      const resJSON = await apiRes.json()
      setWeather({
        ftemp: Math.round((resJSON.main.temp * 9) / 5 + 32),
        ctemp: Math.round(resJSON.main.temp),
        city: resJSON.name,
        condition: resJSON.weather[0].main,
        country: resJSON.sys.country
      })
    } catch (error) {
      setError(true)
    }
    setLoading(false)
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
  }

  return (
    <div>
      {!loading && !error ? (
        <div>
          <WeatherCard
            unit={unit}
            handleUnitChange={handleUnitChange}
            setUnit={setUnit}
            ctemp={ctemp}
            ftemp={ftemp}
            condition={condition}
            city={city}
            country={country}
          />
          <form onSubmit={e => handleSearch(e)}>
            <input value={query} onChange={e => setQuery(e.target.value)} />
            <button type="submit">Search</button>
          </form>
        </div>
      ) : loading ? (
        <div style={{ color: 'black' }}>Loading</div>
      ) : !loading && error ? (
        <div style={{ color: 'black' }}>
          There has been an error
          <br />
          <button onClick={() => setError(false)}>Reset</button>
        </div>
      ) : null}
    </div>
  )
}

export default WeatherEngine
