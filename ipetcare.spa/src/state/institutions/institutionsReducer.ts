import _ from 'lodash'
import { INSTITUTIONS_ACTIONS, InstitutionsActionTypes } from './institutionsActions'
import { Reducer } from 'redux'

export interface Institution {
    id?: string
    name: string
    address: string
}

export interface InstitutionsState {
    items: Institution[]
    loading: boolean
    error: String | null
}

const initialState = {
    items: [] as Institution[],
    loading: false,
    error: null,
}

export const institutionsReducer = (
    state: InstitutionsState = initialState,
    action: INSTITUTIONS_ACTIONS
) => {
    switch (action.type) {
        case InstitutionsActionTypes.GET_INSTITUTIONS:
        case InstitutionsActionTypes.GET_INSTITUTION:
        case InstitutionsActionTypes.CREATE_INSTITUTION:
        case InstitutionsActionTypes.UPDATE_INSTITUTION:
        case InstitutionsActionTypes.DELETE_INSTITUTION:
            return { ...state, loading: true }

        case InstitutionsActionTypes.GET_INSTITUTION_FAIL:
        case InstitutionsActionTypes.GET_INSTITUTIONS_FAIL:
        case InstitutionsActionTypes.CREATE_INSTITUTION_FAIL:
        case InstitutionsActionTypes.DELETE_INSTITUTION_FAIL:
        case InstitutionsActionTypes.UPDATE_INSTITUTION_FAIL:
            return { ...state, loading: false }

        case InstitutionsActionTypes.GET_INSTITUTION_SUCCESS:
        case InstitutionsActionTypes.CREATE_INSTITUTION_SUCCESS:
            return {
                ...state,
                items: [...state.items, action.payload],
                loading: false,
            }

        case InstitutionsActionTypes.GET_INSTITUTIONS_SUCCESS:
            return {
                ...state,
                items: [...action.payload],
                loading: false,
            }

        case InstitutionsActionTypes.DELETE_INSTITUTION_SUCCESS:
            return {
                ...state,
                items: state.items.filter(x => x.id !== action.payload),
                loading: false,
            }

        case InstitutionsActionTypes.UPDATE_INSTITUTION_SUCCESS:
            return {
                ...state,
                items: [...state.items.filter(x => x.id !== action.payload.id), action.payload],
                loading: false,
            }

        default:
            return state
    }
}
