import { LoginProps } from '../../api'
import { ThunkResult } from '../pets/petsActions'
import { AxiosResponse } from 'axios'
import { Users } from '../../api'
import { Dispatch } from 'react'
import { User } from './userReducer'
import { setTokenInHeader } from '../../utils/api'
import { saveUserState } from '../../utils/localStorageHelper'

export enum UserActionTypes {
  UPDATE_PROFILE = 'UPDATE_PROFILE',
  UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS',
  UPDATE_PROFILE_FAIL = 'UPDATE_PROFILE_FAIL',
  SET_USER = 'SET_USER',
  LOGOUT = 'LOGOUT',
  LOGIN_USER = 'LOGIN_USER',
  LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS',
  LOGIN_USER_FAIL = 'LOGIN_USER_FAIL',
}

type SET_USER = ReturnType<typeof setUser>

export const setUser = (user: User) => {
  return {
    type: UserActionTypes.SET_USER,
    payload: user,
  } as const
}

type LOGOUT_ACTION = ReturnType<typeof logout>

export const logout = () =>
  ({
    type: UserActionTypes.LOGOUT,
  } as const)

interface LoginUser {
  type: UserActionTypes.LOGIN_USER
}

interface LoginUserSuccess {
  type: UserActionTypes.LOGIN_USER_SUCCESS
  payload: User
}

interface LoginUserFail {
  type: UserActionTypes.LOGIN_USER_FAIL
}

type LOGIN_USER = LoginUser | LoginUserSuccess | LoginUserFail

export const loginUser = (
  login: LoginProps
): ThunkResult<void> => async dispatch => {
  handleLoginUser(dispatch)
  try {
    const response: User = await Users.login(login)
    console.log('po strzale', response)
    saveUserState(response)
    setTokenInHeader(response.token)
    handleLoginUserSuccess(dispatch, response)
  } catch (e) {
    handleLoginUserFail(dispatch)
  }
}

export const handleLoginUser = (dispatch: Dispatch<LoginUser>) => {
  dispatch({ type: UserActionTypes.LOGIN_USER })
}

export const handleLoginUserSuccess = (
  dispatch: Dispatch<LoginUserSuccess>,
  response: User
) => {
  dispatch({
    type: UserActionTypes.LOGIN_USER_SUCCESS,
    payload: response,
  })
}

export const handleLoginUserFail = (dispatch: Dispatch<LoginUserFail>) => {
  dispatch({
    type: UserActionTypes.LOGIN_USER_FAIL,
  })
}

// export const updateProfile = (user: User) => (

// )

export type USER_ACTIONS = LOGIN_USER | LOGOUT_ACTION | SET_USER
