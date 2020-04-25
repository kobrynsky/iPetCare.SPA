import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../state/store'
import {
  getPets,
  getMyPets,
  getPet,
  deletePet,
} from '../../../state/pets/petsActions'
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

export const PetList = () => {
  const [openDeletePrompt, setOpenDeletePrompt] = useState(false)
  const [modalPetId, setModalPetId] = useState<string | undefined>('')
  const dispatch = useDispatch()
  const petsState = useSelector((state: RootState) => state.pets)

  const user = getUserState()
  useEffect(() => {
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
                    <Typography color="textSecondary">{pet.raceId}</Typography>
                    <Typography color="textSecondary">
                      Wzrost: {pet.height}
                    </Typography>
                    <Typography color="textSecondary">
                      Waga: {pet.weight}
                    </Typography>
                    <Typography color="textSecondary">
                      Płeć: {pet.gender}
                    </Typography>
                    <Typography color="textSecondary">
                      Data urodzenia: {new Date(pet.birthDate).toDateString()}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    Szczegóły [todo]
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
