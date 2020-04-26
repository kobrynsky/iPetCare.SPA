import { history } from './../../index'
import { Notes as notes } from '../../api'
import { ThunkAction } from 'redux-thunk'
import { Dispatch } from 'redux'
import { RootState, RootActions } from '../store'
import { Note } from './notesReducer'
import { toast } from 'react-toastify'

export type ThunkResult<R> = ThunkAction<R, RootState, undefined, RootActions>
export enum NotesActionTypes {
    GET_NOTES = 'GET_NOTES',
    GET_NOTES_SUCCESS = 'GET_NOTES_SUCCESS',
    GET_NOTES_FAIL = 'GET_NOTES_FAIL',
    GET_NOTE = 'GET_NOTE',
    GET_NOTE_SUCCESS = 'GET_NOTE_SUCCESS',
    GET_NOTE_FAIL = 'GET_NOTE_FAIL',
    CREATE_NOTE = 'CREATE_NOTE',
    CREATE_NOTE_SUCCESS = 'CREATE_NOTE_SUCCESS',
    CREATE_NOTE_FAIL = 'CREATE_NOTE_FAIL',
    UPDATE_NOTE = 'UPDATE_NOTE',
    UPDATE_NOTE_SUCCESS = 'UPDATE_NOTE_SUCCESS',
    UPDATE_NOTE_FAIL = 'UPDATE_NOTE_FAIL',
    DELETE_NOTE = 'DELETE_NOTE',
    DELETE_NOTE_SUCCESS = 'DELETE_NOTE_SUCCESS',
    DELETE_NOTE_FAIL = 'DELETE_NOTE_FAIL',
}

// FETCH NOTE LIST
interface GetNotes {
    type: NotesActionTypes.GET_NOTES
}

interface GetNotesSuccess {
    type: NotesActionTypes.GET_NOTES_SUCCESS
    payload: any
}

interface GetNotesFail {
    type: NotesActionTypes.GET_NOTES_FAIL
}

export const getNotes = (petId: string): ThunkResult<void> => async dispatch => {
    handleGetNotes(dispatch)
    try {
        const response: Note[] = await notes.getNotes(petId)
        handleGetNotesSuccess(dispatch, response)
    } catch (e) {
        console.log(e)
        handleGetNotesFail(dispatch)
    }
}

export const handleGetNotes = (dispatch: Dispatch<GetNotes>) => {
    dispatch({ type: NotesActionTypes.GET_NOTES })
}

export const handleGetNotesSuccess = (
    dispatch: Dispatch<GetNotesSuccess>,
    response: Note[]
) => {
    dispatch({
        type: NotesActionTypes.GET_NOTES_SUCCESS,
        payload: response,
    })
}

export const handleGetNotesFail = (dispatch: Dispatch<GetNotesFail>) => {
    dispatch({
        type: NotesActionTypes.GET_NOTES_FAIL,
    })
}

// FETCH SINGLE NOTE
interface GetNote {
    type: NotesActionTypes.GET_NOTE
}

interface GetNotesuccess {
    type: NotesActionTypes.GET_NOTE_SUCCESS
    payload: Note
}

interface GetNoteFail {
    type: NotesActionTypes.GET_NOTE_FAIL
}

export const getNote = (id: string, petId: string): ThunkResult<void> => async dispatch => {
    handleGetNote(dispatch)
    try {
        const response: Note = await notes.getNote(id, petId)
        handleGetNotesuccess(dispatch, response)
    } catch (e) {
        handleGetNoteFail(dispatch)
    }
}

export const handleGetNote = (dispatch: Dispatch<GetNote>) => {
    dispatch({ type: NotesActionTypes.GET_NOTE })
}

const handleGetNotesuccess = (
    dispatch: Dispatch<GetNotesuccess>,
    response: Note
) => {
    dispatch({
        type: NotesActionTypes.GET_NOTE_SUCCESS,
        payload: response,
    })
}

const handleGetNoteFail = (dispatch: Dispatch<GetNoteFail>) => {
    dispatch({
        type: NotesActionTypes.GET_NOTE_FAIL,
    })
}

