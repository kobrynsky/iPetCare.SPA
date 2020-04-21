import { history } from './../../index'
import { Pets as pets } from '../../api'
import { Dispatch } from 'redux'
import { ThunkResult } from '../store'
import { Pet, PetForm } from './petsReducer'
import { RootState, RootActions } from '../store'
import { AxiosResponse } from 'axios'

export enum PetsActionTypes {
  GET_PETS = 'GET_PETS',
  GET_PETS_SUCCESS = 'GET_PETS_SUCCESS',
  GET_PETS_FAIL = 'GET_PETS_FAIL',
  GET_MY_PETS = 'GET_MY_PETS',
  GET_MY_PETS_SUCCESS = 'GET_MY_PETS_SUCCESS',
  GET_MY_PETS_FAIL = 'GET_MY_PETS_FAIL',
  GET_PET = 'GET_PET',
  GET_PET_SUCCESS = 'GET_PET_SUCCESS',
  GET_PET_FAIL = 'GET_PET_FAIL',
  CREATE_PET = 'CREATE_PET',
  CREATE_PET_SUCCESS = 'CREATE_PET_SUCCESS',
  CREATE_PET_FAIL = 'CREATE_PET_FAIL',
  UPDATE_PET = 'UPDATE_PET',
  UPDATE_PET_SUCCESS = 'UPDATE_PET_SUCCESS',
  UPDATE_PET_FAIL = 'UPDATE_PET_FAIL',
  DELETE_PET = 'DELETE_PET',
  DELETE_PET_SUCCESS = 'DELETE_PET_SUCCESS',
  DELETE_PET_FAIL = 'DELETE_PET_FAIL',
}

// FETCH PET LIST
interface GetPets {
  type: PetsActionTypes.GET_PETS
}

interface GetPetsSuccess {
  type: PetsActionTypes.GET_PETS_SUCCESS
  payload: any
}

interface GetPetsFail {
  type: PetsActionTypes.GET_PETS_FAIL
}

export const getPets = (): ThunkResult<void> => async dispatch => {
  handleGetPets(dispatch)
  try {
    const response: Pet[] = await pets.getPets()
    handleGetPetsSuccess(dispatch, response)
  } catch (e) {
    handleGetPetsFail(dispatch)
  }
}

export const handleGetPets = (dispatch: Dispatch<GetPets>) => {
  dispatch({ type: PetsActionTypes.GET_PETS })
}

export const handleGetPetsSuccess = (
  dispatch: Dispatch<GetPetsSuccess>,
  response: Pet[]
) => {
  dispatch({
    type: PetsActionTypes.GET_PETS_SUCCESS,
    payload: response,
  })
}

export const handleGetPetsFail = (dispatch: Dispatch<GetPetsFail>) => {
  dispatch({
    type: PetsActionTypes.GET_PETS_FAIL,
  })
}

// FETCH MY PETS LIST
interface GetMyPets {
  type: PetsActionTypes.GET_MY_PETS
}

interface GetMyPetsSuccess {
  type: PetsActionTypes.GET_MY_PETS_SUCCESS
  payload: Pet[]
}

interface GetMyPetsFail {
  type: PetsActionTypes.GET_MY_PETS_FAIL
}

export const getMyPets = (): ThunkResult<void> => async dispatch => {
  handleGetMyPets(dispatch)
  try {
    const response: Pet[] = await pets.getMyPets()
    handleGetMyPetsSuccess(dispatch, response)
  } catch (e) {
    handleGetMyPetsFail(dispatch)
  }
}

export const handleGetMyPets = (dispatch: Dispatch<GetMyPets>) => {
  dispatch({ type: PetsActionTypes.GET_MY_PETS })
}

export const handleGetMyPetsSuccess = (
  dispatch: Dispatch<GetMyPetsSuccess>,
  response: Pet[]
) => {
  dispatch({
    type: PetsActionTypes.GET_MY_PETS_SUCCESS,
    payload: response,
  })
}

export const handleGetMyPetsFail = (dispatch: Dispatch<GetMyPetsFail>) => {
  dispatch({
    type: PetsActionTypes.GET_MY_PETS_FAIL,
  })
}

// FETCH SINGLE PET
interface GetPet {
  type: PetsActionTypes.GET_PET
}

interface GetPetSuccess {
  type: PetsActionTypes.GET_PET_SUCCESS
  payload: Pet
}

interface GetPetFail {
  type: PetsActionTypes.GET_PET_FAIL
}

