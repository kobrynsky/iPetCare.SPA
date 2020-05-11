import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {
    Card,
    CardContent,
    Typography,
    CardActionArea,
    CardMedia,
    CardActions,
    Button,
} from '@material-ui/core'
import { BASE_URL_IMG, DEFAULT_PET_IMG } from '../../../utils/constants'
import moment from 'moment'
import { sendPetAccessRequest, deletePetAccess } from '../../../state/invitations/invitationsActions'

interface Props {
    pet: Pet
    shared: boolean
    userId: string
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
    invitationStatus?: boolean
}

const useStyles = makeStyles({
    media: {
        height: 140,
    },
    root: {
        maxWidth: 300,
        margin: 10,
        height: 450,
    },
})

export const SimplePetCard = (props: Props) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const pet = props.pet

    return (
        <div className={classes.root}>
            <Card>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={pet.imageUrl ? `${BASE_URL_IMG + pet.imageUrl}` : DEFAULT_PET_IMG}
                        title={pet.name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {pet.name}
                        </Typography>

                        <Typography color="textSecondary">{pet.species}</Typography>
                        <Typography color="textSecondary">{pet.race}</Typography>
                        <Typography color="textSecondary">
                            Wzrost: {pet.height} cm
                        </Typography>
                        <Typography color="textSecondary">Waga: {pet.weight} kg</Typography>
                        <Typography color="textSecondary">
                            Płeć: {pet.gender === 'Male' ? 'Samiec' : 'Samica'}
                        </Typography>
                        <Typography color="textSecondary">
                            Data urodzenia: {moment(pet.birthDate).format('YYYY-MM-DD')}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    {props.pet.invitationStatus === true && (
                        <Fragment>
                            <Button
                                size="small"
                                color="secondary"
                                onClick={() => { dispatch(deletePetAccess(props.pet.id as string, props.userId)) }}
                            >
                                Usuń dostęp
                            </Button>
                            <Typography>Masz dostęp</Typography>
                        </Fragment>
                    )}
                    {props.pet.invitationStatus === null && (

                        <Button
                            size="small"
                            color="primary"
                            onClick={() => { dispatch(sendPetAccessRequest(props.pet.id as string)) }}
                        >
                            Wyślij zaproszenie
                        </Button>
                    )}
                    {props.pet.invitationStatus === false && (
                        <Typography color="textSecondary">Zaproszenie w toku</Typography>
                    )}
                </CardActions>
            </Card>
        </div>
    )
}
