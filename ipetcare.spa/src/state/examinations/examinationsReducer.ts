import {
    EXAMINATIONS_ACTIONS,
    ExaminationsActionTypes,
} from './examinationsActions'

export interface Examination {
    id?: string
    date: Date
    examinationTypeId: number
    noteId?: string
    petId: string
}

export interface ExaminationsState {
    items: Examination[]
    loading: boolean
    error: String | null
}

const initialState = {
    items: [] as Examination[],
    loading: false,
    error: null,
}

export const examinationsReducer = (
    state: ExaminationsState = initialState,
    action: EXAMINATIONS_ACTIONS
) => {
    switch (action.type) {
        case ExaminationsActionTypes.GET_EXAMINATIONS:
        case ExaminationsActionTypes.GET_EXAMINATION:
        case ExaminationsActionTypes.CREATE_EXAMINATION:
        case ExaminationsActionTypes.UPDATE_EXAMINATION:
        case ExaminationsActionTypes.DELETE_EXAMINATION:
            return { ...state, loading: true }

        case ExaminationsActionTypes.GET_EXAMINATION_FAIL:
        case ExaminationsActionTypes.GET_EXAMINATIONS_FAIL:
        case ExaminationsActionTypes.CREATE_EXAMINATION_FAIL:
        case ExaminationsActionTypes.DELETE_EXAMINATION_FAIL:
        case ExaminationsActionTypes.UPDATE_EXAMINATION_FAIL:
            return { ...state, loading: false }

        case ExaminationsActionTypes.CREATE_EXAMINATION_SUCCESS:
            return {
                ...state,
                items: [...state.items, action.payload],
                loading: false,
            }

        case ExaminationsActionTypes.GET_EXAMINATIONS_SUCCESS:
            return {
                ...state,
                items: [...action.payload],
                loading: false,
            }

        case ExaminationsActionTypes.DELETE_EXAMINATION_SUCCESS:
            return {
                ...state,
                items: state.items.filter(x => x.id !== action.payload),
                loading: false,
            }

        case ExaminationsActionTypes.GET_EXAMINATION_SUCCESS:
        case ExaminationsActionTypes.UPDATE_EXAMINATION_SUCCESS:
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
