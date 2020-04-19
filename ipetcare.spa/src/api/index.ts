import axios, { AxiosResponse } from 'axios'
import { BASE_URL } from '../utils/constants'
import { getUserState, deleteUserState } from '../utils/localStorageHelper'
import { Pet } from '../state/pets/petsReducer'
import { Race } from '../state/races/racesReducer'
import { Species } from '../state/species/speciesReducer'
import { history } from '../index'
import { User } from '../state/user/userReducer'
import {
  LoginProps,
  RegisterProps,
  GetSearchDto,
  GetSearchResponseDto,
} from './dto'
import { Institution } from '../state/institutions/institutionsReducer'
import { ExaminationType } from '../state/examinationTypes/examinationTypesReducer'
import { ExaminationParameter } from '../state/examinationParameters/examinationParametersReducer'
import { toast } from 'react-toastify'

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
  const { status, data, config } = error.response
  if (status === 404) {
    console.log(error.response)
    toast.error("Błąd: " + error.response.data)
    history.push('/notfound')
  }
  if (status === 403) {
    console.log(error.response)
    toast.error("Błąd: " + error.response.data)
    history.push('/forbidden')
  }
  if (status === 401) {
    console.log(error.response)
    toast.error("Błąd: " + error.response.data)
    deleteUserState()
    history.push('/unauthorized')
    console.info('Twoja sesja wygasła, zaloguj się ponownie.')
  }
  if (
    status === 400
  ) {
    history.push('/notfound')
    toast.error("Błąd: " + error.response.data)
    console.log(error.response)
  }
  if (status === 500) {
    console.log(error.response)
    toast.error("Błąd: " + "Błąd serwera - sprawdź konsolę, aby uzyskać więcej informacji!")
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
const examinationParameterBody = (response: any) => response.examinationParameters
const petsBody = (response: any) => response.pets
const usersBody = (response: any) => response.users

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
  getAllUsers: (): Promise<User[]> => requests.get('/users').then(usersBody),
}

export const Pets = {
  getPets: (): Promise<Pet[]> => requests.get('/pets').then(petsBody),
  getMyPets: (): Promise<Pet[]> => requests.get('/pets/my').then(petsBody),
  getPet: (id: string): Promise<Pet> => requests.get(`/pets/${id}`),
  create: (pet: Pet) => requests.post('/pets', pet),
  update: (pet: Pet) => requests.put(`/pets/${pet.id}`, pet),
  delete: (id: string) => requests.del(`/pets/${id}`),
}

export const Races = {
  getRaces: (): Promise<Race[]> => requests.get('/races').then(racesBody),
  getRace: (id: number): Promise<Race> => requests.get(`/races/${id}`),
  create: (race: Race) => requests.post('/races', race),
  update: (race: Race) => requests.put(`/races/${race.id}`, race),
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

export const ExaminationParameters = {
  getExaminationParameters: (): Promise<ExaminationParameter[]> => requests.get('/examinationParameters').then(examinationParameterBody),
  getExaminationParameter: (id: number): Promise<ExaminationParameter> => requests.get(`/examinationParameters/${id}`),
  create: (examinationParameter: ExaminationParameter) => requests.post('/examinationParameters', examinationParameter),
  update: (examinationParameter: ExaminationParameter) => requests.put(`/examinationParameters/${examinationParameter.id}`, examinationParameter),
  delete: (id: number) => requests.del(`/examinationParameters/${id}`),
}

export const AllSpecies = {
  getAllSpecies: (): Promise<Species[]> => requests.get('/species').then(speciesBody),
  getSpecies: (id: number): Promise<Species> => requests.get(`/species/${id}`),
  create: (species: Species) => requests.post('/species', species),
  update: (species: Species) => requests.put(`/species/${species.id}`, species),
  delete: (id: number) => requests.del(`/species/${id}`),
}
