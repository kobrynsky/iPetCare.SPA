import React, { useEffect, useState, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../state/store'
import { getPets, getMyPets, getSharedPets } from '../../../state/pets/petsActions'
import { getUserState } from '../../../utils/localStorageHelper'
import { ADMIN, VET, OWNER } from '../../../utils/constants'
import { Pet } from '../../../state/pets/petsReducer'
import AddIcon from '@material-ui/icons/Add'
import { Typography, Button, Grid, Box } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { getRaces } from '../../../state/races/racesActions'
import { getAllSpecies } from '../../../state/species/speciesActions'
import { PetCard } from '../components/petCard'

export const PetList = () => {
  const [] = useState(false)
  const [] = useState<string | undefined>('')
  const dispatch = useDispatch()
  const petsState = useSelector((state: RootState) => state.pets)
  const racesState = useSelector((state: RootState) => state.races)
  const speciesState = useSelector((state: RootState) => state.species)

  const user = getUserState()
  useEffect(() => {
    dispatch(getAllSpecies())
    dispatch(getRaces())
    if (user) {
      if (user.role === ADMIN) {
        dispatch(getPets())
      } else if (user.role === VET) {
        dispatch(getSharedPets())
      }
      else if (user.role === OWNER) {
        dispatch(getSharedPets())
        dispatch(getMyPets())
      }
    }
  }, [])

  return (
    <div className="container">
      {user?.role !== VET &&
        <Fragment>
          <Box marginY={2}>
            {user?.role === ADMIN ?
              <Typography variant="h2">Wszystkie zwierzaki</Typography>
              :
              <Typography variant="h2">Moje zwierzaki</Typography>
            }
          </Box>
          <Grid container spacing={3} justify="space-around">
            {user?.role === OWNER && (
              <Grid item xs={12}>
                <Button
                  size="large"
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  component={Link}
                  to="/pets/create"
                >
                  Dodaj
                </Button>
              </Grid>
            )}
            {petsState.items.map((pet: Pet) => {
              return (
                <Grid key={pet.id} item xs={4}>
                  <PetCard pet={{
                    ...pet,
                    species: speciesState.items.find(
                      s =>
                        s.id ===
                        racesState.items.find(r => r.id === pet.raceId)
                          ?.speciesId
                    )?.name,
                    race: racesState.items.find(r => r.id === pet.raceId)?.name
                  }} shared={false} />
                </Grid>
              )
            })}
          </Grid>
        </Fragment>
      }
      {user?.role !== ADMIN &&
        <Fragment>
          <Box marginY={2}>
            <Typography variant="h2">Udostępnione zwierzaki</Typography>
          </Box>
          <Grid container spacing={3} justify="space-around">
            {petsState.sharedItems.map((pet: Pet) => {
              return (
                <Grid key={pet.id} item xs={4}>
                  <PetCard pet={{
                    ...pet,
                    species: speciesState.items.find(
                      s =>
                        s.id ===
                        racesState.items.find(r => r.id === pet.raceId)
                          ?.speciesId
                    )?.name,
                    race: racesState.items.find(r => r.id === pet.raceId)?.name
                  }} shared={true} />
                </Grid>
              )
            })}
          </Grid>
        </Fragment>
      }
    </div>
  )
}
