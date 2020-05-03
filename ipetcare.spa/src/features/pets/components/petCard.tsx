import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardContent, Typography, CardActionArea, CardMedia, CardActions, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { deletePet } from '../../../state/pets/petsActions'
import { BASE_URL_IMG, DEFAULT_PET_IMG } from '../../../utils/constants'
import moment from 'moment'

interface Props {
    pet: Pet,
    shared: boolean
}

interface Pet {
    id?: string
    imageUrl?: string
    name: string
    species?: string
    race?: string
    height: number
    weight: number
    gender: string
    birthDate: string
}

const useStyles = makeStyles({
    media: {
        height: 140,
    },
})

export const PetCard = (props: Props) => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const [openDeletePrompt, setOpenDeletePrompt] = useState(false)
    const [modalPetId, setModalPetId] = useState<string | undefined>('')
    const pet = props.pet

    return (
        <div>
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
                            {pet.species}
                        </Typography>
                        <Typography color="textSecondary">
                            {pet.race}
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
                        to={`/pets/${pet.id}/examinations`}
                    >
                        Badania
                </Button>
                    <Button
                        size="small"
                        color="primary"
                        component={Link}
                        to={`/pets/${pet.id}/notes`}
                    >
                        Notatki
                </Button>
                </CardActions>
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
                    {!props.shared &&
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
                    }
                </CardActions>
            </Card>
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
                        {pet.name}?
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