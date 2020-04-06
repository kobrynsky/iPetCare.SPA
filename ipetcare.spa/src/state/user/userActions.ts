export interface User {
  firstName: string
  lastName: string
  userName: string
  token: string
  email: string
  role: string
  id: string
}

export enum UserActionTypes {
  UPDATE_PROFILE = 'UPDATE_PROFILE',
  UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS',
  UPDATE_PROFILE_FAIL = 'UPDATE_PROFILE_FAIL',
  SET_USER = 'SET_USER',
}


// export const SET_USER = 'SET_USER'
type SET_USER_ACTION = ReturnType<typeof setUser>

export const setUser = (user: User) =>
  ({
    type: UserActionTypes.SET_USER,
    payload: user,
  } as const)

export type USER_ACTIONS = SET_USER_ACTION
