import React from 'react'
import styled from '@emotion/styled'

import Location from './Location'
import Icon from './Icon'
import Condition from './Condition'

const WeatherCard = ({
  ctemp,
  ftemp,
  condition,
  city,
  country,
  unit,
  handleUnitChange
}) => {
  let highColor = 0
  let lowColor = 0
  let bg = null
  if (ctemp > 12) {
    highColor = (1 - (ctemp - 12) / 28) * 255
    lowColor = highColor - 150
    bg = `linear-gradient(
      to top,
      rgb(255, ${highColor}, 0),
      rgb(255, ${lowColor}, 0)
    )`
  } else if (ctemp <= 12) {
    highColor = (1 - (ctemp + 20) / 32) * 255
    lowColor = highColor - 150
    bg = `linear-gradient(
      to top,
      rgb(0, ${highColor}, 255),
      rgb(0, ${lowColor}, 255)
    )`
  }
  const Card = styled.div`
    margin: 0 auto;
    background: ${bg};
    width: 200px;
    height: 240px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border-radius: 15px;
  `

  return (
    <Card>
      <Location city={city} country={country} />
      <Icon condition={condition} />
      <Condition
        ctemp={ctemp}
        ftemp={ftemp}
        condition={condition}
        unit={unit}
        handleUnitChange={handleUnitChange}
      />
    </Card>
  )
}

export default WeatherCard
