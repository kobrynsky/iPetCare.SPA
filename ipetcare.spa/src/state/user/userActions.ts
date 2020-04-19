import { AxiosResponse } from 'axios'
import { Users } from '../../api'
import { Dispatch } from 'react'
import { User } from './userReducer'
import { setTokenInHeader, deleteTokenInHeader } from '../../utils/api'
import { saveUserState, deleteUserState } from '../../utils/localStorageHelper'
import { LoginProps, RegisterProps } from '../../api/dto'
import { history } from '../../'
import { ThunkResult } from '../store'
import { toast } from 'react-toastify'

export enum UserActionTypes {
  UPDATE_PROFILE = 'UPDATE_PROFILE',
  UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS',
  UPDATE_PROFILE_FAIL = 'UPDATE_PROFILE_FAIL',
  SET_USER = 'SET_USER',
  LOGOUT = 'LOGOUT',
  LOGIN_USER = 'LOGIN_USER',
  LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS',
  LOGIN_USER_FAIL = 'LOGIN_USER_FAIL',
  REGISTER_USER = 'REGISTER_USER',
  REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS',
  REGISTER_USER_FAIL = 'REGISTER_USER_FAIL',
  EDIT_USER = 'EDIT_USER',
  EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS',
  EDIT_USER_FAIL = 'EDIT_USER_FAIL',
  GET_ALL_USERS = 'GET_ALL_USERS',
  GET_ALL_USERS_SUCCESS = 'GET_ALL_USERS_SUCCESS',
  GET_ALL_USERS_FAIL = 'GET_ALL_USERS_FAIL',
}

type SET_USER = ReturnType<typeof setUser>

export const setUser = (user: User) => {
  return {
    type: UserActionTypes.SET_USER,
    payload: user,
  } as const
}

type LOGOUT_ACTION = ReturnType<typeof logout>

export const logout = () => {
  deleteUserState()
  deleteTokenInHeader()
  return {
    type: UserActionTypes.LOGOUT,
  } as const
}

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
    saveUserState(response)
    response.token && setTokenInHeader(response.token)
    handleLoginUserSuccess(dispatch, response)
  } catch (e) {
    handleLoginUserFail(dispatch)
    toast.error("Bład: " + e.data)
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

interface RegisterUser {
  type: UserActionTypes.REGISTER_USER
}

interface RegisterUserSuccess {
  type: UserActionTypes.REGISTER_USER_SUCCESS
  payload: User
}

interface RegisterUserFail {
  type: UserActionTypes.REGISTER_USER_FAIL
  payload: string
}

type REGISTER_USER = RegisterUser | RegisterUserSuccess | RegisterUserFail

export const registerUser = (
  login: RegisterProps
): ThunkResult<void> => async dispatch => {
  handleRegisterUser(dispatch)
  try {
    const response: User = await Users.register(login)
    saveUserState(response)
    response.token && setTokenInHeader(response.token)
    handleRegisterUserSuccess(dispatch, response)
    toast.success("Sukces")
  } catch (e) {
    handleRegisterUserFail(dispatch, e.data)
    toast.error("Bład: " + e.data)
  }
}

export const handleRegisterUser = (dispatch: Dispatch<RegisterUser>) => {
  dispatch({ type: UserActionTypes.REGISTER_USER })
}

export const handleRegisterUserSuccess = (
  dispatch: Dispatch<RegisterUserSuccess>,
  response: User
) => {
  dispatch({
    type: UserActionTypes.REGISTER_USER_SUCCESS,
    payload: response,
  })
}

export const handleRegisterUserFail = (
  dispatch: Dispatch<RegisterUserFail>,
  response: string
) => {
  dispatch({
    type: UserActionTypes.REGISTER_USER_FAIL,
    payload: response,
  })
}

interface EditUser {
  type: UserActionTypes.EDIT_USER
}

interface EditUserSuccess {
  type: UserActionTypes.EDIT_USER_SUCCESS
  payload: User
}

interface EditUserFail {
  type: UserActionTypes.EDIT_USER_FAIL
  payload: string
}

type EDIT_USER = EditUser | EditUserSuccess | EditUserFail

export const editUser = (user: User): ThunkResult<void> => async dispatch => {
  handleRegisterUser(dispatch)
  try {
    const response: User = await Users.edit(user)
    saveUserState(response)
    response.token && setTokenInHeader(response.token)
    handleRegisterUserSuccess(dispatch, response)
    toast.success("Sukces")
  } catch (e) {
    handleRegisterUserFail(dispatch, e.data)
    toast.error("Bład: " + e.data)
  }
}

export const handleEditUser = (dispatch: Dispatch<EditUser>) => {
  dispatch({ type: UserActionTypes.EDIT_USER })
}

export const handleEditUserSuccess = (
  dispatch: Dispatch<EditUserSuccess>,
  response: User
) => {
  dispatch({
    type: UserActionTypes.EDIT_USER_SUCCESS,
    payload: response,
  })
}

export const handleEditUserFail = (
  dispatch: Dispatch<EditUserFail>,
  response: string
) => {
  dispatch({
    type: UserActionTypes.EDIT_USER_FAIL,
    payload: response,
  })
}


interface GetAllUsers {
  type: UserActionTypes.GET_ALL_USERS
}

interface GetAllUsersSuccess {
  type: UserActionTypes.GET_ALL_USERS_SUCCESS
  payload: User[]
}

interface GetAllUsersFail {
  type: UserActionTypes.GET_ALL_USERS_FAIL
}

type GET_ALL_USERS = GetAllUsersSuccess | GetAllUsers | GetAllUsersFail

export const getAllUsers = (): ThunkResult<void> => async dispatch => {
  handleGetAllUser(dispatch)
  try {
    const response: User[] = await Users.getAllUsers()
    handleGetAllUsersSuccess(dispatch, response)
  } catch (e) {
    handleGetAllUsersFail(dispatch)
    toast.error("Bład: " + e.data)
  }
}

export const handleGetAllUser = (dispatch: Dispatch<GetAllUsers>) => {
  dispatch({ type: UserActionTypes.GET_ALL_USERS })
}

export const handleGetAllUsersSuccess = (
  dispatch: Dispatch<GetAllUsersSuccess>,
  response: User[]
) => {
  dispatch({
    type: UserActionTypes.GET_ALL_USERS_SUCCESS,
    payload: response,
  })
}
export const handleGetAllUsersFail = (dispatch: Dispatch<GetAllUsersFail>) => {
  dispatch({type: UserActionTypes.GET_ALL_USERS_FAIL })
}
// export const updateProfile = (user: User) => (

// )

export type USER_ACTIONS =
  | LOGIN_USER
  | LOGOUT_ACTION
  | SET_USER
  | REGISTER_USER
  | EDIT_USER
  | GET_ALL_USERS
