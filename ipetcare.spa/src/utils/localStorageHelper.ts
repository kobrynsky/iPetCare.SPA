import { User } from '../state/user/userReducer'

export const saveUserState = (state: User) => {
  localStorage.setItem('userState', JSON.stringify(state))
}

export const getUserState = (): User | null => {
  const user = localStorage.getItem('userState')
  if (user && user !== 'undefined') return JSON.parse(user)

  return null
}

export const deleteUserState = () => {
  localStorage.removeItem('userState')
}
