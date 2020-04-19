import { history } from './../../index'
import { ExaminationParameters as examinationParameters } from '../../api'
import { ThunkAction } from 'redux-thunk'
import { Dispatch } from 'redux'
import { RootState, RootActions } from '../store'
import { ExaminationParameter } from './examinationParametersReducer'
import { toast } from 'react-toastify'

export type ThunkResult<R> = ThunkAction<R, RootState, undefined, RootActions>
export enum ExaminationParametersActionParameters {
    GET_EXAMINATION_PARAMETERS = 'GET_EXAMINATION_PARAMETERS',
    GET_EXAMINATION_PARAMETERS_SUCCESS = 'GET_EXAMINATION_PARAMETERS_SUCCESS',
    GET_EXAMINATION_PARAMETERS_FAIL = 'GET_EXAMINATION_PARAMETERS_FAIL',
    GET_EXAMINATION_PARAMETER = 'GET_EXAMINATION_PARAMETER',
    GET_EXAMINATION_PARAMETER_SUCCESS = 'GET_EXAMINATION_PARAMETER_SUCCESS',
    GET_EXAMINATION_PARAMETER_FAIL = 'GET_EXAMINATION_PARAMETER_FAIL',
    CREATE_EXAMINATION_PARAMETER = 'CREATE_EXAMINATION_PARAMETER',
    CREATE_EXAMINATION_PARAMETER_SUCCESS = 'CREATE_EXAMINATION_PARAMETER_SUCCESS',
    CREATE_EXAMINATION_PARAMETER_FAIL = 'CREATE_EXAMINATION_PARAMETER_FAIL',
    UPDATE_EXAMINATION_PARAMETER = 'UPDATE_EXAMINATION_PARAMETER',
    UPDATE_EXAMINATION_PARAMETER_SUCCESS = 'UPDATE_EXAMINATION_PARAMETER_SUCCESS',
    UPDATE_EXAMINATION_PARAMETER_FAIL = 'UPDATE_EXAMINATION_PARAMETER_FAIL',
    DELETE_EXAMINATION_PARAMETER = 'DELETE_EXAMINATION_PARAMETER',
    DELETE_EXAMINATION_PARAMETER_SUCCESS = 'DELETE_EXAMINATION_PARAMETER_SUCCESS',
    DELETE_EXAMINATION_PARAMETER_FAIL = 'DELETE_EXAMINATION_PARAMETER_FAIL',
}

// FETCH EXAMINATION_PARAMETER LIST
interface GetExaminationParameters {
    type: ExaminationParametersActionParameters.GET_EXAMINATION_PARAMETERS
}

interface GetExaminationParametersSuccess {
    type: ExaminationParametersActionParameters.GET_EXAMINATION_PARAMETERS_SUCCESS
    payload: any
}

interface GetExaminationParametersFail {
    type: ExaminationParametersActionParameters.GET_EXAMINATION_PARAMETERS_FAIL
}

export const getExaminationParameters = (): ThunkResult<void> => async dispatch => {
    handleGetExaminationParameters(dispatch)
    try {
        const response: ExaminationParameter[] = await examinationParameters.getExaminationParameters()
        handleGetExaminationParametersSuccess(dispatch, response)
    } catch (e) {
        handleGetExaminationParametersFail(dispatch)
    }
}

export const handleGetExaminationParameters = (dispatch: Dispatch<GetExaminationParameters>) => {
    dispatch({ type: ExaminationParametersActionParameters.GET_EXAMINATION_PARAMETERS })
}

export const handleGetExaminationParametersSuccess = (
    dispatch: Dispatch<GetExaminationParametersSuccess>,
    response: ExaminationParameter[]
) => {
    dispatch({
        type: ExaminationParametersActionParameters.GET_EXAMINATION_PARAMETERS_SUCCESS,
        payload: response,
    })
}

export const handleGetExaminationParametersFail = (dispatch: Dispatch<GetExaminationParametersFail>) => {
    dispatch({
        type: ExaminationParametersActionParameters.GET_EXAMINATION_PARAMETERS_FAIL,
    })
}

// FETCH SINGLE EXAMINATION_PARAMETER
interface GetExaminationParameter {
    type: ExaminationParametersActionParameters.GET_EXAMINATION_PARAMETER
}

interface GetExaminationParametersuccess {
    type: ExaminationParametersActionParameters.GET_EXAMINATION_PARAMETER_SUCCESS
    payload: ExaminationParameter
}

interface GetExaminationParameterFail {
    type: ExaminationParametersActionParameters.GET_EXAMINATION_PARAMETER_FAIL
}

export const getExaminationParameter = (id: number): ThunkResult<void> => async dispatch => {
    handleGetExaminationParameter(dispatch)
    try {
        const response: ExaminationParameter = await examinationParameters.getExaminationParameter(id)
        handleGetExaminationParametersuccess(dispatch, response)
    } catch (e) {
        handleGetExaminationParameterFail(dispatch)
    }
}

export const handleGetExaminationParameter = (dispatch: Dispatch<GetExaminationParameter>) => {
    dispatch({ type: ExaminationParametersActionParameters.GET_EXAMINATION_PARAMETER })
}

const handleGetExaminationParametersuccess = (
    dispatch: Dispatch<GetExaminationParametersuccess>,
    response: ExaminationParameter
) => {
    dispatch({
        type: ExaminationParametersActionParameters.GET_EXAMINATION_PARAMETER_SUCCESS,
        payload: response,
    })
}

