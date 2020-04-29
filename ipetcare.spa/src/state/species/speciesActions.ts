import { history } from './../../index'
import { AllSpecies as species } from '../../api'
import { ThunkAction } from 'redux-thunk'
import { Dispatch } from 'redux'
import { RootState, RootActions } from '../store'
import { Species } from './speciesReducer'
import { toast } from 'react-toastify'

export type ThunkResult<R> = ThunkAction<R, RootState, undefined, RootActions>
export enum SpeciesActionTypes {
  GET_ALL_SPECIES = 'GET_ALL_SPECIES',
  GET_ALL_SPECIES_SUCCESS = 'GET_ALL_SPECIES_SUCCESS',
  GET_ALL_SPECIES_FAIL = 'GET_ALL_SPECIES_FAIL',
  GET_SPECIES = 'GET_SPECIES',
  GET_SPECIES_SUCCESS = 'GET_SPECIES_SUCCESS',
  GET_SPECIES_FAIL = 'GET_SPECIES_FAIL',
  CREATE_SPECIES = 'CREATE_SPECIES',
  CREATE_SPECIES_SUCCESS = 'CREATE_SPECIES_SUCCESS',
  CREATE_SPECIES_FAIL = 'CREATE_SPECIES_FAIL',
  UPDATE_SPECIES = 'UPDATE_SPECIES',
  UPDATE_SPECIES_SUCCESS = 'UPDATE_SPECIES_SUCCESS',
  UPDATE_SPECIES_FAIL = 'UPDATE_SPECIES_FAIL',
  DELETE_SPECIES = 'DELETE_SPECIES',
  DELETE_SPECIES_SUCCESS = 'DELETE_SPECIES_SUCCESS',
  DELETE_SPECIES_FAIL = 'DELETE_SPECIES_FAIL',
}

// FETCH SPECIES LIST
interface GetAllSpecies {
  type: SpeciesActionTypes.GET_ALL_SPECIES
}

interface GetAllSpeciesSuccess {
  type: SpeciesActionTypes.GET_ALL_SPECIES_SUCCESS
  payload: Species[]
}

interface GetAllSpeciesFail {
  type: SpeciesActionTypes.GET_ALL_SPECIES_FAIL
}

export const getAllSpecies = (): ThunkResult<void> => async dispatch => {
  handleGetAllSpecies(dispatch)
  try {
    const response: Species[] = await species.getAllSpecies()
    handleGetAllSpeciesSuccess(dispatch, response)
  } catch (e) {
    handleGetRacesFail(dispatch)
  }
}

export const handleGetAllSpecies = (dispatch: Dispatch<GetAllSpecies>) => {
  dispatch({ type: SpeciesActionTypes.GET_ALL_SPECIES })
}

export const handleGetAllSpeciesSuccess = (
  dispatch: Dispatch<GetAllSpeciesSuccess>,
  response: Species[]
) => {
  dispatch({
    type: SpeciesActionTypes.GET_ALL_SPECIES_SUCCESS,
    payload: response,
  })
}

export const handleGetRacesFail = (dispatch: Dispatch<GetAllSpeciesFail>) => {
  dispatch({
    type: SpeciesActionTypes.GET_ALL_SPECIES_FAIL,
  })
}

// FETCH SINGLE SPECIES
interface GetSpecies {
  type: SpeciesActionTypes.GET_SPECIES
}

interface GetSpeciesSuccess {
  type: SpeciesActionTypes.GET_SPECIES_SUCCESS
  payload: Species
}

interface GetSpeciesFail {
  type: SpeciesActionTypes.GET_SPECIES_FAIL
}

export const getSpecies = (id: number): ThunkResult<void> => async dispatch => {
  handleGetRace(dispatch)
  try {
    const response: Species = await species.getSpecies(id)
    handleGetRaceSuccess(dispatch, response)
  } catch (e) {
    handleGetRaceFail(dispatch)
  }
}

export const handleGetRace = (dispatch: Dispatch<GetSpecies>) => {
  dispatch({ type: SpeciesActionTypes.GET_SPECIES })
}

const handleGetRaceSuccess = (
  dispatch: Dispatch<GetSpeciesSuccess>,
  response: Species
) => {
  dispatch({
    type: SpeciesActionTypes.GET_SPECIES_SUCCESS,
    payload: response,
  })
}

const handleGetRaceFail = (dispatch: Dispatch<GetSpeciesFail>) => {
  dispatch({
    type: SpeciesActionTypes.GET_SPECIES_FAIL,
  })
}

