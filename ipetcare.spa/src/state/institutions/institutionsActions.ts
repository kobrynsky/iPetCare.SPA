import { history } from './../../index'
import { Institutions as institutions } from '../../api'
import { ThunkAction } from 'redux-thunk'
import { Dispatch } from 'redux'
import { RootState, RootActions } from '../store'
import { Institution } from './institutionsReducer'
import { toast } from 'react-toastify'

export type ThunkResult<R> = ThunkAction<R, RootState, undefined, RootActions>
export enum InstitutionsActionTypes {
  GET_INSTITUTIONS = 'GET_INSTITUTIONS',
  GET_INSTITUTIONS_SUCCESS = 'GET_INSTITUTIONS_SUCCESS',
  GET_INSTITUTIONS_FAIL = 'GET_INSTITUTIONS_FAIL',
  GET_INSTITUTIONS_PER_VET = 'GET_INSTITUTIONS_PER_VET',
  GET_INSTITUTIONS_PER_VET_SUCCESS = 'GET_INSTITUTIONS_PER_VET_SUCCESS',
  GET_INSTITUTIONS_PER_VET_FAIL = 'GET_INSTITUTIONS_PER_VET_FAIL',
  GET_INSTITUTION = 'GET_INSTITUTION',
  GET_INSTITUTION_SUCCESS = 'GET_INSTITUTION_SUCCESS',
  GET_INSTITUTION_FAIL = 'GET_INSTITUTION_FAIL',
  CREATE_INSTITUTION = 'CREATE_INSTITUTION',
  CREATE_INSTITUTION_SUCCESS = 'CREATE_INSTITUTION_SUCCESS',
  CREATE_INSTITUTION_FAIL = 'CREATE_INSTITUTION_FAIL',
  UPDATE_INSTITUTION = 'UPDATE_INSTITUTION',
  UPDATE_INSTITUTION_SUCCESS = 'UPDATE_INSTITUTION_SUCCESS',
  UPDATE_INSTITUTION_FAIL = 'UPDATE_INSTITUTION_FAIL',
  DELETE_INSTITUTION = 'DELETE_INSTITUTION',
  DELETE_INSTITUTION_SUCCESS = 'DELETE_INSTITUTION_SUCCESS',
  DELETE_INSTITUTION_FAIL = 'DELETE_INSTITUTION_FAIL',
  SINGUP_INSTITUTION = 'SINGUP_INSTITUTION',
  SINGUP_INSTITUTION_SUCCESS = 'SINGUP_INSTITUTION_SUCCESS',
  SINGUP_INSTITUTION_FAIL = 'SINGUP_INSTITUTION_FAIL',
  SINGOUT_INSTITUTION = 'SINGOUT_INSTITUTION',
  SINGOUT_INSTITUTION_SUCCESS = 'SINGOUT_INSTITUTION_SUCCESS',
  SINGOUT_INSTITUTION_FAIL = 'SINGOUT_INSTITUTION_FAIL',
}

// FETCH INSTITUTION LIST
interface GetInstitutions {
  type: InstitutionsActionTypes.GET_INSTITUTIONS
}

interface GetInstitutionsSuccess {
  type: InstitutionsActionTypes.GET_INSTITUTIONS_SUCCESS
  payload: any
}

interface GetInstitutionsFail {
  type: InstitutionsActionTypes.GET_INSTITUTIONS_FAIL
}

export const getInstitutions = (): ThunkResult<void> => async dispatch => {
  handleGetInstitutions(dispatch)
  try {
    const response: Institution[] = await institutions.getInstitutions()
    handleGetInstitutionsSuccess(dispatch, response)
  } catch (e) {
    console.log(e)
    handleGetInstitutionsFail(dispatch)
  }
}

export const handleGetInstitutions = (dispatch: Dispatch<GetInstitutions>) => {
  dispatch({ type: InstitutionsActionTypes.GET_INSTITUTIONS })
}

