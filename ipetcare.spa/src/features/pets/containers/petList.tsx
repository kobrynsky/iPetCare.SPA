import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../state/store'
import { getPets, getMyPets, getPet } from '../../../state/pets/petsActions'
import { getUserState } from '../../../utils/localStorageHelper'
import { ADMIN } from '../../../utils/constants'
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
} from '@material-ui/core'
import classes from '*.module.css'
import { Link } from 'react-router-dom'

export const PetList = () => {
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
                    image="https://i.ytimg.com/vi/FElFrWPFrxk/hqdefault.jpg"
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
                    Udostępnij [todo]
                  </Button>
                  <Button
                    size="small"
                    color="primary"
                    component={Link}
                    to={`/pets/${pet.id}/edit`}
                  >
                    Szczegóły [todo]
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}
