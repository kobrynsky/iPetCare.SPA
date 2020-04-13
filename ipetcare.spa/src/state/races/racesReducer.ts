import _ from 'lodash'
import { RACES_ACTIONS, RacesActionTypes } from './racesActions'
import { Reducer } from 'redux'
import { ListItemSecondaryAction } from '@material-ui/core'

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
        items: [...state.items, action.payload],
        loading: false,
      }

    case RacesActionTypes.GET_RACES_SUCCESS:
      return {
        ...state,
        items: [...state.items, ...action.payload],
        loading: false,
      }

    case RacesActionTypes.DELETE_RACE_SUCCESS:
      return {
        ...state,
        items: state.items.filter(x => x.id !== action.payload),
      }

    default:
      return state
  }
}
