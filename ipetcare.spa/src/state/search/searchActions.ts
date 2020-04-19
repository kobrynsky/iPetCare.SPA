import { GetSearchResponseDto, GetSearchDto } from '../../api/dto'
import { ThunkResult } from '../store'
import { Dispatch } from 'redux'
import { Users } from '../../api'
import { toast } from 'react-toastify'

export enum SearchActionTypes {
  SEARCH_VETS = 'SEARCH_VETS',
  SEARCH_VETS_SUCCESS = 'SEARCH_VETS_SUCCESS',
  SEARCH_VETS_FAIL = 'SEARCH_VETS_FAIL',
  SEARCH_OWNERS = 'SEARCH_OWNERS',
  SEARCH_OWNERS_SUCCESS = 'SEARCH_OWNERS_SUCCESS',
  SEARCH_OWNERS_FAIL = 'SEARCH_OWNERS_FAIL',
}

interface SearchVets {
  type: SearchActionTypes.SEARCH_VETS
}

interface SearchVetsSuccess {
  type: SearchActionTypes.SEARCH_VETS_SUCCESS
  payload: GetSearchResponseDto
}

interface SearchVetsFail {
  type: SearchActionTypes.SEARCH_VETS_FAIL
}

type SEARCH_VETS = SearchVets | SearchVetsSuccess | SearchVetsFail

export const searchVets = (
  searchDto: GetSearchDto
): ThunkResult<void> => async dispatch => {
  handleSearchVets(dispatch)
  try {
    const response: GetSearchResponseDto = await Users.getVets(searchDto)
    handleSearchVetsSuccess(dispatch, response)
  } catch (e) {
    handleSearchVetsFail(dispatch, e.data)
    toast.error("Bład: " + e.data)
  }
}

export const handleSearchVets = (dispatch: Dispatch<SearchVets>) => {
  dispatch({ type: SearchActionTypes.SEARCH_VETS })
}

export const handleSearchVetsSuccess = (
  dispatch: Dispatch<SearchVetsSuccess>,
  response: GetSearchResponseDto
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

///////////////////////////

interface SearchOwners {
  type: SearchActionTypes.SEARCH_OWNERS
}

interface SearchOwnersSuccess {
  type: SearchActionTypes.SEARCH_OWNERS_SUCCESS
  payload: GetSearchResponseDto
}

interface SearchOwnersFail {
  type: SearchActionTypes.SEARCH_OWNERS_FAIL
}

type SEARCH_OWNERS = SearchOwners | SearchOwnersSuccess | SearchOwnersFail

export const searchOwners = (
  searchDto: GetSearchDto
): ThunkResult<void> => async dispatch => {
  handleSearchOwners(dispatch)
  try {
    const response: GetSearchResponseDto = await Users.getOwners(searchDto)
    handleSearchOwnersSuccess(dispatch, response)
  } catch (e) {
    handleSearchOwnersFail(dispatch, e.data)
    toast.error("Bład: " + e.data)
  }
}

export const handleSearchOwners = (dispatch: Dispatch<SearchOwners>) => {
  dispatch({ type: SearchActionTypes.SEARCH_OWNERS })
}

export const handleSearchOwnersSuccess = (
  dispatch: Dispatch<SearchOwnersSuccess>,
  response: GetSearchResponseDto
) => {
  dispatch({
    type: SearchActionTypes.SEARCH_OWNERS_SUCCESS,
    payload: response,
  })
}

export const handleSearchOwnersFail = (
  dispatch: Dispatch<SearchOwnersFail>,
  response: string
) => {
  dispatch({
    type: SearchActionTypes.SEARCH_OWNERS_FAIL,
    payload: response,
  })
}

export type SEARCH_ACTIONS = SEARCH_VETS | SEARCH_OWNERS