// ADD SPECIES
interface CreateSpecies {
  type: SpeciesActionTypes.CREATE_SPECIES
}

interface CreateSpeciesSuccess {
  type: SpeciesActionTypes.CREATE_SPECIES_SUCCESS
  payload: Species
}

interface CreateSpeciesFail {
  type: SpeciesActionTypes.CREATE_SPECIES_FAIL
}

export const createSpecies = (
  speciesUnit: Species
): ThunkResult<void> => async dispatch => {
  handleCreateSpecies(dispatch)
  try {
    const response: Species = await species.create(speciesUnit)
    handleCreateSpeciesSuccess(dispatch, response)
    toast.success('Pomyślnie utworzono gatunek')
  } catch (e) {
    handleCreateSpeciesFail(dispatch)
  }
}

const handleCreateSpecies = (dispatch: Dispatch<CreateSpecies>) => {
  dispatch({ type: SpeciesActionTypes.CREATE_SPECIES })
}

const handleCreateSpeciesSuccess = (
  dispatch: Dispatch<CreateSpeciesSuccess>,
  response: Species
) => {
  dispatch({
    type: SpeciesActionTypes.CREATE_SPECIES_SUCCESS,
    payload: response,
  })
}

const handleCreateSpeciesFail = (dispatch: Dispatch<CreateSpeciesFail>) => {
  dispatch({ type: SpeciesActionTypes.CREATE_SPECIES_FAIL })
}

// EDIT SPECIES
interface UpdateSpecies {
  type: SpeciesActionTypes.UPDATE_SPECIES
}

interface UpdateSpeciesSuccess {
  type: SpeciesActionTypes.UPDATE_SPECIES_SUCCESS
  payload: Species
}

interface UpdateSpeciesFail {
  type: SpeciesActionTypes.UPDATE_SPECIES_FAIL
}

export const updateSpecies = (
  updatedSpecies: Species
): ThunkResult<void> => async dispatch => {
  handleUpdateSpecies(dispatch)
  try {
    const response: Species = await species.update(updatedSpecies)
    handleUpdateSpeciesSuccess(dispatch, response)
    toast.success('Pomyślnie zaktulizowano gatunek')
  } catch (e) {
    handleUpdateSpeciesFail(dispatch)
  }
}

const handleUpdateSpecies = (dispatch: Dispatch<UpdateSpecies>): void => {
  dispatch({ type: SpeciesActionTypes.UPDATE_SPECIES })
}

const handleUpdateSpeciesSuccess = (
  dispatch: Dispatch<UpdateSpeciesSuccess>,
  updatedRace: Species
) => {
  dispatch({
    type: SpeciesActionTypes.UPDATE_SPECIES_SUCCESS,
    payload: updatedRace,
  })
  history.push('/species')
}

const handleUpdateSpeciesFail = (dispatch: Dispatch<UpdateSpeciesFail>) => {
  dispatch({ type: SpeciesActionTypes.UPDATE_SPECIES_FAIL })
}

// DELETE SPECIES
interface DeleteSpecies {
  type: SpeciesActionTypes.DELETE_SPECIES
}

interface DeleteSpeciesSuccess {
  type: SpeciesActionTypes.DELETE_SPECIES_SUCCESS
  payload: number
}

interface DeleteSpeciesFail {
  type: SpeciesActionTypes.DELETE_SPECIES_FAIL
}

export const deleteSpecies = (
  deletedId: number
): ThunkResult<void> => async dispatch => {
  dispatch({ type: SpeciesActionTypes.DELETE_SPECIES })
  try {
    await species.delete(deletedId)
    dispatch({
      type: SpeciesActionTypes.DELETE_SPECIES_SUCCESS,
      payload: deletedId,
    })
    history.push('/species')
    toast.success('Pomyślnie usunięto gatunek')
  } catch (e) {
    dispatch({ type: SpeciesActionTypes.DELETE_SPECIES_FAIL })
  }
}

export type SPECIES_ACTIONS =
  | GetAllSpecies
  | GetAllSpeciesSuccess
  | GetAllSpeciesFail
  | GetSpecies
  | GetSpeciesSuccess
  | GetSpeciesFail
  | CreateSpecies
  | CreateSpeciesSuccess
  | CreateSpeciesFail
  | UpdateSpecies
  | UpdateSpeciesSuccess
  | UpdateSpeciesFail
  | DeleteSpecies
  | DeleteSpeciesSuccess
  | DeleteSpeciesFail
