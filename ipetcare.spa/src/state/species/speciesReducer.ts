import { SPECIES_ACTIONS, SpeciesActionTypes } from './speciesActions'

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
    case SpeciesActionTypes.DELETE_SPECIES:
      return { ...state, loading: true }

    case SpeciesActionTypes.GET_SPECIES_FAIL:
    case SpeciesActionTypes.GET_ALL_SPECIES_FAIL:
    case SpeciesActionTypes.CREATE_SPECIES_FAIL:
    case SpeciesActionTypes.DELETE_SPECIES_FAIL:
    case SpeciesActionTypes.UPDATE_SPECIES_FAIL:
      return { ...state, loading: false }

    case SpeciesActionTypes.GET_SPECIES_SUCCESS:
    case SpeciesActionTypes.CREATE_SPECIES_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.payload],
        loading: false,
      }

    case SpeciesActionTypes.GET_ALL_SPECIES_SUCCESS:
      return {
        ...state,
        items: [...action.payload],
        loading: false,
      }

    case SpeciesActionTypes.DELETE_SPECIES_SUCCESS:
      return {
        ...state,
        items: state.items.filter(x => x.id !== action.payload),
        loading: false,
      }

    case SpeciesActionTypes.UPDATE_SPECIES_SUCCESS:
      return {
        ...state,
        items: [...state.items.filter(x => x.id !== action.payload.id), action.payload],
        loading: false,
      }

    default:
      return state
  }
}