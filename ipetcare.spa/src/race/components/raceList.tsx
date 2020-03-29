import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../utils/constants'
import '../race.css'
import RaceCard from './raceCard'
import { Container, Grid } from '@material-ui/core'

export function RaceList() {
  const [races, setRaces] = useState([
    { id: 0, name: '', species: { id: 0, name: '' } },
  ])
  useEffect(() => {
    axios
      .get(BASE_URL + '/races')
      .then(function(response) {
        console.log(response.data.races)
        setRaces(response.data.races)
      })
      .catch(error => console.log(error))
  }, [])

  return (
    <Container fixed>
      <h1>Rasy</h1>
      <Grid container justify="flex-start" spacing={2}>
        {races.map(race => (
          <Grid container item xs={4} spacing={0}>
            <RaceCard race={race} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