export const getPet = (id: string): ThunkResult<void> => async dispatch => {
  handleGetPet(dispatch)
  try {
    const response: Pet = await pets.getPet(id)
    handleGetPetSuccess(dispatch, response)
  } catch (e) {
    handleGetPetFail(dispatch)
  }
}

export const handleGetPet = (dispatch: Dispatch<GetPet>) => {
  dispatch({ type: PetsActionTypes.GET_PET })
}

const handleGetPetSuccess = (
  dispatch: Dispatch<GetPetSuccess>,
  response: Pet
) => {
  dispatch({
    type: PetsActionTypes.GET_PET_SUCCESS,
    payload: response,
  })
}

const handleGetPetFail = (dispatch: Dispatch<GetPetFail>) => {
  dispatch({
    type: PetsActionTypes.GET_PET_FAIL,
  })
}

// ADD PET
interface CreatePet {
  type: PetsActionTypes.CREATE_PET
}

interface CreatePetSuccess {
  type: PetsActionTypes.CREATE_PET_SUCCESS
  payload: Pet
}

interface CreatePetFail {
  type: PetsActionTypes.CREATE_PET_FAIL
}

export const createPet = (
  pet: Pet,
  file: File
): ThunkResult<void> => async dispatch => {
  handleCreatePet(dispatch)
  try {
    console.log(pet)
    const response: Pet = await pets.create(pet)
    console.log(response)
    handleCreatePetSuccess(dispatch, response)
  } catch (e) {
    handleCreatePetFail(dispatch)
  }
}

const handleCreatePet = (dispatch: Dispatch<CreatePet>) => {
  dispatch({ type: PetsActionTypes.CREATE_PET })
}

const handleCreatePetSuccess = (
  dispatch: Dispatch<CreatePetSuccess>,
  response: Pet
) => {
  dispatch({ type: PetsActionTypes.CREATE_PET_SUCCESS, payload: response })
}

const handleCreatePetFail = (dispatch: Dispatch<CreatePetFail>) => {
  dispatch({ type: PetsActionTypes.CREATE_PET_FAIL })
}

// EDIT PET
interface UpdatePet {
  type: PetsActionTypes.UPDATE_PET
}

interface UpdatePetSuccess {
  type: PetsActionTypes.UPDATE_PET_SUCCESS
  payload: Pet
}

interface UpdatePetFail {
  type: PetsActionTypes.UPDATE_PET_FAIL
}

export const updatePet = (
  updatedPet: PetForm
): ThunkResult<void> => async dispatch => {
  handleUpdatePet(dispatch)
  try {
    const response: AxiosResponse<Pet> = await pets.update(updatedPet)
    handleUpdatePetSuccess(dispatch, response.data)
  } catch (e) {
    handleUpdatePetFail(dispatch)
  }
}

const handleUpdatePet = (dispatch: Dispatch<UpdatePet>): void => {
  dispatch({ type: PetsActionTypes.UPDATE_PET })
}

const handleUpdatePetSuccess = (
  dispatch: Dispatch<UpdatePetSuccess>,
  updatedPet: Pet
) => {
  dispatch({ type: PetsActionTypes.UPDATE_PET_SUCCESS, payload: updatedPet })
}

const handleUpdatePetFail = (dispatch: Dispatch<UpdatePetFail>) => {
  dispatch({ type: PetsActionTypes.UPDATE_PET_FAIL })
}

// DELETE PET
interface DeletePet {
  type: PetsActionTypes.DELETE_PET
}

interface DeletePetSuccess {
  type: PetsActionTypes.DELETE_PET_SUCCESS
  payload: string
}

interface DeletePetFail {
  type: PetsActionTypes.DELETE_PET_FAIL
}

export const deletePet = (
  deletedId: string
): ThunkResult<void> => async dispatch => {
  dispatch({ type: PetsActionTypes.DELETE_PET })
  try {
    await pets.delete(deletedId)
    dispatch({
      type: PetsActionTypes.DELETE_PET_SUCCESS,
      payload: deletedId,
    })
    history.push('/pets')
  } catch (e) {
    dispatch({ type: PetsActionTypes.DELETE_PET_FAIL })
  }
}

export type PETS_ACTIONS =
  | GetPets
  | GetPetsSuccess
  | GetPetsFail
  | GetMyPets
  | GetMyPetsSuccess
  | GetMyPetsFail
  | GetPet
  | GetPetSuccess
  | GetPetFail
  | CreatePet
  | CreatePetSuccess
  | CreatePetFail
  | UpdatePet
  | UpdatePetSuccess
  | UpdatePetFail
  | DeletePet
  | DeletePetSuccess
  | DeletePetFail
