import { UserState } from '../state/user/userReducer'

export const saveUserState = (state: UserState) => {
  localStorage.setItem('userState', JSON.stringify(state))
}

export const getUserState = (): UserState | null => {
  const user = localStorage.getItem('userState')
  if (user) return JSON.parse(user)

  return null
}

export const deleteUserState = () => {
  localStorage.removeItem('userState')
}
