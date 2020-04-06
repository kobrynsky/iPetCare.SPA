import { USER_ACTIONS } from './userActions'

export interface UserState {
  firstName: string
  lastName: string
  userName: string
  token: string
  email: string
  role: string
  id: string
}

export interface UserProfile {
  firstName: string
  lastName: string
  userName: string
  token: string
  email: string
  role: string
  placeOfResidence: string
  specialization: string
  id: string
  imageUrl: string
}

export const initalState: UserState = {
  firstName: '',
  lastName: '',
  email: '',
  id: '',
  userName: '',
  token: '',
  role: '',
}

export const initialUserProfile: UserProfile = {
  firstName: '',
  lastName: '',
  userName: '',
  token: '',
  email: '',
  role: '',
  placeOfResidence: '',
  specialization: '',
  id: '',
  imageUrl: '',
}

export const userReducer = (
  state: UserState = initalState,
  action: USER_ACTIONS
): UserState => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}
