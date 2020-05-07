import React, { useEffect } from 'react'
import {
  Grid,
  TextField,
  Box,
  Container,
  Card,
  CardContent,
  CircularProgress,
  Button,
  InputAdornment,
} from '@material-ui/core'
import moment from 'moment'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../state/store'
import { getRaces } from '../../../state/races/racesActions'
import { getAllSpecies } from '../../../state/species/speciesActions'
import { getPet } from '../../../state/pets/petsActions'
import { Link, RouteComponentProps } from 'react-router-dom'
import { BASE_URL_IMG, DEFAULT_PET_IMG } from '../../../utils/constants'

interface PetPageParams {
  petId: string
}

export function PetPage(props: RouteComponentProps<PetPageParams>) {
  const dispatch = useDispatch()
  const petsState = useSelector((state: RootState) => state.pets)
  const speciesState = useSelector((state: RootState) => state.species)
  const racesState = useSelector((state: RootState) => state.races)

  const pet = useSelector((state: RootState) =>
    state.pets.items.find(p => p.id === props.match.params.petId)
  )
  useEffect(() => {
    dispatch(getPet(props.match.params.petId))
    dispatch(getRaces())
    dispatch(getAllSpecies())
  }, [])

  return (
    <Box paddingTop={2}>
      <Container>
        <Grid container justify="center">
          <Grid item xs={12} md={10}>
            <Card>
              <CardContent>
                {(petsState.loading || racesState.loading) && (
                  <CircularProgress style={{ alignSelf: 'center' }} />
                )}

                {pet && (
                  <Grid container spacing={3}>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={6}
                      spacing={3}
                      container
                      alignItems="stretch"
                    >
                      <Grid item xs={12} md={12}>
                        <img
                          style={{ height: '100%', width: '100%' }}
                          src={
                            pet.imageUrl
                              ? `${BASE_URL_IMG + pet.imageUrl}`
                              : DEFAULT_PET_IMG
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        value={pet.name}
                        margin="normal"
                        label="Imię"
                        fullWidth
                        variant="outlined"
                        InputProps={{
                          readOnly: true,
                        }}
                      />

                      <TextField
                        value={
                          speciesState.items.find(
                            s =>
                              s.id ===
                              racesState.items.find(r => r.id === pet.raceId)
                                ?.speciesId
                          )?.name
                        }
                        margin="normal"
                        label="Gatunek"
                        fullWidth
                        variant="outlined"
                        InputProps={{
                          readOnly: true,
                        }}
                      />

                      <TextField
                        value={
                          racesState.items.find(r => r.id === pet.raceId)?.name
                        }
                        margin="normal"
                        label="Rasa"
                        fullWidth
                        variant="outlined"
                        InputProps={{
                          readOnly: true,
                        }}
                      />

                      <TextField
                        value={pet.weight}
                        margin="normal"
                        label="Waga"
                        fullWidth
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">Kg</InputAdornment>
                          ),
                          readOnly: true,
                        }}
                      />

                      <TextField
                        value={pet.height}
                        margin="normal"
                        label="Wzrost"
                        fullWidth
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">cm</InputAdornment>
                          ),
                          readOnly: true,
                        }}
                      />

                      <TextField
                        value={pet.gender === 'Male' ? 'Samiec' : 'Samica'}
                        margin="normal"
                        label="Płeć"
                        fullWidth
                        variant="outlined"
                        InputProps={{
                          readOnly: true,
                        }}
                      />

                      <TextField
                        value={moment(pet.birthDate).format('YYYY-MM-DD')}
                        margin="normal"
                        label="Data urodzenia"
                        fullWidth
                        variant="outlined"
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={12}
                      container
                      justify="space-between"
                    >
                      <Button
                        style={{ maxHeight: '50px' }}
                        size="small"
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="submit"
                        component={Link}
                        to={`/pets/${pet.id}/edit`}
                      >
                        Edycja
                      </Button>
                    </Grid>
                  </Grid>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
