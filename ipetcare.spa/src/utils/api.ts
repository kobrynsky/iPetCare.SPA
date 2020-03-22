import axios from 'axios'

export const setTokenInHeader = (token: string | null) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
  }
}
export const deleteTokenInHeader = () => {
  delete axios.defaults.headers.common['Authorization']
}
