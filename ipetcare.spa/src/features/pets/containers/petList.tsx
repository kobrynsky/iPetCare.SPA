import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../state/store'
import { getPets, getMyPets, deletePet } from '../../../state/pets/petsActions'
import { getUserState } from '../../../utils/localStorageHelper'
import { ADMIN, BASE_URL_IMG, DEFAULT_PET_IMG } from '../../../utils/constants'
import { Pet } from '../../../state/pets/petsReducer'
import AddIcon from '@material-ui/icons/Add'

import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  makeStyles,
  Grid,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { getRaces } from '../../../state/races/racesActions'
import { getAllSpecies } from '../../../state/species/speciesActions'

export const PetList = () => {
  const [openDeletePrompt, setOpenDeletePrompt] = useState(false)
  const [modalPetId, setModalPetId] = useState<string | undefined>('')
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
      } else {
        dispatch(getMyPets())
      }
    }
  }, [])

  const useStyles = makeStyles({
    media: {
      height: 140,
    },
  })

  const classes = useStyles()

  return (
    <div className="container">
      <Box marginY={2}>
        <Typography variant="h2">Twoje zwierzaki</Typography>
      </Box>
      <Grid container spacing={3} justify="space-around">
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
        {petsState.items.map((pet: Pet) => {
          return (
            <Grid key={pet.id} item xs={4}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={
                      pet.imageUrl
                        ? `${BASE_URL_IMG + pet.imageUrl}`
                        : DEFAULT_PET_IMG
                    }
                    title={pet.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {pet.name}
                    </Typography>

                    <Typography color="textSecondary">
                      {
                        speciesState.items.find(
                          s =>
                            s.id ===
                            racesState.items.find(r => r.id === pet.raceId)
                              ?.speciesId
                        )?.name
                      }
                    </Typography>
                    <Typography color="textSecondary">
                      {racesState.items.find(r => r.id === pet.raceId)?.name}
                    </Typography>
                    <Typography color="textSecondary">
                      Wzrost: {pet.height} cm
                    </Typography>
                    <Typography color="textSecondary">
                      Waga: {pet.weight} kg
                    </Typography>
                    <Typography color="textSecondary">
                      Płeć: {pet.gender === 'Male' ? 'Samiec' : 'Samica'}
                    </Typography>
                    <Typography color="textSecondary">
                      Data urodzenia:{' '}
                      {moment(pet.birthDate).format('YYYY-MM-DD')}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    component={Link}
                    to={`/pets/${pet.id}`}
                  >
                    Szczegóły
                  </Button>
                  <Button
                    size="small"
                    color="primary"
                    component={Link}
                    to={`/pets/${pet.id}/edit`}
                  >
                    Edycja
                  </Button>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => {
                      setOpenDeletePrompt(true)
                      setModalPetId(pet.id)
                    }}
                  >
                    Usuń
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          )
        })}
      </Grid>

      <Dialog
        open={openDeletePrompt}
        onClose={() => setOpenDeletePrompt(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Potwierdź'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Czy na pewno chcesz usunąć zwierzaka{' '}
            {petsState.items.find(p => p.id === modalPetId)?.name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeletePrompt(false)} color="primary">
            Nie
          </Button>
          <Button
            onClick={() => {
              if (modalPetId) {
                dispatch(deletePet(modalPetId))
              }
              setOpenDeletePrompt(false)
            }}
            color="primary"
            autoFocus
          >
            Tak
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
