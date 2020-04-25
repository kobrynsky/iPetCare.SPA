import React, { useState, useEffect } from "react"
import { RouteComponentProps, useHistory } from "react-router-dom"
import { Card, CircularProgress, Button, TextareaAutosize, Grid, Typography, TextField } from "@material-ui/core"
import { RootState } from "../../../state/store"
import { useDispatch, useSelector } from "react-redux"
import { getNote, updateNote } from "../../../state/notes/notesActions"
import moment from "moment"

interface EditPetNotePageParams {
    petId: string;
    noteId: string;
}

export const EditNotePage = (props: RouteComponentProps<EditPetNotePageParams>) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const notesState = useSelector((state: RootState) => state.notes)

    const [payload, setPayload] = useState('')
    const [importantDate, setImportantDate] = useState('')
    const [error, setError] = useState(false)

    const petId = props.match.params.petId
    const noteId = props.match.params.noteId
    const createdAt = moment().format()


    useEffect(() => {
        dispatch(getNote(noteId, petId))

    }, [])

    useEffect(() => {
        if (notesState.error) {
            setError(true)
        }
    }, [notesState.error, error])

    const onSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(false)
        if (importantDate == '' || importantDate == undefined)
            dispatch(updateNote({ id: noteId, petId: petId, payload: payload, createdAt: createdAt }))
        else
            dispatch(updateNote({ id: noteId, petId: petId, payload: payload, createdAt: createdAt, importantDate: importantDate }))

        history.push(`/pets/${petId}/notes`)
    }

    return (
        <div>
            {notesState.loading ?
                (
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
                )
                :
                (
                    <div>
                        < Grid item>
                            <Typography variant="h2" className="title">
                                Edytowanie notatki
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
                                            defaultValue={notesState.items.filter(x => x.id == noteId)[0]?.payload}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <TextField
                                            id="datetime-local"
                                            label="Ważna data"
                                            type="datetime-local"
                                            defaultValue={notesState.items.filter(x => x.id == noteId)[0]?.importantDate}
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
                                        <Button type="submit">Edytuj</Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Card>
                    </div>
                )}

        </div >
    )
}