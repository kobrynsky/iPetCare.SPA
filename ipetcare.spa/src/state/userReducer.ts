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

const initalState: UserState = {
  firstName: '',
  lastName: '',
  email: '',
  id: '',
  userName: '',
  token: '',
  role: '',
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
