import React, { useEffect, useState, useCallback } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { object, string, number, date } from 'yup'
import {
  Card,
  CardContent,
  Container,
  TextField,
  MenuItem,
  FormGroup,
  Button,
  Grid,
  InputAdornment,
  Select,
  FormControl,
  Box,
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../state/store'
import { getPet, createPet, updatePet } from '../../../state/pets/petsActions'
import { RouteComponentProps } from 'react-router-dom'
import { Pet, PetForm } from '../../../state/pets/petsReducer'
import { getRaces } from '../../../state/races/racesActions'
import { getAllSpecies } from '../../../state/species/speciesActions'
import { Race } from '../../../state/races/racesReducer'
import { BASE_URL_IMG, DEFAULT_PET_IMG } from '../../../utils/constants'

interface PetFormParams {
  petId: string
}

export const PetCreatePage = (props: RouteComponentProps<PetFormParams>) => {
  const dispatch = useDispatch()
  const petsState = useSelector((state: RootState) => state.pets)
  const racesState = useSelector((state: RootState) => state.races)
  const speciesState = useSelector((state: RootState) => state.species)

  const [file, setFile] = useState<any>()
  const [creationForm, setCreationForm] = useState(true)
  const [canShowRaces, setCanShowRaces] = useState(false)
  const [petSpeciesId, setPetSpeciesId] = useState<number>(1)
  const [partialRaces, setPartialRaces] = useState<Race[]>([])
  const [petForm, setPetForm] = useState<Pet>({
    id: '',
    birthDate: new Date().toISOString(),
    gender: 'Male',
    height: 0,
    weight: 0,
    name: '',
    raceId: 1,
    imageUrl: '',
  })

  useEffect(() => {
    const run = async () => {
      await dispatch(getRaces())
      await dispatch(getAllSpecies())

      if (props.match.params.petId) {
        setCreationForm(false)
        console.log('ISTNIEJE - EDIT')
        await dispatch(getPet(props.match.params.petId))
        let currentPet = petsState.items.find(
          p => p.id === props.match.params.petId
        )
        if (currentPet) {
          setCreationForm(false)
          setPetForm(currentPet)
          const race = racesState.items.find(r => r.id === currentPet?.raceId)
          if (race) {
            setPartialRaces(
              racesState.items.filter(r => r.speciesId === race?.speciesId)
            )
            setPetSpeciesId(race?.speciesId)
            setCanShowRaces(true)
          }
        }
      } else {
        setCreationForm(true)
      }
    }
    run()
  }, [])

  const handleSpeciesChange = (e: any) => {
    setPetSpeciesId(e.target.value)
    setPartialRaces(
      racesState.items.filter(r => r.speciesId === e.target.value)
    )
    setCanShowRaces(true)
  }

  const handleSubmitForm = (e: any) => {
    let tempPet: PetForm = {
      birthDate: petForm.birthDate,
      name: petForm.name,
      height: 10,
      weight: 10,
      id: petForm.id,
      raceId: petForm.raceId,
      gender: petForm.gender,
      image: file,
    }
    if (creationForm) {
      dispatch(createPet(tempPet))
    } else {
      dispatch(updatePet(tempPet))
    }
  }

  return (
    <Box paddingTop={2}>
      <Container>
        <Grid container justify="center">
          <Grid item xs={7}>
            <Card>
              <CardContent>
                {!petsState.loading && !speciesState.loading && (
                  <Formik
                    enableReinitialize={true}
                    validationSchema={object({
                      name: string()
                        .required()
                        .max(255),
                      weight: number()
                        .positive()
                        .required(),
                      height: number()
                        .positive()
                        .required(),
                      birthDate: date().required(),
                    })}
                    initialValues={{ ...petForm, petSpeciesId }}
                    onSubmit={handleSubmitForm}
                  >
                    {({ values, errors, isSubmitting }) => (
                      <Form>
                        <Grid container spacing={3}>
                          <Grid item xs={6} container alignItems="stretch">
                            <Grid item xs={12}>
                              <img
                                style={{ height: '100%', width: '100%' }}
                                src={
                                  petForm.imageUrl
                                    ? `${BASE_URL_IMG + petForm.imageUrl}`
                                    : DEFAULT_PET_IMG
                                }
                              />
                            </Grid>

                            <Grid
                              item
                              xs={12}
                              container
                              justify="space-between"
                            >
                              <input
                                id="file"
                                name="file"
                                type="file"
                                onChange={(event: any) => {
                                  setFile(event.currentTarget.files[0])
                                }}
                              />

                              <FormControl fullWidth margin="normal">
                                <Button
                                  variant="contained"
                                  color="primary"
                                  type="submit"
                                  disabled={isSubmitting}
                                >
                                  Zapisz
                                </Button>
                              </FormControl>
                            </Grid>
                          </Grid>
                          <Grid item xs={6}>
                            <FormControl fullWidth margin="normal">
                              <FormGroup>
                                <Field
                                  name="name"
                                  as={TextField}
                                  label="Imię zwierzaka"
                                  variant="outlined"
                                />
                                <ErrorMessage name="name" />
                              </FormGroup>
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                              <FormGroup>
                                <Field
                                  label="Gatunek"
                                  name="petSpeciesId"
                                  onChange={handleSpeciesChange}
                                  as={TextField}
                                  select
                                  variant="outlined"
                                >
                                  {speciesState.items.map(species => (
                                    <MenuItem
                                      key={species.id}
                                      value={species.id ? species.id : 0}
                                    >
                                      {species.name}
                                    </MenuItem>
                                  ))}
                                </Field>
                              </FormGroup>
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                              <FormGroup>
                                <Field
                                  disabled={!canShowRaces || racesState.loading}
                                  label="Rasa"
                                  name="raceId"
                                  as={TextField}
                                  select
                                  variant="outlined"
                                >
                                  {partialRaces.map(race => (
                                    <MenuItem
                                      selected={petForm.raceId === petSpeciesId}
                                      key={race.id}
                                      value={race.id}
                                    >
                                      {race.name}
                                    </MenuItem>
                                  ))}
                                </Field>
                                <ErrorMessage name="raceId" />
                              </FormGroup>
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                              <FormGroup>
                                <Field
                                  name="weight"
                                  type="number"
                                  as={TextField}
                                  label="Waga"
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        Kg
                                      </InputAdornment>
                                    ),
                                  }}
                                  variant="outlined"
                                  inputProps={{ step: 0.01 }}
                                />
                                <ErrorMessage name="weight" />
                              </FormGroup>
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                              <FormGroup>
                                <Field
                                  name="height"
                                  type="number"
                                  as={TextField}
                                  label="Wzrost"
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        cm
                                      </InputAdornment>
                                    ),
                                  }}
                                  inputProps={{ step: 0.01 }}
                                  variant="outlined"
                                />
                                <ErrorMessage name="height" />
                              </FormGroup>
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                              <FormGroup>
                                <Field
                                  name="gender"
                                  as={Select}
                                  variant="outlined"
                                  label="Plec"
                                >
                                  <MenuItem value="Male">Samiec</MenuItem>
                                  <MenuItem value="Female">Samica</MenuItem>
                                </Field>
                                <ErrorMessage name="gender" />
                              </FormGroup>
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                              <FormGroup>
                                <Field
                                  name="birthDate"
                                  as={TextField}
                                  type="date"
                                  label="Data urodzenia"
                                  variant="outlined"
                                />
                                <ErrorMessage name="birthDate" />
                              </FormGroup>
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                              <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={isSubmitting}
                              >
                                Usuń [TODO]
                              </Button>
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Form>
                    )}
                  </Formik>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
