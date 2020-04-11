import _ from 'lodash'
import { SPECIES_ACTIONS, SpeciesActionTypes } from './speciesActions'
import { Reducer } from 'redux'
import { ListItemSecondaryAction } from '@material-ui/core'

export interface Species {
    id?: number
    name: string
}

export interface SpeciesState {
    items: Species[]
    loading: boolean
    error: String | null
}

const initialState = {
    items: [] as Species[],
    loading: false,
    error: null,
}

export const speciesReducer = (
    state: SpeciesState = initialState,
    action: SPECIES_ACTIONS
) => {
    switch (action.type) {
        case SpeciesActionTypes.GET_SPECIES:
        case SpeciesActionTypes.GET_ALL_SPECIES:
        case SpeciesActionTypes.CREATE_SPECIES:
        case SpeciesActionTypes.UPDATE_SPECIES:
          return { ...state, loading: true }
    
        case SpeciesActionTypes.GET_SPECIES_FAIL:
        case SpeciesActionTypes.GET_ALL_SPECIES_FAIL:
        case SpeciesActionTypes.CREATE_SPECIES_FAIL:
          return { ...state, loading: false }
    
        case SpeciesActionTypes.GET_SPECIES_SUCCESS:
        case SpeciesActionTypes.CREATE_SPECIES_SUCCESS:
          const { id } = action.payload
          return {
            ...state,
            items: [...state.items, action.payload],
            loading: false,
          }
    
        case SpeciesActionTypes.GET_ALL_SPECIES_SUCCESS:
          return {
            ...state,
            items: [...state.items, ...action.payload],
            loading: false,
          }
    
        case SpeciesActionTypes.DELETE_SPECIES_SUCCESS:
          return {
            ...state,
            items: state.items.map(x => x.id !== action.payload),
          }
    
        default:
          return state
      }
}