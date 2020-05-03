import { history } from './../../index'
import { ThunkAction } from 'redux-thunk'
import { Dispatch } from 'redux'
import { RootState, RootActions } from '../store'
import { toast } from 'react-toastify'
import { Notes as notes } from '../../api'
import { ImportantDate, ImportantDatesResponseDto } from '../../api/dto'

export type ThunkResult<R> = ThunkAction<R, RootState, undefined, RootActions>
export enum ImportantDatesActionTypes {
  GET_IMPORTANT_DATES = 'GET_IMPORTANT_DATES',
  GET_IMPORTANT_DATES_SUCCESS = 'GET_IMPORTANT_DATES_SUCCESS',
  GET_IMPORTANT_DATES_FAIL = 'GET_IMPORTANT_DATES_FAIL',
}

interface GetImportantDates {
  type: ImportantDatesActionTypes.GET_IMPORTANT_DATES
}

interface GetImportantDatesSuccess {
  type: ImportantDatesActionTypes.GET_IMPORTANT_DATES_SUCCESS
  payload: ImportantDatesResponseDto
}

interface GetImportantDatesFail {
  type: ImportantDatesActionTypes.GET_IMPORTANT_DATES_FAIL
}

export const getImportantDates = (): ThunkResult<void> => async dispatch => {
  handleGetImportantDates(dispatch)
  try {
    const response = await notes.getImportantDates()
    handleGetImportantDatesSuccess(dispatch, response)
  } catch (e) {
    console.log(e)
    handleGetImportantDatesFail(dispatch)
  }
}

export const handleGetImportantDates = (
  dispatch: Dispatch<GetImportantDates>
) => {
  dispatch({ type: ImportantDatesActionTypes.GET_IMPORTANT_DATES })
}

export const handleGetImportantDatesSuccess = (
  dispatch: Dispatch<GetImportantDatesSuccess>,
  response: ImportantDatesResponseDto
) => {
  dispatch({
    type: ImportantDatesActionTypes.GET_IMPORTANT_DATES_SUCCESS,
    payload: response,
  })
}

export const handleGetImportantDatesFail = (
  dispatch: Dispatch<GetImportantDatesFail>
) => {
  dispatch({
    type: ImportantDatesActionTypes.GET_IMPORTANT_DATES_FAIL,
  })
}

export type IMPORTANT_DATES_ACTIONS =
  | GetImportantDates
  | GetImportantDatesSuccess
  | GetImportantDatesFail
