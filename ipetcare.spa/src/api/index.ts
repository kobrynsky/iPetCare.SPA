import axios, { AxiosResponse } from 'axios'
import { BASE_URL } from '../utils/constants'
import { getUserState, deleteUserState } from '../utils/localStorageHelper'
import { useHistory } from 'react-router-dom'
import { Pet } from '../state/pets/petsReducer'
import { Race } from '../state/races/racesReducer'
import { history } from '../index'
import { User } from '../state/user/userReducer'
import {
  LoginProps,
  RegisterProps,
  GetSearchDto,
  GetSearchResponseDto,
} from './dto'

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
const racesBody = (response: any) => response.races

const requests = {
  get: (url: string, body?: {}) =>
    axios.get(url, { data: body }).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
}

export const Users = {
  login: (user: LoginProps): Promise<User> =>
    requests.post('/users/login', user),
  register: (user: RegisterProps): Promise<User> =>
    requests.post('/users/register', user),
  users: (): Promise<User[]> => requests.get('/users'),
  edit: (user: User): Promise<User> => requests.put('/users', user),
  getVets: (searchDto: GetSearchDto): Promise<GetSearchResponseDto> =>
    requests.post('users/vets', searchDto),
  getOwners: (searchDto: GetSearchDto): Promise<GetSearchResponseDto> =>
    requests.post('users/owners', searchDto),
}

export const Pets = {
  getPets: (): Promise<Pet[]> => requests.get('/pets'),
  getPet: (id: string): Promise<Pet> => requests.get(`/pets/${id}`),
  create: (pet: Pet) => requests.post('/pets', pet),
  update: (pet: Pet) => requests.put('/pets', pet),
  delete: (id: string) => requests.del(`/pets/${id}`),
}

export const Races = {
  getRaces: (): Promise<Race[]> => requests.get('/races').then(racesBody),
  getRace: (id: number): Promise<Race> => requests.get(`/races/${id}`),
  create: (race: Race) => requests.post('/races', race),
  update: (race: Race) => requests.put('/races', race),
  delete: (id: number) => requests.del(`/races/${id}`),
}