// ADD NOTE
interface CreateNote {
    type: NotesActionTypes.CREATE_NOTE
}

interface CreateNoteSuccess {
    type: NotesActionTypes.CREATE_NOTE_SUCCESS
    payload: Note
}

interface CreateNoteFail {
    type: NotesActionTypes.CREATE_NOTE_FAIL
}

export const createNote = (note: Note): ThunkResult<void> => async dispatch => {
    handleCreateNote(dispatch)
    try {
        console.log(note)
        const response: Note = await notes.create(note)
        handleCreateNoteSuccess(dispatch, response)
        toast.success("Dodano notatkę")
    } catch (e) {
        handleCreateNoteFail(dispatch)
    }
}

const handleCreateNote = (dispatch: Dispatch<CreateNote>) => {
    dispatch({ type: NotesActionTypes.CREATE_NOTE })
}

const handleCreateNoteSuccess = (
    dispatch: Dispatch<CreateNoteSuccess>,
    response: Note
) => {
    dispatch({ type: NotesActionTypes.CREATE_NOTE_SUCCESS, payload: response })
}

const handleCreateNoteFail = (dispatch: Dispatch<CreateNoteFail>) => {
    dispatch({ type: NotesActionTypes.CREATE_NOTE_FAIL })
}

// EDIT NOTE
interface UpdateNote {
    type: NotesActionTypes.UPDATE_NOTE
}

interface UpdateNoteSuccess {
    type: NotesActionTypes.UPDATE_NOTE_SUCCESS
    payload: Note
}

interface UpdateNoteFail {
    type: NotesActionTypes.UPDATE_NOTE_FAIL
}

export const updateNote = (
    updatedNote: Note,
): ThunkResult<void> => async dispatch => {
    handleUpdateNote(dispatch)
    try {
        console.log(updatedNote)
        const response: Note = await notes.update(updatedNote)
        handleUpdateNoteSuccess(dispatch, response)
        toast.success("Zaktualizowano notatkę")
    } catch (e) {
        handleUpdateNoteFail(dispatch)
    }
}

const handleUpdateNote = (dispatch: Dispatch<UpdateNote>): void => {
    dispatch({ type: NotesActionTypes.UPDATE_NOTE })
}

const handleUpdateNoteSuccess = (
    dispatch: Dispatch<UpdateNoteSuccess>,
    updatedNote: Note
) => {
    dispatch({ type: NotesActionTypes.UPDATE_NOTE_SUCCESS, payload: updatedNote })
}

const handleUpdateNoteFail = (dispatch: Dispatch<UpdateNoteFail>) => {
    dispatch({ type: NotesActionTypes.UPDATE_NOTE_FAIL })
}

// DELETE NOTE
interface DeleteNote {
    type: NotesActionTypes.DELETE_NOTE
}

interface DeleteNoteSuccess {
    type: NotesActionTypes.DELETE_NOTE_SUCCESS
    payload: string
}

interface DeleteNoteFail {
    type: NotesActionTypes.DELETE_NOTE_FAIL
}

export const deleteNote = (
    deletedId: string,
    petId: string
): ThunkResult<void> => async dispatch => {
    dispatch({ type: NotesActionTypes.DELETE_NOTE })
    try {
        await notes.delete(deletedId, petId)
        dispatch({
            type: NotesActionTypes.DELETE_NOTE_SUCCESS,
            payload: deletedId,
        })
        toast.success("Usunięto notkę")
    } catch (e) {
        dispatch({ type: NotesActionTypes.DELETE_NOTE_FAIL })
    }
}

export type NOTES_ACTIONS =
    | GetNotes
    | GetNotesSuccess
    | GetNotesFail
    | GetNote
    | GetNotesuccess
    | GetNoteFail
    | CreateNote
    | CreateNoteSuccess
    | CreateNoteFail
    | UpdateNote
    | UpdateNoteSuccess
    | UpdateNoteFail
    | DeleteNote
    | DeleteNoteSuccess
    | DeleteNoteFail