export const handleGetInstitutionsSuccess = (
  dispatch: Dispatch<GetInstitutionsSuccess>,
  response: Institution[]
) => {
  dispatch({
    type: InstitutionsActionTypes.GET_INSTITUTIONS_SUCCESS,
    payload: response,
  })
}

export const handleGetInstitutionsFail = (
  dispatch: Dispatch<GetInstitutionsFail>
) => {
  dispatch({
    type: InstitutionsActionTypes.GET_INSTITUTIONS_FAIL,
  })
}

// FETCH INSTITUTION LIST PER VET
interface GetInstitutionsPerVet {
  type: InstitutionsActionTypes.GET_INSTITUTIONS_PER_VET
}

interface GetInstitutionsPerVetSuccess {
  type: InstitutionsActionTypes.GET_INSTITUTIONS_PER_VET_SUCCESS
  payload: any
}

interface GetInstitutionsPerVetFail {
  type: InstitutionsActionTypes.GET_INSTITUTIONS_PER_VET_FAIL
}

export const getInstitutionsPerVet = (id: string): ThunkResult<void> => async dispatch => {
  handleGetInstitutionsPerVet(dispatch)
  try {
    const response: Institution[] = await institutions.getInstitutionsPerVet(id)
    handleGetInstitutionsPerVetSuccess(dispatch, response)
  } catch (e) {
    console.log(e)
    handleGetInstitutionsPerVetFail(dispatch)
  }
}

export const handleGetInstitutionsPerVet = (dispatch: Dispatch<GetInstitutionsPerVet>) => {
  dispatch({ type: InstitutionsActionTypes.GET_INSTITUTIONS_PER_VET })
}

export const handleGetInstitutionsPerVetSuccess = (
  dispatch: Dispatch<GetInstitutionsPerVetSuccess>,
  response: Institution[]
) => {
  dispatch({
    type: InstitutionsActionTypes.GET_INSTITUTIONS_PER_VET_SUCCESS,
    payload: response,
  })
}

export const handleGetInstitutionsPerVetFail = (
  dispatch: Dispatch<GetInstitutionsPerVetFail>
) => {
  dispatch({
    type: InstitutionsActionTypes.GET_INSTITUTIONS_PER_VET_FAIL,
  })
}

// FETCH SINGLE INSTITUTION
interface GetInstitution {
  type: InstitutionsActionTypes.GET_INSTITUTION
}

interface GetInstitutionsuccess {
  type: InstitutionsActionTypes.GET_INSTITUTION_SUCCESS
  payload: Institution
}

interface GetInstitutionFail {
  type: InstitutionsActionTypes.GET_INSTITUTION_FAIL
}

export const getInstitution = (
  id: string
): ThunkResult<void> => async dispatch => {
  handleGetInstitution(dispatch)
  try {
    const response: Institution = await institutions.getInstitution(id)
    handleGetInstitutionsuccess(dispatch, response)
  } catch (e) {
    handleGetInstitutionFail(dispatch)
  }
}

export const handleGetInstitution = (dispatch: Dispatch<GetInstitution>) => {
  dispatch({ type: InstitutionsActionTypes.GET_INSTITUTION })
}

const handleGetInstitutionsuccess = (
  dispatch: Dispatch<GetInstitutionsuccess>,
  response: Institution
) => {
  dispatch({
    type: InstitutionsActionTypes.GET_INSTITUTION_SUCCESS,
    payload: response,
  })
}

const handleGetInstitutionFail = (dispatch: Dispatch<GetInstitutionFail>) => {
  dispatch({
    type: InstitutionsActionTypes.GET_INSTITUTION_FAIL,
  })
}

// ADD INSTITUTION
interface CreateInstitution {
  type: InstitutionsActionTypes.CREATE_INSTITUTION
}

interface CreateInstitutionSuccess {
  type: InstitutionsActionTypes.CREATE_INSTITUTION_SUCCESS
  payload: Institution
}

