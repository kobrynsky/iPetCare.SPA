import React, { useState, useEffect } from "react"
import { RouteComponentProps, useHistory } from "react-router-dom"
import { Card, CircularProgress, Button, TextareaAutosize } from "@material-ui/core"
import { RootState } from "../../../state/store"
import { useDispatch, useSelector } from "react-redux"
import { createNote, getNote, updateNote } from "../../../state/notes/notesActions"
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
        dispatch(updateNote({ id: noteId, petId: petId, payload: payload, createdAt: createdAt }))
        history.push(`/pets/${petId}/notes`)
    }

    return (
        <Card className="formCard">
            <form onSubmit={onSumbit}>
                <div className="noteForm">
                    <TextareaAutosize
                        required
                        placeholder="Treść"
                        rowsMin={10}
                        onChange={e => setPayload(e.target.value)}
                        defaultValue={notesState.items.filter(x => x.id == noteId)[0].payload}
                    />
                    {notesState.loading ?
                        (
                            <CircularProgress style={{ alignSelf: 'center' }} />
                        )
                        :
                        (
                            <Button type="submit">Edytuj notatkę</Button>
                        )}
                </div>
            </form>
        </Card>
    )
}