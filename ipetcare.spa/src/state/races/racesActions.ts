import { history } from './../../index'
import { Races as races } from '../../api'
import { ThunkAction } from 'redux-thunk'
import { Dispatch } from 'redux'
import { ThunkResult } from '../store'
import { Race } from './racesReducer'
import { AxiosResponse } from 'axios'

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
  type: RacesActionTypes.GET_RACES
}

interface GetRacesSuccess {
  type: RacesActionTypes.GET_RACES_SUCCESS
  payload: any
}

interface GetRacesFail {
  type: RacesActionTypes.GET_RACES_FAIL
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
  dispatch({ type: RacesActionTypes.GET_RACES })
}

export const handleGetRacesSuccess = (
  dispatch: Dispatch<GetRacesSuccess>,
  response: Race[]
) => {
  dispatch({
    type: RacesActionTypes.GET_RACES_SUCCESS,
    payload: response,
  })
}

export const handleGetRacesFail = (dispatch: Dispatch<GetRacesFail>) => {
  dispatch({
    type: RacesActionTypes.GET_RACES_FAIL,
  })
}

// FETCH SINGLE RACE
interface GetRace {
  type: RacesActionTypes.GET_RACE
}

interface GetRaceSuccess {
  type: RacesActionTypes.GET_RACE_SUCCESS
  payload: Race
}

interface GetRaceFail {
  type: RacesActionTypes.GET_RACE_FAIL
}

export const getRace = (id: number): ThunkResult<void> => async dispatch => {
  handleGetRace(dispatch)
  try {
    const response: Race = await races.getRace(id)
    handleGetRaceSuccess(dispatch, response)
  } catch (e) {
    handleGetRaceFail(dispatch)
  }
}

export const handleGetRace = (dispatch: Dispatch<GetRace>) => {
  dispatch({ type: RacesActionTypes.GET_RACE })
}

const handleGetRaceSuccess = (
  dispatch: Dispatch<GetRaceSuccess>,
  response: Race
) => {
  dispatch({
    type: RacesActionTypes.GET_RACE_SUCCESS,
    payload: response,
  })
}

const handleGetRaceFail = (dispatch: Dispatch<GetRaceFail>) => {
  dispatch({
    type: RacesActionTypes.GET_RACE_FAIL,
  })
}

// ADD RACE
interface CreateRace {
  type: RacesActionTypes.CREATE_RACE
}

interface CreateRaceSuccess {
  type: RacesActionTypes.CREATE_RACE_SUCCESS
  payload: Race
}

interface CreateRaceFail {
  type: RacesActionTypes.CREATE_RACE_FAIL
}

export const createRace = (race: Race): ThunkResult<void> => async dispatch => {
  handleCreateRace(dispatch)
  try {
    const response: AxiosResponse<Race> = await races.create(race)
    handleCreateRaceSuccess(dispatch, response.data)
  } catch (e) {
    handleCreateRaceFail(dispatch)
  }
}

const handleCreateRace = (dispatch: Dispatch<CreateRace>) => {
  dispatch({ type: RacesActionTypes.CREATE_RACE })
}

const handleCreateRaceSuccess = (
  dispatch: Dispatch<CreateRaceSuccess>,
  response: Race
) => {
  dispatch({ type: RacesActionTypes.CREATE_RACE_SUCCESS, payload: response })
  history.push('/races')
}

const handleCreateRaceFail = (dispatch: Dispatch<CreateRaceFail>) => {
  dispatch({ type: RacesActionTypes.CREATE_RACE_FAIL })
}

// EDIT RACE
interface UpdateRace {
  type: RacesActionTypes.UPDATE_RACE
}

interface UpdateRaceSuccess {
  type: RacesActionTypes.UPDATE_RACE_SUCCESS
  payload: Race
}

interface UpdateRaceFail {
  type: RacesActionTypes.UPDATE_RACE_FAIL
}

export const updateRace = (
  updatedRace: Race
): ThunkResult<void> => async dispatch => {
  handleUpdateRace(dispatch)
  try {
    const response: AxiosResponse<Race> = await races.update(updatedRace)
    handleUpdateRaceSuccess(dispatch, response.data)
  } catch (e) {
    handleUpdateRaceFail(dispatch)
  }
}

const handleUpdateRace = (dispatch: Dispatch<UpdateRace>): void => {
  dispatch({ type: RacesActionTypes.UPDATE_RACE })
}

const handleUpdateRaceSuccess = (
  dispatch: Dispatch<UpdateRaceSuccess>,
  updatedRace: Race
) => {
  dispatch({ type: RacesActionTypes.UPDATE_RACE_SUCCESS, payload: updatedRace })
  history.push('/races')
}

const handleUpdateRaceFail = (dispatch: Dispatch<UpdateRaceFail>) => {
  dispatch({ type: RacesActionTypes.UPDATE_RACE_FAIL })
}

// DELETE RACE
interface DeleteRace {
  type: RacesActionTypes.DELETE_RACE
}

interface DeleteRaceSuccess {
  type: RacesActionTypes.DELETE_RACE_SUCCESS
  payload: number
}

interface DeleteRaceFail {
  type: RacesActionTypes.DELETE_RACE_FAIL
}

export const deleteRace = (
  deletedId: number
): ThunkResult<void> => async dispatch => {
  dispatch({ type: RacesActionTypes.DELETE_RACE })
  try {
    await races.delete(deletedId)
    dispatch({
      type: RacesActionTypes.DELETE_RACE_SUCCESS,
      payload: deletedId,
    })
    history.push('/races')
  } catch (e) {
    dispatch({ type: RacesActionTypes.DELETE_RACE_FAIL })
  }
}

export type RACES_ACTIONS =
  | GetRaces
  | GetRacesSuccess
  | GetRacesFail
  | GetRace
  | GetRaceSuccess
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
