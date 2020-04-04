import _ from 'lodash'
import { PetsAction, PetsActionTypes } from '../actions/petsActions'
import { Reducer } from 'redux'

export interface Pet {
  id: string
  imageUrl: string
  name: string
  weight: number
  height: number
  birthDate: Date
  raceId: number
  gender: string
}

export interface Pets {
  [id: number]: Pet
}

export interface PetsState {
  items: Pets
  loading: boolean
  error: String | null
}

const initialState = {
  items: {},
  loading: false,
  error: null,
}

export const petsReducer: Reducer<PetsState, PetsAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case PetsActionTypes.GET_PET:
    case PetsActionTypes.GET_PETS:
    case PetsActionTypes.CREATE_PET:
    case PetsActionTypes.UPDATE_PET:
      return { ...state, loading: true }

    case PetsActionTypes.GET_PET_FAIL:
    case PetsActionTypes.GET_PETS_FAIL:
    case PetsActionTypes.CREATE_PET_FAIL:
      return { ...state, loading: false }

    case PetsActionTypes.GET_PET_SUCCESS:
    case PetsActionTypes.CREATE_PET_SUCCESS:
      const { id } = action.payload
      return {
        ...state,
        items: { ...state.items, [id]: action.payload },
        loading: false,
      }

    case PetsActionTypes.GET_PETS_SUCCESS:
      return {
        ...state,
        items: { ...state.items, ..._.mapKeys(action.payload.pets, 'id') },
        loading: false,
      }

    case PetsActionTypes.DELETE_PET_SUCCESS:
      return {
        ...state,
        items: { ..._.omit(state.items, action.payload) },
      }

    default:
      return state
  }
}