interface CreateInstitutionFail {
  type: InstitutionsActionTypes.CREATE_INSTITUTION_FAIL
}

export const createInstitution = (
  institution: Institution
): ThunkResult<void> => async dispatch => {
  handleCreateInstitution(dispatch)
  try {
    const response: Institution = await institutions.create(institution)
    handleCreateInstitutionSuccess(dispatch, response)
    toast.success('Pomyślnie utworzono instytucję')
  } catch (e) {
    handleCreateInstitutionFail(dispatch)
  }
}

const handleCreateInstitution = (dispatch: Dispatch<CreateInstitution>) => {
  dispatch({ type: InstitutionsActionTypes.CREATE_INSTITUTION })
}

const handleCreateInstitutionSuccess = (
  dispatch: Dispatch<CreateInstitutionSuccess>,
  response: Institution
) => {
  dispatch({
    type: InstitutionsActionTypes.CREATE_INSTITUTION_SUCCESS,
    payload: response,
  })
}

const handleCreateInstitutionFail = (
  dispatch: Dispatch<CreateInstitutionFail>
) => {
  dispatch({ type: InstitutionsActionTypes.CREATE_INSTITUTION_FAIL })
}

// EDIT INSTITUTION
interface UpdateInstitution {
  type: InstitutionsActionTypes.UPDATE_INSTITUTION
}

interface UpdateInstitutionSuccess {
  type: InstitutionsActionTypes.UPDATE_INSTITUTION_SUCCESS
  payload: Institution
}

interface UpdateInstitutionFail {
  type: InstitutionsActionTypes.UPDATE_INSTITUTION_FAIL
}

export const updateInstitution = (
  updatedInstitution: Institution
): ThunkResult<void> => async dispatch => {
  handleUpdateInstitution(dispatch)
  try {
    const response: Institution = await institutions.update(updatedInstitution)
    handleUpdateInstitutionSuccess(dispatch, response)
    toast.success('Pomyślnie zaktualizowano instytucję')
  } catch (e) {
    handleUpdateInstitutionFail(dispatch)
  }
}

const handleUpdateInstitution = (
  dispatch: Dispatch<UpdateInstitution>
): void => {
  dispatch({ type: InstitutionsActionTypes.UPDATE_INSTITUTION })
}

const handleUpdateInstitutionSuccess = (
  dispatch: Dispatch<UpdateInstitutionSuccess>,
  updatedInstitution: Institution
) => {
  dispatch({
    type: InstitutionsActionTypes.UPDATE_INSTITUTION_SUCCESS,
    payload: updatedInstitution,
  })
}

const handleUpdateInstitutionFail = (
  dispatch: Dispatch<UpdateInstitutionFail>
) => {
  dispatch({ type: InstitutionsActionTypes.UPDATE_INSTITUTION_FAIL })
}

// DELETE INSTITUTION
interface DeleteInstitution {
  type: InstitutionsActionTypes.DELETE_INSTITUTION
}

interface DeleteInstitutionSuccess {
  type: InstitutionsActionTypes.DELETE_INSTITUTION_SUCCESS
  payload: string
}

interface DeleteInstitutionFail {
  type: InstitutionsActionTypes.DELETE_INSTITUTION_FAIL
}

export const deleteInstitution = (
  deletedId: string
): ThunkResult<void> => async dispatch => {
  dispatch({ type: InstitutionsActionTypes.DELETE_INSTITUTION })
  try {
    await institutions.delete(deletedId)
    console.log('id: ' + deletedId)
    dispatch({
      type: InstitutionsActionTypes.DELETE_INSTITUTION_SUCCESS,
      payload: deletedId,
    })
    history.push('/Institutions')
    toast.success('Pomyślnie usunięto instytucję')
  } catch (e) {
    dispatch({ type: InstitutionsActionTypes.DELETE_INSTITUTION_FAIL })
  }
}

