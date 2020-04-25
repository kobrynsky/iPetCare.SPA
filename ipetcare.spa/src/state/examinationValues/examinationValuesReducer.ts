import {
    EXAMINATION_PARAMETER_VALUES_ACTIONS,
    ExaminationParameterValuesActionTypes,
} from './examinationValuesActions'

export interface ExaminationParameterValue {
    id?: string
    value: number
    examinationId: string
    examinationParameterId: number
}

export interface ExaminationParameterValuesState {
    items: ExaminationParameterValue[]
    loading: boolean
    error: String | null
}

const initialState = {
    items: [] as ExaminationParameterValue[],
    loading: false,
    error: null,
}

export const examinationParameterValuesReducer = (
    state: ExaminationParameterValuesState = initialState,
    action: EXAMINATION_PARAMETER_VALUES_ACTIONS
) => {
    switch (action.type) {
        case ExaminationParameterValuesActionTypes.GET_EXAMINATION_PARAMETER_VALUES:
        case ExaminationParameterValuesActionTypes.GET_EXAMINATION_PARAMETER_VALUE:
        case ExaminationParameterValuesActionTypes.GET_EXAMINATION_PARAMETER_VALUES_BY_EXAMINATION_ID:
        case ExaminationParameterValuesActionTypes.CREATE_EXAMINATION_PARAMETER_VALUE:
        case ExaminationParameterValuesActionTypes.UPDATE_EXAMINATION_PARAMETER_VALUE:
        case ExaminationParameterValuesActionTypes.DELETE_EXAMINATION_PARAMETER_VALUE:
            return { ...state, loading: true }

        case ExaminationParameterValuesActionTypes.GET_EXAMINATION_PARAMETER_VALUE_FAIL:
        case ExaminationParameterValuesActionTypes.GET_EXAMINATION_PARAMETER_VALUES_FAIL:
        case ExaminationParameterValuesActionTypes.CREATE_EXAMINATION_PARAMETER_VALUE_FAIL:
        case ExaminationParameterValuesActionTypes.DELETE_EXAMINATION_PARAMETER_VALUE_FAIL:
        case ExaminationParameterValuesActionTypes.UPDATE_EXAMINATION_PARAMETER_VALUE_FAIL:
        case ExaminationParameterValuesActionTypes.GET_EXAMINATION_PARAMETER_VALUES_BY_EXAMINATION_ID_FAIL:
            return { ...state, loading: false }

        case ExaminationParameterValuesActionTypes.CREATE_EXAMINATION_PARAMETER_VALUE_SUCCESS:
            return {
                ...state,
                items: [...state.items, action.payload],
                loading: false,
            }

        case ExaminationParameterValuesActionTypes.GET_EXAMINATION_PARAMETER_VALUES_SUCCESS:
        case ExaminationParameterValuesActionTypes.GET_EXAMINATION_PARAMETER_VALUES_BY_EXAMINATION_ID_SUCCESS:
            return {
                ...state,
                items: [...action.payload],
                loading: false,
            }

        case ExaminationParameterValuesActionTypes.DELETE_EXAMINATION_PARAMETER_VALUE_SUCCESS:
            return {
                ...state,
                items: state.items.filter(x => x.id !== action.payload),
                loading: false,
            }

        case ExaminationParameterValuesActionTypes.GET_EXAMINATION_PARAMETER_VALUE_SUCCESS:
        case ExaminationParameterValuesActionTypes.UPDATE_EXAMINATION_PARAMETER_VALUE_SUCCESS:
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
