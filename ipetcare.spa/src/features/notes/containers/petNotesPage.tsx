import React, { useEffect } from "react"
import { RouteComponentProps, Link } from "react-router-dom"
import { Card, Typography, Grid, CircularProgress } from "@material-ui/core"
import { RootState } from "../../../state/store"
import { useDispatch, useSelector } from "react-redux"
import { getNotes } from "../../../state/notes/notesActions"
import Moment from 'react-moment';
import { getPet } from "../../../state/pets/petsActions"


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
                                <Typography color="textSecondary" gutterBottom>
                                    <Moment format="DD.MM.YYYY HH:mm">
                                        {item.createdAt}
                                    </Moment>
                                </Typography>
                                {item.payload}
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