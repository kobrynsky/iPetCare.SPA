import React, { useEffect, useState, useCallback } from 'react'
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  useField,
  FormikProps,
  FieldAttributes,
  FieldInputProps,
} from 'formik'
import { object, string, number, date } from 'yup'
import {
  Card,
  CardContent,
  Typography,
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
  IconButton,
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../state/store'
import { getPet, createPet, updatePet } from '../../../state/pets/petsActions'
import { RouteComponentProps } from 'react-router-dom'
import { Pet } from '../../../state/pets/petsReducer'
import { getRaces } from '../../../state/races/racesActions'
import { getAllSpecies } from '../../../state/species/speciesActions'
import { Race } from '../../../state/races/racesReducer'
import classes from '*.module.css'

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
    birthDate: '',
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
    console.log(e)
    console.log(file)
    dispatch(
      updatePet({
        birthDate: petForm.birthDate,
        name: petForm.name,
        height: petForm.height,
        weight: petForm.weight,
        id: petForm.id,
        raceId: petForm.raceId,
        gender: petForm.gender,
        image: file,
      })
    )
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
                                    ? petForm.imageUrl
                                    : 'data:image/png;base64,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'
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
