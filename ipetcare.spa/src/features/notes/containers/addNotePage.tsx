import React, { useState, useEffect } from "react"
import { RouteComponentProps, useHistory } from "react-router-dom"
import { Card, CircularProgress, Button, TextareaAutosize } from "@material-ui/core"
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
        dispatch(createNote({ petId: petId, payload: payload, createdAt: createdAt }))
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
                    />
                    {notesState.loading ?
                        (
                            <CircularProgress style={{ alignSelf: 'center' }} />
                        )
                        :
                        (
                            <Button type="submit">Dodaj notatkę</Button>
                        )}
                </div>
            </form>
        </Card>
    )
}