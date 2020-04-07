import { USER_ACTIONS, UserActionTypes } from './userActions'

// export interface User {
//   firstName: string
//   lastName: string
//   userName: string
//   token: string
//   email: string
//   role: string
//   id: string
// }

export interface User {
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

export interface UserState {
  user: User
  loading: boolean
  error: string | null
}

// export const initalState: UserState = {
//   firstName: '',
//   lastName: '',
//   email: '',
//   id: '',
//   userName: '',
//   token: '',
//   role: '',
// }

export const initialUserProfile: UserState = {
  user: {
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
  },
  loading: false,
  error: null,
}

export const userReducer = (
  state: UserState = initialUserProfile,
  action: USER_ACTIONS
): UserState => {
  switch (action.type) {
    case UserActionTypes.LOGIN_USER:
      return { ...state, loading: true }

    case UserActionTypes.LOGIN_USER_FAIL:
      return { ...state, loading: false, error: 'Błędny login lub hasło' }

    case UserActionTypes.LOGIN_USER_SUCCESS:
      const user = action.payload
      return {
        ...state,
        user: { ...state.user, ...user },
        loading: false,
      }

    case UserActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
      }

    case UserActionTypes.LOGOUT:
      return {
        ...state,
        user: {} as User,
      }
    default:
      return state
  }
}
