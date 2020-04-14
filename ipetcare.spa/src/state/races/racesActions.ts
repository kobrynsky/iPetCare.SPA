import { history } from './../../index'
import { Races as races } from '../../api'
import { ThunkAction } from 'redux-thunk'
import { Dispatch } from 'redux'
import { ThunkResult } from '../store'
import { Race } from './racesReducer'

export enum RacesActionTypes {
  GET_RACES = 'GET_RACES',
  GET_RACES_SUCCESS = 'GET_RACES_SUCCESS',
  GET_RACES_FAIL = 'GET_RACES_FAIL',
  GET_RACE = 'GET_RACE',
  GET_RACE_SUCCESS = 'GET_RACE_SUCCESS',
  GET_RACE_FAIL = 'GET_RACE_FAIL',
  CREATE_RACE = 'CREATE_RACE',
  CREATE_RACE_SUCCESS = 'CREATE_RACE_SUCCESS',
  CREATE_RACE_FAIL = 'CREATE_RACE_FAIL',
  UPDATE_RACE = 'UPDATE_RACE',
  UPDATE_RACE_SUCCESS = 'UPDATE_RACE_SUCCESS',
  UPDATE_RACE_FAIL = 'UPDATE_RACE_FAIL',
  DELETE_RACE = 'DELETE_RACE',
  DELETE_RACE_SUCCESS = 'DELETE_RACE_SUCCESS',
  DELETE_RACE_FAIL = 'DELETE_RACE_FAIL',
}

// FETCH RACE LIST
interface GetRaces {
  type: RacesActionParameters.GET_RACES
}

interface GetRacesSuccess {
  type: RacesActionParameters.GET_RACES_SUCCESS
  payload: any
}

interface GetRacesFail {
  type: RacesActionParameters.GET_RACES_FAIL
}

export const getRaces = (): ThunkResult<void> => async dispatch => {
  handleGetRaces(dispatch)
  try {
    const response: Race[] = await races.getRaces()
    handleGetRacesSuccess(dispatch, response)
  } catch (e) {
    handleGetRacesFail(dispatch)
  }
}

export const handleGetRaces = (dispatch: Dispatch<GetRaces>) => {
  dispatch({ type: RacesActionParameters.GET_RACES })
}

export const handleGetRacesSuccess = (
  dispatch: Dispatch<GetRacesSuccess>,
  response: Race[]
) => {
  dispatch({
    type: RacesActionParameters.GET_RACES_SUCCESS,
    payload: response,
  })
}

export const handleGetRacesFail = (dispatch: Dispatch<GetRacesFail>) => {
  dispatch({
    type: RacesActionParameters.GET_RACES_FAIL,
  })
}

// FETCH SINGLE RACE
interface GetRace {
  type: RacesActionParameters.GET_RACE
}

interface GetRacesuccess {
  type: RacesActionParameters.GET_RACE_SUCCESS
  payload: Race
}

interface GetRaceFail {
  type: RacesActionParameters.GET_RACE_FAIL
}

export const getRace = (id: number): ThunkResult<void> => async dispatch => {
  handleGetRace(dispatch)
  try {
    const response: Race = await races.getRace(id)
    handleGetRacesuccess(dispatch, response)
  } catch (e) {
    handleGetRaceFail(dispatch)
  }
}

export const handleGetRace = (dispatch: Dispatch<GetRace>) => {
  dispatch({ type: RacesActionParameters.GET_RACE })
}

const handleGetRacesuccess = (
  dispatch: Dispatch<GetRacesuccess>,
  response: Race
) => {
  dispatch({
    type: RacesActionParameters.GET_RACE_SUCCESS,
    payload: response,
  })
}

const handleGetRaceFail = (dispatch: Dispatch<GetRaceFail>) => {
  dispatch({
    type: RacesActionParameters.GET_RACE_FAIL,
  })
}

// ADD RACE
interface CreateRace {
  type: RacesActionParameters.CREATE_RACE
}

interface CreateRaceSuccess {
  type: RacesActionParameters.CREATE_RACE_SUCCESS
  payload: Race
}

interface CreateRaceFail {
  type: RacesActionParameters.CREATE_RACE_FAIL
}

export const createRace = (examinationParameter: Race): ThunkResult<void> => async dispatch => {
  handleCreateRace(dispatch)
  try {
    const response: Race = await races.create(examinationParameter)
    handleCreateRaceSuccess(dispatch, response)
  } catch (e) {
    handleCreateRaceFail(dispatch)
  }
}

const handleCreateRace = (dispatch: Dispatch<CreateRace>) => {
  dispatch({ type: RacesActionParameters.CREATE_RACE })
}

const handleCreateRaceSuccess = (
  dispatch: Dispatch<CreateRaceSuccess>,
  response: Race
) => {
  dispatch({ type: RacesActionParameters.CREATE_RACE_SUCCESS, payload: response })
  history.push('/Races')
}

const handleCreateRaceFail = (dispatch: Dispatch<CreateRaceFail>) => {
  dispatch({ type: RacesActionParameters.CREATE_RACE_FAIL })
}

// EDIT RACE
interface UpdateRace {
  type: RacesActionParameters.UPDATE_RACE
}

interface UpdateRaceSuccess {
  type: RacesActionParameters.UPDATE_RACE_SUCCESS
  payload: Race
}

interface UpdateRaceFail {
  type: RacesActionParameters.UPDATE_RACE_FAIL
}

export const updateRace = (
  updatedRace: Race
): ThunkResult<void> => async dispatch => {
  handleUpdateRace(dispatch)
  try {
    const response: Race = await races.update(updatedRace)
    handleUpdateRaceSuccess(dispatch, response)
  } catch (e) {
    handleUpdateRaceFail(dispatch)
  }
}

const handleUpdateRace = (dispatch: Dispatch<UpdateRace>): void => {
  dispatch({ type: RacesActionParameters.UPDATE_RACE })
}

const handleUpdateRaceSuccess = (
  dispatch: Dispatch<UpdateRaceSuccess>,
  updatedRace: Race
) => {
  dispatch({ type: RacesActionParameters.UPDATE_RACE_SUCCESS, payload: updatedRace })
}

const handleUpdateRaceFail = (dispatch: Dispatch<UpdateRaceFail>) => {
  dispatch({ type: RacesActionParameters.UPDATE_RACE_FAIL })
}

// DELETE RACE
interface DeleteRace {
  type: RacesActionParameters.DELETE_RACE
}

interface DeleteRaceSuccess {
  type: RacesActionParameters.DELETE_RACE_SUCCESS
  payload: number
}

interface DeleteRaceFail {
  type: RacesActionParameters.DELETE_RACE_FAIL
}

export const deleteRace = (
  deletedId: number
): ThunkResult<void> => async dispatch => {
  dispatch({ type: RacesActionParameters.DELETE_RACE })
  try {
    await races.delete(deletedId)
    dispatch({
      type: RacesActionParameters.DELETE_RACE_SUCCESS,
      payload: deletedId,
    })
  } catch (e) {
    dispatch({ type: RacesActionParameters.DELETE_RACE_FAIL })
  }
}

export type RACES_ACTIONS =
  | GetRaces
  | GetRacesSuccess
  | GetRacesFail
  | GetRace
  | GetRacesuccess
  | GetRaceFail
  | CreateRace
  | CreateRaceSuccess
  | CreateRaceFail
  | UpdateRace
  | UpdateRaceSuccess
  | UpdateRaceFail
  | DeleteRace
  | DeleteRaceSuccess
  | DeleteRaceFail
