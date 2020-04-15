import { RACES_ACTIONS, RacesActionParameters } from './racesActions'

export interface Race {
  id?: number
  name: string
  speciesId: number
}

export interface RacesState {
  items: Race[]
  loading: boolean
  error: String | null
}

const initialState = {
  items: [] as Race[],
  loading: false,
  error: null,
}

export const racesReducer = (
  state: RacesState = initialState,
  action: RACES_ACTIONS
) => {
  switch (action.type) {
    case RacesActionParameters.GET_RACES:
    case RacesActionParameters.GET_RACE:
    case RacesActionParameters.CREATE_RACE:
    case RacesActionParameters.UPDATE_RACE:
    case RacesActionParameters.DELETE_RACE:
      return { ...state, loading: true }

    case RacesActionParameters.GET_RACE_FAIL:
    case RacesActionParameters.GET_RACES_FAIL:
    case RacesActionParameters.CREATE_RACE_FAIL:
    case RacesActionParameters.DELETE_RACE_FAIL:
    case RacesActionParameters.UPDATE_RACE_FAIL:
      return { ...state, loading: false }

    case RacesActionParameters.CREATE_RACE_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.payload],
        loading: false,
      }

    case RacesActionParameters.GET_RACES_SUCCESS:
      return {
        ...state,
        items: [...action.payload],
        loading: false,
      }

    case RacesActionParameters.DELETE_RACE_SUCCESS:
      return {
        ...state,
        items: state.items.filter(x => x.id !== action.payload),
        loading: false,
      }

    case RacesActionParameters.GET_RACE_SUCCESS:
    case RacesActionParameters.UPDATE_RACE_SUCCESS:
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
