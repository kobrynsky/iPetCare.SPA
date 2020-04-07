import _ from 'lodash'
import { RACES_ACTIONS, RacesActionTypes } from './racesActions'
import { Reducer } from 'redux'

export interface Race {
  id: number
  name: string
  speciesId: number
}

export interface Races {
  [id: number]: Race
}

export interface RacesState {
  items: Races
  loading: boolean
  error: String | null
}

const initialState = {
  items: {},
  loading: false,
  error: null,
}

export const racesReducer: Reducer<RacesState, RACES_ACTIONS> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case RacesActionTypes.GET_RACE:
    case RacesActionTypes.GET_RACES:
    case RacesActionTypes.CREATE_RACE:
    case RacesActionTypes.UPDATE_RACE:
      return { ...state, loading: true }

    case RacesActionTypes.GET_RACE_FAIL:
    case RacesActionTypes.GET_RACES_FAIL:
    case RacesActionTypes.CREATE_RACE_FAIL:
      return { ...state, loading: false }

    case RacesActionTypes.GET_RACE_SUCCESS:
    case RacesActionTypes.CREATE_RACE_SUCCESS:
      const { id } = action.payload
      return {
        ...state,
        items: { ...state.items, [id]: action.payload },
        loading: false,
      }

    case RacesActionTypes.GET_RACES_SUCCESS:
      return {
        ...state,
        items: { ...state.items, ..._.mapKeys(action.payload.races, 'id') },
        loading: false,
      }

    case RacesActionTypes.DELETE_RACE_SUCCESS:
      return {
        ...state,
        items: { ..._.omit(state.items, action.payload) },
      }

    default:
      return state
  }
}
