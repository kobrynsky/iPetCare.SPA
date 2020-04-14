import { PETS_ACTIONS, PetsActionTypes } from './petsActions'
import { Reducer } from 'redux'

export interface Pet {
  id?: string
  imageUrl?: string
  name: string
  weight: number
  height: number
  birthDate: string
  raceId: number
  gender: string
}

export interface PetsState {
  items: Pet[]
  loading: boolean
  error: String | null
}

const initialState = {
  items: [] as Pet[],
  loading: false,
  error: null,
}

export const petsReducer: Reducer<PetsState, PETS_ACTIONS> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case PetsActionTypes.GET_PET:
    case PetsActionTypes.GET_PETS:
    case PetsActionTypes.GET_MY_PETS:
    case PetsActionTypes.CREATE_PET:
    case PetsActionTypes.UPDATE_PET:
    case PetsActionTypes.DELETE_PET:
      return { ...state, loading: true }

    case PetsActionTypes.GET_PET_FAIL:
    case PetsActionTypes.GET_PETS_FAIL:
    case PetsActionTypes.GET_MY_PETS_FAIL:
    case PetsActionTypes.CREATE_PET_FAIL:
    case PetsActionTypes.UPDATE_PET_FAIL:
    case PetsActionTypes.DELETE_PET_FAIL:
      return { ...state, loading: false }

    case PetsActionTypes.GET_PET_SUCCESS:
    case PetsActionTypes.CREATE_PET_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.payload],
        loading: false,
      }

    case PetsActionTypes.GET_PETS_SUCCESS:
    case PetsActionTypes.GET_MY_PETS_SUCCESS:
      return {
        ...state,
        items: [...action.payload],
        loading: false,
      }

    case PetsActionTypes.DELETE_PET_SUCCESS:
      return {
        ...state,
        items: state.items.filter(x => x.id !== action.payload),
        loading: false,
      }

    case PetsActionTypes.UPDATE_PET_SUCCESS:
      return {
        ...state,
        items: [...state.items.filter(x => x.id !== action.payload.id), action.payload],
        loading: false,
      }

    default:
      return state
  }
}
