import React, { useEffect, useState } from 'react'
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
  CircularProgress,
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../state/store'
import { getPet, createPet, updatePet } from '../../../state/pets/petsActions'
import { RouteComponentProps } from 'react-router-dom'
import { Pet } from '../../../state/pets/petsReducer'
import { getRaces } from '../../../state/races/racesActions'
import { getAllSpecies } from '../../../state/species/speciesActions'
import { Race } from '../../../state/races/racesReducer'
import { BASE_URL_IMG, DEFAULT_PET_IMG } from '../../../utils/constants'
import { v4 as uuid } from 'uuid'
import moment from 'moment'

interface PetFormParams {
  petId: string
}

export const PetFormPage = (props: RouteComponentProps<PetFormParams>) => {
  const dispatch = useDispatch()
  const petsState = useSelector((state: RootState) => state.pets)
  const racesState = useSelector((state: RootState) => state.races)
  const speciesState = useSelector((state: RootState) => state.species)

  const [submitting, setSubmitting] = useState(false)
  const [file, setFile] = useState<any>()
  const [creationForm, setCreationForm] = useState(true)
  const [canShowRaces, setCanShowRaces] = useState(false)
  const [petSpeciesId, setPetSpeciesId] = useState<number>(1)
  const [partialRaces, setPartialRaces] = useState<Race[]>([])
  const [initialPet, setInitialPet] = useState<Pet>({
    id: '',
    birthDate: moment().format('YYYY-MM-DD'),
    gender: 'Male',
    height: 0,
    weight: 0,
    name: '',
    raceId: 1,
    imageUrl: '',
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    console.log('halo1')
    const run = async () => {
      console.log('halo2')

      setIsLoading(true)
      await dispatch(getRaces())
      console.log('halo3')

      await dispatch(getAllSpecies())
      console.log('halo4')

      if (props.match.params.petId) {
        console.log('halo5')

        // pet exists - edit
        setCreationForm(false)
        console.log('ISTNIEJE - EDIT')
        await dispatch(getPet(props.match.params.petId))
      } else {
        console.log('halo6')

        // pet does not exist - create
        setCreationForm(true)
      }
      setIsLoading(false)
    }
    run()
  }, [submitting])

  useEffect(() => {
    let currentPet = petsState.items.find(
      p => p.id === props.match.params.petId
    )
    console.log(currentPet)
    if (currentPet) {
      setCreationForm(false)
      setInitialPet({
        ...currentPet,
        birthDate: moment(currentPet.birthDate).format('YYYY-MM-DD'),
      })
      const race = racesState.items.find(r => r.id === currentPet?.raceId)
      if (race) {
        setPartialRaces(
          racesState.items.filter(r => r.speciesId === race?.speciesId)
        )
        setPetSpeciesId(race?.speciesId)
        setCanShowRaces(true)
      }
    }
  }, [petsState.loading])

  const handleSpeciesChange = (e: any) => {
    setPetSpeciesId(e.target.value)
    setPartialRaces(
      racesState.items.filter(r => r.speciesId === e.target.value)
    )
    setCanShowRaces(true)
  }

  const handleSubmitForm = (values: Pet, actions: any) => {
    console.log('haslko)')
    if (creationForm) {
      dispatch(createPet({ ...values, image: file, id: uuid() }))
    } else {
      dispatch(updatePet({ ...values, image: file }))
    }
    setSubmitting(!submitting)
  }

  return (
    <Box paddingTop={2}>
      <Container>
        <Grid container justify="center">
          <Grid item xs={7}>
            <Card>
              <CardContent>
                {petsState.loading ||
                  (isLoading && (
                    <CircularProgress style={{ alignSelf: 'center' }} />
                  ))}
                {!petsState.loading && !speciesState.loading && !isLoading && (
                  <Formik
                    enableReinitialize={false}
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
                    initialValues={{ ...initialPet, petSpeciesId }}
                    onSubmit={handleSubmitForm}
                  >
                    {({ values, errors, isSubmitting, handleChange }) => (
                      <Form>
                        <Grid container spacing={3}>
                          <Grid item xs={6} container alignItems="stretch">
                            <Grid item xs={12}>
                              <img
                                style={{ height: '100%', width: '100%' }}
                                src={
                                  values.imageUrl
                                    ? `${BASE_URL_IMG + values.imageUrl}`
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
                                  console.log(event.currentTarget.files[0])
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
                                  onChange={(e: any) => {
                                    handleSpeciesChange(e)
                                    handleChange(e)
                                  }}
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
                                      selected={values.raceId === petSpeciesId}
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
