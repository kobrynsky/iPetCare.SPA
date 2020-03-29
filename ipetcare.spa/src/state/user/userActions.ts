interface User {
  firstName: string
  lastName: string
  userName: string
  token: string
  email: string
  role: string
  id: string
}

export const SET_USER = 'SET_USER'
type SET_USER_ACTION = ReturnType<typeof setUser>

export const setUser = (user: User) =>
  ({
    type: SET_USER,
    payload: user,
  } as const)

export type USER_ACTIONS = SET_USER_ACTION
