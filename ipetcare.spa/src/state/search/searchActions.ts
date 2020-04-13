import { GetVetsSearchResponseDto, GetVetsSearchDto } from '../../api/dto'
import { ThunkResult } from '../store'
import { Dispatch } from 'redux'
import { Users } from '../../api'

export enum SearchActionTypes {
  SEARCH_VETS = 'SEARCH_VETS',
  SEARCH_VETS_SUCCESS = 'SEARCH_VETS_SUCCESS',
  SEARCH_VETS_FAIL = 'SEARCH_VETS_FAIL',
}

interface SearchVets {
  type: SearchActionTypes.SEARCH_VETS
}

interface SearchVetsSuccess {
  type: SearchActionTypes.SEARCH_VETS_SUCCESS
  payload: GetVetsSearchResponseDto
}

interface SearchVetsFail {
  type: SearchActionTypes.SEARCH_VETS_FAIL
}

type SEARCH_VETS = SearchVets | SearchVetsSuccess | SearchVetsFail

export const searchVets = (
  searchDto: GetVetsSearchDto
): ThunkResult<void> => async dispatch => {
  handleSearchVets(dispatch)
  try {
    const response: GetVetsSearchResponseDto = await Users.getVets(searchDto)
    handleSearchVetsSuccess(dispatch, response)
  } catch (e) {
    handleSearchVetsFail(dispatch, e.data)
  }
}

export const handleSearchVets = (dispatch: Dispatch<SearchVets>) => {
  dispatch({ type: SearchActionTypes.SEARCH_VETS })
}

export const handleSearchVetsSuccess = (
  dispatch: Dispatch<SearchVetsSuccess>,
  response: GetVetsSearchResponseDto
) => {
  dispatch({
    type: SearchActionTypes.SEARCH_VETS_SUCCESS,
    payload: response,
  })
}

export const handleSearchVetsFail = (
  dispatch: Dispatch<SearchVetsFail>,
  response: string
) => {
  dispatch({
    type: SearchActionTypes.SEARCH_VETS_FAIL,
    payload: response,
  })
}

export type SEARCH_ACTIONS = SEARCH_VETS