const handleGetExaminationParameterFail = (dispatch: Dispatch<GetExaminationParameterFail>) => {
    dispatch({
        type: ExaminationParametersActionParameters.GET_EXAMINATION_PARAMETER_FAIL,
    })
}

// ADD EXAMINATION_PARAMETER
interface CreateExaminationParameter {
    type: ExaminationParametersActionParameters.CREATE_EXAMINATION_PARAMETER
}

interface CreateExaminationParameterSuccess {
    type: ExaminationParametersActionParameters.CREATE_EXAMINATION_PARAMETER_SUCCESS
    payload: ExaminationParameter
}

interface CreateExaminationParameterFail {
    type: ExaminationParametersActionParameters.CREATE_EXAMINATION_PARAMETER_FAIL
}

export const createExaminationParameter = (examinationParameter: ExaminationParameter): ThunkResult<void> => async dispatch => {
    handleCreateExaminationParameter(dispatch)
    try {
        const response: ExaminationParameter = await examinationParameters.create(examinationParameter)
        handleCreateExaminationParameterSuccess(dispatch, response)
        toast.success("Sukces")
    } catch (e) {
        handleCreateExaminationParameterFail(dispatch)
    }
}

const handleCreateExaminationParameter = (dispatch: Dispatch<CreateExaminationParameter>) => {
    dispatch({ type: ExaminationParametersActionParameters.CREATE_EXAMINATION_PARAMETER })
}

const handleCreateExaminationParameterSuccess = (
    dispatch: Dispatch<CreateExaminationParameterSuccess>,
    response: ExaminationParameter
) => {
    dispatch({ type: ExaminationParametersActionParameters.CREATE_EXAMINATION_PARAMETER_SUCCESS, payload: response })
    history.push('/ExaminationParameters')
}

const handleCreateExaminationParameterFail = (dispatch: Dispatch<CreateExaminationParameterFail>) => {
    dispatch({ type: ExaminationParametersActionParameters.CREATE_EXAMINATION_PARAMETER_FAIL })
}

// EDIT EXAMINATION_PARAMETER
interface UpdateExaminationParameter {
    type: ExaminationParametersActionParameters.UPDATE_EXAMINATION_PARAMETER
}

interface UpdateExaminationParameterSuccess {
    type: ExaminationParametersActionParameters.UPDATE_EXAMINATION_PARAMETER_SUCCESS
    payload: ExaminationParameter
}

interface UpdateExaminationParameterFail {
    type: ExaminationParametersActionParameters.UPDATE_EXAMINATION_PARAMETER_FAIL
}

export const updateExaminationParameter = (
    updatedExaminationParameter: ExaminationParameter
): ThunkResult<void> => async dispatch => {
    handleUpdateExaminationParameter(dispatch)
    try {
        const response: ExaminationParameter = await examinationParameters.update(updatedExaminationParameter)
        handleUpdateExaminationParameterSuccess(dispatch, response)
        toast.success("Sukces")
    } catch (e) {
        handleUpdateExaminationParameterFail(dispatch)
    }
}

const handleUpdateExaminationParameter = (dispatch: Dispatch<UpdateExaminationParameter>): void => {
    dispatch({ type: ExaminationParametersActionParameters.UPDATE_EXAMINATION_PARAMETER })
}

const handleUpdateExaminationParameterSuccess = (
    dispatch: Dispatch<UpdateExaminationParameterSuccess>,
    updatedExaminationParameter: ExaminationParameter
) => {
    dispatch({ type: ExaminationParametersActionParameters.UPDATE_EXAMINATION_PARAMETER_SUCCESS, payload: updatedExaminationParameter })
}

const handleUpdateExaminationParameterFail = (dispatch: Dispatch<UpdateExaminationParameterFail>) => {
    dispatch({ type: ExaminationParametersActionParameters.UPDATE_EXAMINATION_PARAMETER_FAIL })
}

// DELETE EXAMINATION_PARAMETER
interface DeleteExaminationParameter {
    type: ExaminationParametersActionParameters.DELETE_EXAMINATION_PARAMETER
}

interface DeleteExaminationParameterSuccess {
    type: ExaminationParametersActionParameters.DELETE_EXAMINATION_PARAMETER_SUCCESS
    payload: number
}

interface DeleteExaminationParameterFail {
    type: ExaminationParametersActionParameters.DELETE_EXAMINATION_PARAMETER_FAIL
}

export const deleteExaminationParameter = (
    deletedId: number
): ThunkResult<void> => async dispatch => {
    dispatch({ type: ExaminationParametersActionParameters.DELETE_EXAMINATION_PARAMETER })
    try {
        await examinationParameters.delete(deletedId)
        dispatch({
            type: ExaminationParametersActionParameters.DELETE_EXAMINATION_PARAMETER_SUCCESS,
            payload: deletedId,
        })
        toast.success("Sukces")
    } catch (e) {
        dispatch({ type: ExaminationParametersActionParameters.DELETE_EXAMINATION_PARAMETER_FAIL })
    }
}

export type EXAMINATION_PARAMETERS_ACTIONS =
    | GetExaminationParameters
    | GetExaminationParametersSuccess
    | GetExaminationParametersFail
    | GetExaminationParameter
    | GetExaminationParametersuccess
    | GetExaminationParameterFail
    | CreateExaminationParameter
    | CreateExaminationParameterSuccess
    | CreateExaminationParameterFail
    | UpdateExaminationParameter
    | UpdateExaminationParameterSuccess
    | UpdateExaminationParameterFail
    | DeleteExaminationParameter
    | DeleteExaminationParameterSuccess
    | DeleteExaminationParameterFail
