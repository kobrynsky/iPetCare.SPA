import {
    NOTES_ACTIONS,
    NotesActionTypes,
} from './notesActions'

export interface Note {
    id?: string
    payload: string
    createdAt: string
    petId: string
}

export interface NotesState {
    items: Note[]
    loading: boolean
    error: String | null
}

const initialState = {
    items: [] as Note[],
    loading: false,
    error: null,
    success: false
}

export const notesReducer = (
    state: NotesState = initialState,
    action: NOTES_ACTIONS
) => {
    switch (action.type) {
        case NotesActionTypes.GET_NOTES:
        case NotesActionTypes.GET_NOTE:
        case NotesActionTypes.CREATE_NOTE:
        case NotesActionTypes.UPDATE_NOTE:
        case NotesActionTypes.DELETE_NOTE:
            return { ...state, loading: true }

        case NotesActionTypes.GET_NOTE_FAIL:
        case NotesActionTypes.GET_NOTES_FAIL:
        case NotesActionTypes.CREATE_NOTE_FAIL:
        case NotesActionTypes.DELETE_NOTE_FAIL:
        case NotesActionTypes.UPDATE_NOTE_FAIL:
            return { ...state, loading: false }

        case NotesActionTypes.CREATE_NOTE_SUCCESS:
            return {
                ...state,
                items: [...state.items, action.payload],
                loading: false,
            }

        case NotesActionTypes.GET_NOTES_SUCCESS:
            return {
                ...state,
                items: [...action.payload],
                loading: false,
            }

        case NotesActionTypes.DELETE_NOTE_SUCCESS:
            return {
                ...state,
                items: state.items.filter(x => x.id !== action.payload),
                loading: false,
            }

        case NotesActionTypes.GET_NOTE_SUCCESS:
        case NotesActionTypes.UPDATE_NOTE_SUCCESS:
            return {
                ...state,
                items: [
                    ...state.items.filter(x => x.id !== action.payload.id),
                    action.payload,
                ],
                loading: false,
            }

        default:
            return state
    }
}