// SINGUP INSTITUTION
interface SingUpInstitution {
  type: InstitutionsActionTypes.SINGUP_INSTITUTION
}

interface SingUpInstitutionSuccess {
  type: InstitutionsActionTypes.SINGUP_INSTITUTION_SUCCESS
  payload: Institution
}

interface SingUpInstitutionFail {
  type: InstitutionsActionTypes.SINGUP_INSTITUTION_FAIL
}
export const singUpInstitution = (
  id: string
): ThunkResult<void> => async dispatch => {
  handleSingUpInstitution(dispatch)
  try {
    const response: Institution = await institutions.singUp(id)
    handleSingUpInstitutionSuccess(dispatch, response)
    toast.success('Pomyślnie przypisano do instytucji')
  } catch (e) {
    handleSingUpInstitutionFail(dispatch)
  }
}

const handleSingUpInstitution = (
  dispatch: Dispatch<SingUpInstitution>
): void => {
  dispatch({ type: InstitutionsActionTypes.SINGUP_INSTITUTION })
}

const handleSingUpInstitutionSuccess = (
  dispatch: Dispatch<SingUpInstitutionSuccess>,
  institution: Institution
) => {
  dispatch({
    type: InstitutionsActionTypes.SINGUP_INSTITUTION_SUCCESS,
    payload: institution,
  })
}

const handleSingUpInstitutionFail = (
  dispatch: Dispatch<SingUpInstitutionFail>
) => {
  dispatch({ type: InstitutionsActionTypes.SINGUP_INSTITUTION_FAIL })
}

// SINGOUT INSTITUTION
interface SingOutInstitution {
  type: InstitutionsActionTypes.SINGOUT_INSTITUTION
}

interface SingOutInstitutionSuccess {
  type: InstitutionsActionTypes.SINGOUT_INSTITUTION_SUCCESS
  payload: string
}

interface SingOutInstitutionFail {
  type: InstitutionsActionTypes.SINGOUT_INSTITUTION_FAIL
}
export const singOutInstitution = (
  id: string
): ThunkResult<void> => async dispatch => {
  handleSingOutInstitution(dispatch)
  try {
    await institutions.singOut(id)
    handleSingOutInstitutionSuccess(dispatch, id)
    toast.success('Pomyślnie wypisano z instytucji')
  } catch (e) {
    handleSingOutInstitutionFail(dispatch)
  }
}

const handleSingOutInstitution = (
  dispatch: Dispatch<SingOutInstitution>
): void => {
  dispatch({ type: InstitutionsActionTypes.SINGOUT_INSTITUTION })
}

const handleSingOutInstitutionSuccess = (
  dispatch: Dispatch<SingOutInstitutionSuccess>,
  institutionId: string
) => {
  dispatch({
    type: InstitutionsActionTypes.SINGOUT_INSTITUTION_SUCCESS,
    payload: institutionId,
  })
}

const handleSingOutInstitutionFail = (
  dispatch: Dispatch<SingOutInstitutionFail>
) => {
  dispatch({ type: InstitutionsActionTypes.SINGOUT_INSTITUTION_FAIL })
}

export type INSTITUTIONS_ACTIONS =
  | GetInstitutions
  | GetInstitutionsSuccess
  | GetInstitutionsFail
  | GetInstitutionsPerVet
  | GetInstitutionsPerVetSuccess
  | GetInstitutionsPerVetFail
  | GetInstitution
  | GetInstitutionsuccess
  | GetInstitutionFail
  | CreateInstitution
  | CreateInstitutionSuccess
  | CreateInstitutionFail
  | UpdateInstitution
  | UpdateInstitutionSuccess
  | UpdateInstitutionFail
  | DeleteInstitution
  | DeleteInstitutionSuccess
  | DeleteInstitutionFail
  | SingUpInstitution
  | SingUpInstitutionSuccess
  | SingUpInstitutionFail
  | SingOutInstitution
  | SingOutInstitutionSuccess
  | SingOutInstitutionFail
