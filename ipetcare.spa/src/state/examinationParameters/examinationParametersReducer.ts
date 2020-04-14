import { EXAMINATION_PARAMETERS_ACTIONS, ExaminationParametersActionParameters } from './examinationParametersActions'

export interface ExaminationParameter {
    id?: number
    name: string
    upperLimit: number
    lowerLimit: number
    examinationTypeId: number
}

export interface ExaminationParametersState {
    items: ExaminationParameter[]
    loading: boolean
    error: String | null
}

const initialState = {
    items: [] as ExaminationParameter[],
    loading: false,
    error: null,
}

export const examinationParametersReducer = (
    state: ExaminationParametersState = initialState,
    action: EXAMINATION_PARAMETERS_ACTIONS
) => {
    switch (action.type) {
        case ExaminationParametersActionParameters.GET_EXAMINATION_PARAMETERS:
        case ExaminationParametersActionParameters.GET_EXAMINATION_PARAMETER:
        case ExaminationParametersActionParameters.CREATE_EXAMINATION_PARAMETER:
        case ExaminationParametersActionParameters.UPDATE_EXAMINATION_PARAMETER:
        case ExaminationParametersActionParameters.DELETE_EXAMINATION_PARAMETER:
            return { ...state, loading: true }

        case ExaminationParametersActionParameters.GET_EXAMINATION_PARAMETER_FAIL:
        case ExaminationParametersActionParameters.GET_EXAMINATION_PARAMETERS_FAIL:
        case ExaminationParametersActionParameters.CREATE_EXAMINATION_PARAMETER_FAIL:
        case ExaminationParametersActionParameters.DELETE_EXAMINATION_PARAMETER_FAIL:
        case ExaminationParametersActionParameters.UPDATE_EXAMINATION_PARAMETER_FAIL:
            return { ...state, loading: false }

        case ExaminationParametersActionParameters.GET_EXAMINATION_PARAMETER_SUCCESS:
        case ExaminationParametersActionParameters.CREATE_EXAMINATION_PARAMETER_SUCCESS:
            return {
                ...state,
                items: [...state.items, action.payload],
                loading: false,
            }

        case ExaminationParametersActionParameters.GET_EXAMINATION_PARAMETERS_SUCCESS:
            return {
                ...state,
                items: [...action.payload],
                loading: false,
            }

        case ExaminationParametersActionParameters.DELETE_EXAMINATION_PARAMETER_SUCCESS:
            return {
                ...state,
                items: state.items.filter(x => x.id !== action.payload),
                loading: false,
            }

        case ExaminationParametersActionParameters.UPDATE_EXAMINATION_PARAMETER_SUCCESS:
            return {
                ...state,
                items: [...state.items.filter(x => x.id !== action.payload.id), action.payload],
                loading: false,
            }

        default:
            return state
    }
}
