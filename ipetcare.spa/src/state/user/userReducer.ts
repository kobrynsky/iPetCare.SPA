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
  token?: string
  email: string
  role: string
  placeOfResidence: string
  specialization: string
  id?: string
  imageUrl: string
}

export interface UserState {
  user: User
  items: User[]
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
  items: [] as User[],
  loading: false,
  error: null,
}

export const userReducer = (
  state: UserState = initialUserProfile,
  action: USER_ACTIONS
): UserState => {
  switch (action.type) {
    case UserActionTypes.LOGIN_USER:
    case UserActionTypes.REGISTER_USER:
    case UserActionTypes.EDIT_USER:
    case UserActionTypes.GET_ALL_USERS:
    case UserActionTypes.GET_ALL_USERS_FAIL:
      return { ...state, loading: true }

    case UserActionTypes.REGISTER_USER_FAIL:
    case UserActionTypes.EDIT_USER_FAIL:
      return { ...state, loading: false, error: action.payload }

    case UserActionTypes.REGISTER_USER_SUCCESS:
      return { ...state, loading: false }

    case UserActionTypes.LOGIN_USER_FAIL:
      return { ...state, loading: false, error: 'Błędny login lub hasło' }

    case UserActionTypes.LOGIN_USER_SUCCESS:
    case UserActionTypes.EDIT_USER_SUCCESS:
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

    case UserActionTypes.GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        items: [...action.payload],
        loading: false,
      }

    default:
      return state
  }
}
