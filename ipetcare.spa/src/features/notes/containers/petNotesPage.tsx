import React, { useEffect } from "react"
import { RouteComponentProps, Link } from "react-router-dom"
import { Card, Typography, Grid, CircularProgress, CardActions, CardContent, IconButton } from "@material-ui/core"
import { RootState } from "../../../state/store"
import { useDispatch, useSelector } from "react-redux"
import { getNotes, deleteNote } from "../../../state/notes/notesActions"
import Moment from 'react-moment';
import { getPet } from "../../../state/pets/petsActions"
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
interface PetNotesPageParams {
    petId: string;
}

export const PetNotesPage = (props: RouteComponentProps<PetNotesPageParams>) => {
    const dispatch = useDispatch()
    const notesState = useSelector((state: RootState) => state.notes)
    const petId = props.match.params.petId

    useEffect(() => {
        dispatch(getNotes(petId))
    }, [])

    useEffect(() => {
        dispatch(getPet(petId))
    }, [])

    return (
        notesState.loading ?
            <div>
                <Grid
                    container
                    justify="center"
                    alignItems="center"
                    direction="column"
                    style={{ alignSelf: 'center', paddingTop: 100 }}>
                    <CircularProgress />
                </Grid>

            </div>
            :
            <div>
                <Typography variant="h2" className="title">
                    Notatki
                </Typography>
                <Grid container
                    direction="row"
                    justify="center"
                    alignItems="flex-start"
                    spacing={3}>
                    <Grid item xs={12} sm={8}>
                        {notesState.items.map((item) =>
                            <Card className="formCard">
                                <CardContent>
                                    <Typography color="textSecondary" gutterBottom>
                                        <Moment format="DD.MM.YYYY HH:mm">
                                            {item.createdAt}
                                        </Moment>
                                    </Typography>
                                    {item.payload}
                                </CardContent>
                                <CardActions>
                                    <IconButton aria-label="delete" onClick={() => { dispatch(deleteNote(item.id as string, petId)) }}>
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton aria-label="edit">
                                        <Link to={`/pets/${petId}/notes/edit/${item.id}`}>
                                            <EditIcon />
                                        </Link>
                                    </IconButton>
                                </CardActions>
                                <Grid
                                    container
                                    direction="row"
                                    justify="flex-end"
                                    alignItems="flex-end"
                                >
                                    <Typography color="textSecondary">
                                        {item.importantDate &&
                                            <div>
                                                Ważna data:
                                                <Moment format=" DD.MM.YYYY HH:mm">
                                                    {item.importantDate}
                                                </Moment>
                                            </div>
                                        }
                                    </Typography>
                                </Grid>
                            </Card>)
                        }
                    </Grid >
                    <Grid item xs={2} sm={4}>
                        <Card className="formCard">
                            <Typography color="textSecondary" gutterBottom>
                                Notatka
                                </Typography>
                            <Link to={`/pets/${petId}/notes/add`}>Dodaj nową notatkę</Link>
                        </Card>
                    </Grid>
                </Grid >
            </div >
    )
}