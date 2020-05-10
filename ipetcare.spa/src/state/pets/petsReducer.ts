import { PETS_ACTIONS, PetsActionTypes } from './petsActions'
import { Reducer } from 'redux'
import { User } from '../user/userReducer'

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

export interface PetForm {
  id?: string
  image?: any
  name: string
  weight: number
  height: number
  birthDate: string
  raceId: number
  gender: string
}

export interface PetDetails {
  id?: string
  imageUrl?: string
  name: string
  weight: number
  height: number
  birthDate: string
  race: string
  species: string
  gender: string
  invitationStatus?: boolean
}

export interface InvitationStatus {
  invitationId?: string
  user: User
  pet: Pet
  pending: boolean
}

export interface PetsState {
  items: Pet[]
  sharedItems: Pet[]
  someonesItems: PetDetails[]
  invitationsStatus: InvitationStatus[]
  loading: boolean
  error: String | null
}

const initialState = {
  items: [] as Pet[],
  sharedItems: [] as Pet[],
  someonesItems: [] as PetDetails[],
  invitationsStatus: [] as InvitationStatus[],
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
    case PetsActionTypes.GET_SHARED_PETS:
    case PetsActionTypes.GET_USER_PETS:
    case PetsActionTypes.CREATE_PET:
    case PetsActionTypes.UPDATE_PET:
    case PetsActionTypes.DELETE_PET:
    case PetsActionTypes.GET_PET_INVITATIONS:
    case PetsActionTypes.GET_MY_INVITATIONS:
      return { ...state, loading: true }

    case PetsActionTypes.GET_PET_FAIL:
    case PetsActionTypes.GET_PETS_FAIL:
    case PetsActionTypes.GET_MY_PETS_FAIL:
    case PetsActionTypes.GET_SHARED_PETS_FAIL:
    case PetsActionTypes.GET_USER_PETS_FAIL:
    case PetsActionTypes.CREATE_PET_FAIL:
    case PetsActionTypes.UPDATE_PET_FAIL:
    case PetsActionTypes.DELETE_PET_FAIL:
    case PetsActionTypes.GET_PET_INVITATIONS_FAIL:
    case PetsActionTypes.GET_MY_INVITATIONS_FAIL:
      return { ...state, loading: false }

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

    case PetsActionTypes.GET_SHARED_PETS_SUCCESS:
      return {
        ...state,
        sharedItems: [...action.payload],
        loading: false,
      }

    case PetsActionTypes.GET_USER_PETS_SUCCESS:
      return {
        ...state,
        someonesItems: [...action.payload],
        loading: false,
      }

    case PetsActionTypes.DELETE_PET_SUCCESS:
      return {
        ...state,
        items: state.items.filter(x => x.id !== action.payload),
        loading: false,
      }

    case PetsActionTypes.GET_PET_SUCCESS:
    case PetsActionTypes.UPDATE_PET_SUCCESS:
      return {
        ...state,
        items: [
          ...state.items.filter(x => x.id !== action.payload.id),
          action.payload,
        ],
        loading: false,
      }

    case PetsActionTypes.GET_PET_INVITATIONS_SUCCESS:
    case PetsActionTypes.GET_MY_INVITATIONS_SUCCESS:
      return {
        ...state,
        invitationsStatus: action.payload,
        loading: false,
      }


    default:
      return state
  }
}
