import {
    EXAMINATIONS_ACTIONS,
    ExaminationsActionTypes,
} from './examinationsActions'

export interface Examination {
    id?: string
    date: Date
    examinationTypeId: number
    petId: string
    content?: string
}

export interface ExaminationDetails {
    id: string;
    date: string;
    examinationType: ExaminationType;
    content: string;
    pet: Pet;
    examinationParameterValues: ExaminationParameterValue[];
}

export interface ExaminationParameterValue {
    id: string;
    value: number;
    examinationParameter: ExaminationParameter;
}

export interface ExaminationParameter {
    id: number;
    name: string;
    upperLimit: number;
    lowerLimit: number;
}

export interface ExaminationType {
    id: number;
    name: string;
}

export interface Pet {
    id: string;
    name: string;
}


export interface ExaminationsState {
    items: Examination[]
    itemDetails?: ExaminationDetails
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
        case ExaminationsActionTypes.GET_EXAMINATIONS_BY_PET_ID:
        case ExaminationsActionTypes.GET_EXAMINATION:
        case ExaminationsActionTypes.CREATE_EXAMINATION:
        case ExaminationsActionTypes.UPDATE_EXAMINATION:
        case ExaminationsActionTypes.DELETE_EXAMINATION:
            return { ...state, loading: true }

        case ExaminationsActionTypes.GET_EXAMINATION_FAIL:
        case ExaminationsActionTypes.GET_EXAMINATIONS_FAIL:
        case ExaminationsActionTypes.GET_EXAMINATIONS_BY_PET_ID_FAIL:
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
        case ExaminationsActionTypes.GET_EXAMINATIONS_BY_PET_ID_SUCCESS:
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
            return {
                ...state,
                loading: false,
                itemDetails: action.payload
            }
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
