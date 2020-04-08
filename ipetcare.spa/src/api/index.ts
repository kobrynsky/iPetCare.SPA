import axios, { AxiosResponse } from 'axios'
import { BASE_URL } from '../utils/constants'
import { getUserState, deleteUserState } from '../utils/localStorageHelper'
import { useHistory } from 'react-router-dom'
import { Pet } from '../state/pets/petsReducer'
import { history } from '../index'
import { User } from '../state/user/userReducer'

axios.defaults.baseURL = BASE_URL

axios.interceptors.request.use(
  config => {
    const user = getUserState()
    if (user) config.headers.Authorization = `Bearer ${user.token}`
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(undefined, error => {
  if (error.message === 'Network Error' && !error.response) {
    console.error('Błąd sieci - upewnij się, że API działa!')
  }
  const { status, data, config, headers } = error.response
  if (status === 404) {
    history.push('/notfound')
  }
  if (status === 403) {
    history.push('/forbidden')
  }
  if (status === 401) {
    deleteUserState()
    history.push('/unauthorized')
    console.info('Twoja sesja wygasła, zaloguj się ponownie.')
  }
  if (
    status === 400 &&
    config.method === 'get' &&
    data.errors.hasOwnProperty('id')
  ) {
    history.push('/notfound')
  }
  if (status === 500) {
    console.error(
      'Błąd serwera - sprawdź konsolę, aby uzyskać więcej informacji!'
    )
  }
  throw error.response
})

const responseBody = (response: AxiosResponse) => response.data

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
}

export interface LoginProps {
  email: string
  password: string
}

export interface RegisterProps {
  firstName: string
  lastName: string
  userName: string
  email: string
  password: string
  role: 'Owner' | 'Vet' | 'Admin'
}

export const Users = {
  login: (user: LoginProps): Promise<User> =>
    requests.post('/users/login', user),
  register: (user: RegisterProps): Promise<User> =>
    requests.post('/users/register', user),
  users: (): Promise<User[]> => requests.get('/users'),
}

export const Pets = {
  getPets: (): Promise<Pet[]> => requests.get('/pets'),
  getPet: (id: string): Promise<Pet> => requests.get(`/pets/${id}`),
  create: (pet: Pet) => requests.post('/pets', pet),
  update: (pet: Pet) => requests.put('/pets', pet),
  delete: (id: string) => requests.del(`/pets/${id}`),
}
