import axios, { AxiosResponse } from 'axios'
import { BASE_URL } from '../utils/constants'
import { getUserState, deleteUserState } from '../utils/localStorageHelper'
import { useHistory } from 'react-router-dom'
import { Pet } from '../state/pets/petsReducer'
import { Race } from '../state/races/racesReducer'
import { Species } from '../state/species/speciesReducer'
import { history } from '../index'
import { User } from '../state/user/userReducer'
import { LoginProps, RegisterProps } from './dto'
import { Institution } from '../state/institutions/institutionsReducer'
import { ExaminationType } from '../state/examinationTypes/examinationTypesReducer'


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
const institutionsBody = (response: any) => response.institutions
const examinationTypesBody = (response: any) => response.examinationTypes
const speciesBody = (response: any) => response.species

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
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

export const Institutions = {
  getInstitutions: (): Promise<Institution[]> => requests.get('/institutions').then(institutionsBody),
  getInstitution: (id: string): Promise<Institution> => requests.get(`/institutions/${id}`),
  create: (institution: Institution) => requests.post('/institutions', institution),
  update: (institution: Institution) => requests.put(`/institutions/${institution.id}`, institution),
  delete: (id: string) => requests.del(`/institutions/${id}`),
}

export const ExaminationTypes = {
  getExaminationTypes: (): Promise<ExaminationType[]> => requests.get('/examinationTypes').then(examinationTypesBody),
  getExaminationType: (id: number): Promise<ExaminationType> => requests.get(`/examinationTypes/${id}`),
  create: (examinationType: ExaminationType) => requests.post('/examinationTypes', examinationType),
  update: (examinationType: ExaminationType) => requests.put(`/examinationTypes/${examinationType.id}`, examinationType),
  delete: (id: number) => requests.del(`/examinationTypes/${id}`),
}
export const AllSpecies = {
  getAllSpecies: (): Promise<Species[]> => requests.get('/species').then(speciesBody),
  getSpecies: (id: number): Promise<Species> => requests.get(`/species/${id}`),
  create: (species: Species) => requests.post('/species', species),
  update: (species: Species) => requests.put('/species', species),
  delete: (id: number) => requests.del(`/species/${id}`),
}
