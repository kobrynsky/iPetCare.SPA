import React, { useState, useEffect } from "react"
import { RouteComponentProps, useHistory } from "react-router-dom"
import { Card, CircularProgress, Button, TextareaAutosize, TextField, Grid, Typography } from "@material-ui/core"
import { RootState } from "../../../state/store"
import { useDispatch, useSelector } from "react-redux"
import { createNote } from "../../../state/notes/notesActions"
import moment from "moment"

interface PetNotesPageParams {
    petId: string;
}

export const AddNotePage = (props: RouteComponentProps<PetNotesPageParams>) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const notesState = useSelector((state: RootState) => state.notes)

    const [payload, setPayload] = useState('')
    const [importantDate, setImportantDate] = useState('')
    const [error, setError] = useState(false)

    const petId = props.match.params.petId
    const createdAt = moment().format()

    useEffect(() => {
        if (notesState.error) {
            setError(true)
        }
    }, [notesState.error, error])

    const onSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(false)
        if (importantDate === '')
            dispatch(createNote({ petId: petId, payload: payload, createdAt: createdAt }))
        else
            dispatch(createNote({ petId: petId, payload: payload, createdAt: createdAt, importantDate: importantDate }))

        history.push(`/pets/${petId}/notes`)
    }

    return (
        <div>
            <Grid item>
                <Typography variant="h2" className="title">
                    Dodawanie notatki
                </Typography>
            </Grid>
            <Card className="formCard">
                <form onSubmit={onSumbit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextareaAutosize
                                required
                                placeholder="Treść"
                                rowsMin={10}
                                onChange={e => setPayload(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <TextField
                                id="datetime-local"
                                label="Ważna data"
                                type="datetime-local"
                                defaultValue=""
                                onChange={e => setImportantDate(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }} />
                        </Grid>
                        <Grid item xs={6} sm={3}>
                        </Grid>
                        <Grid
                            item xs={12}
                            sm={6}
                            container
                            direction="row"
                            justify="flex-end"
                            alignItems="flex-end">
                            {notesState.loading ?
                                (
                                    <CircularProgress style={{ alignSelf: 'center' }} />
                                )
                                :
                                (
                                    <Button type="submit">Dodaj</Button>
                                )}
                        </Grid>
                    </Grid>
                </form>
            </Card>
        </div>
    )
}