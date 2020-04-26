import { history } from './../../index'
import { ExaminationParametersValues as examinationParameterValues } from '../../api'
import { ThunkAction } from 'redux-thunk'
import { Dispatch } from 'redux'
import { RootState, RootActions } from '../store'
import { ExaminationParameterValue } from './examinationValuesReducer'

export type ThunkResult<R> = ThunkAction<R, RootState, undefined, RootActions>
export enum ExaminationParameterValuesActionTypes {
    GET_EXAMINATION_PARAMETER_VALUES = 'GET_EXAMINATION_PARAMETER_VALUES',
    GET_EXAMINATION_PARAMETER_VALUES_SUCCESS = 'GET_EXAMINATION_PARAMETER_VALUES_SUCCESS',
    GET_EXAMINATION_PARAMETER_VALUES_FAIL = 'GET_EXAMINATION_PARAMETER_VALUES_FAIL',
    GET_EXAMINATION_PARAMETER_VALUES_BY_EXAMINATION_ID = 'GET_EXAMINATION_PARAMETER_VALUES_BY_EXAMINATION_ID',
    GET_EXAMINATION_PARAMETER_VALUES_BY_EXAMINATION_ID_SUCCESS = 'GET_EXAMINATION_PARAMETER_VALUES_BY_EXAMINATION_ID_SUCCESS',
    GET_EXAMINATION_PARAMETER_VALUES_BY_EXAMINATION_ID_FAIL = 'GET_EXAMINATION_PARAMETER_VALUES_BY_EXAMINATION_ID_FAIL',
    GET_EXAMINATION_PARAMETER_VALUE = 'GET_EXAMINATION_PARAMETER_VALUE',
    GET_EXAMINATION_PARAMETER_VALUE_SUCCESS = 'GET_EXAMINATION_PARAMETER_VALUE_SUCCESS',
    GET_EXAMINATION_PARAMETER_VALUE_FAIL = 'GET_EXAMINATION_PARAMETER_VALUE_FAIL',
    CREATE_EXAMINATION_PARAMETER_VALUE = 'CREATE_EXAMINATION_PARAMETER_VALUE',
    CREATE_EXAMINATION_PARAMETER_VALUE_SUCCESS = 'CREATE_EXAMINATION_PARAMETER_VALUE_SUCCESS',
    CREATE_EXAMINATION_PARAMETER_VALUE_FAIL = 'CREATE_EXAMINATION_PARAMETER_VALUE_FAIL',
    UPDATE_EXAMINATION_PARAMETER_VALUE = 'UPDATE_EXAMINATION_PARAMETER_VALUE',
    UPDATE_EXAMINATION_PARAMETER_VALUE_SUCCESS = 'UPDATE_EXAMINATION_PARAMETER_VALUE_SUCCESS',
    UPDATE_EXAMINATION_PARAMETER_VALUE_FAIL = 'UPDATE_EXAMINATION_PARAMETER_VALUE_FAIL',
    DELETE_EXAMINATION_PARAMETER_VALUE = 'DELETE_EXAMINATION_PARAMETER_VALUE',
    DELETE_EXAMINATION_PARAMETER_VALUE_SUCCESS = 'DELETE_EXAMINATION_PARAMETER_VALUE_SUCCESS',
    DELETE_EXAMINATION_PARAMETER_VALUE_FAIL = 'DELETE_EXAMINATION_PARAMETER_VALUE_FAIL',
}

// FETCH EXAMINATION_PARAMETER_VALUE LIST
interface GetExaminationParameterValues {
    type: ExaminationParameterValuesActionTypes.GET_EXAMINATION_PARAMETER_VALUES
}

interface GetExaminationParameterValuesSuccess {
    type: ExaminationParameterValuesActionTypes.GET_EXAMINATION_PARAMETER_VALUES_SUCCESS
    payload: any
}

interface GetExaminationParameterValuesFail {
    type: ExaminationParameterValuesActionTypes.GET_EXAMINATION_PARAMETER_VALUES_FAIL
}

export const getExaminationParameterValues = (): ThunkResult<void> => async dispatch => {
    handleGetExaminationParameterValues(dispatch)
    try {
        const response: ExaminationParameterValue[] = await examinationParameterValues.getExaminationParameterValues()
        handleGetExaminationParameterValuesSuccess(dispatch, response)
    } catch (e) {
        console.log(e)
        handleGetExaminationParameterValuesFail(dispatch)
    }
}

export const handleGetExaminationParameterValues = (dispatch: Dispatch<GetExaminationParameterValues>) => {
    dispatch({ type: ExaminationParameterValuesActionTypes.GET_EXAMINATION_PARAMETER_VALUES })
}

export const handleGetExaminationParameterValuesSuccess = (
    dispatch: Dispatch<GetExaminationParameterValuesSuccess>,
    response: ExaminationParameterValue[]
) => {
    dispatch({
        type: ExaminationParameterValuesActionTypes.GET_EXAMINATION_PARAMETER_VALUES_SUCCESS,
        payload: response,
    })
}

export const handleGetExaminationParameterValuesFail = (dispatch: Dispatch<GetExaminationParameterValuesFail>) => {
    dispatch({
        type: ExaminationParameterValuesActionTypes.GET_EXAMINATION_PARAMETER_VALUES_FAIL,
    })
}

// FETCH EXAMINATION_PARAMETER_VALUE LIST BY EXAMINATION ID
interface GetExaminationParameterValuesByExaminationId {
    type: ExaminationParameterValuesActionTypes.GET_EXAMINATION_PARAMETER_VALUES_BY_EXAMINATION_ID
}

interface GetExaminationParameterValuesByExaminationIdSuccess {
    type: ExaminationParameterValuesActionTypes.GET_EXAMINATION_PARAMETER_VALUES_BY_EXAMINATION_ID_SUCCESS
    payload: any
}

interface GetExaminationParameterValuesByExaminationIdFail {
    type: ExaminationParameterValuesActionTypes.GET_EXAMINATION_PARAMETER_VALUES_BY_EXAMINATION_ID_FAIL
}

export const getExaminationParameterValuesByExaminationId = (examinationId: string): ThunkResult<void> => async dispatch => {
    handleGetExaminationParameterValues(dispatch)
    try {
        const response: ExaminationParameterValue[] = await examinationParameterValues.getByExaminationId(examinationId)
        handleGetExaminationParameterValuesByExaminationIdSuccess(dispatch, response)
    } catch (e) {
        console.log(e)
        handleGetExaminationParameterValuesByExaminationIdFail(dispatch)
    }
}

export const handleGetExaminationParameterValuesByExaminationId = (dispatch: Dispatch<GetExaminationParameterValuesByExaminationId>) => {
    dispatch({ type: ExaminationParameterValuesActionTypes.GET_EXAMINATION_PARAMETER_VALUES_BY_EXAMINATION_ID })
}

export const handleGetExaminationParameterValuesByExaminationIdSuccess = (
    dispatch: Dispatch<GetExaminationParameterValuesByExaminationIdSuccess>,
    response: ExaminationParameterValue[]
) => {
    dispatch({
        type: ExaminationParameterValuesActionTypes.GET_EXAMINATION_PARAMETER_VALUES_BY_EXAMINATION_ID_SUCCESS,
        payload: response,
    })
}

export const handleGetExaminationParameterValuesByExaminationIdFail = (dispatch: Dispatch<GetExaminationParameterValuesByExaminationIdFail>) => {
    dispatch({
        type: ExaminationParameterValuesActionTypes.GET_EXAMINATION_PARAMETER_VALUES_BY_EXAMINATION_ID_FAIL,
    })
}

// FETCH SINGLE EXAMINATION_PARAMETER_VALUE
interface GetExaminationParameterValue {
    type: ExaminationParameterValuesActionTypes.GET_EXAMINATION_PARAMETER_VALUE
}

interface GetExaminationParameterValuesuccess {
    type: ExaminationParameterValuesActionTypes.GET_EXAMINATION_PARAMETER_VALUE_SUCCESS
    payload: ExaminationParameterValue
}

interface GetExaminationParameterValueFail {
    type: ExaminationParameterValuesActionTypes.GET_EXAMINATION_PARAMETER_VALUE_FAIL
}

export const getExaminationParameterValue = (id: string): ThunkResult<void> => async dispatch => {
    handleGetExaminationParameterValue(dispatch)
    try {
        const response: ExaminationParameterValue = await examinationParameterValues.getExaminationParameterValue(id)
        handleGetExaminationParameterValuesuccess(dispatch, response)
    } catch (e) {
        handleGetExaminationParameterValueFail(dispatch)
    }
}

export const handleGetExaminationParameterValue = (dispatch: Dispatch<GetExaminationParameterValue>) => {
    dispatch({ type: ExaminationParameterValuesActionTypes.GET_EXAMINATION_PARAMETER_VALUE })
}

const handleGetExaminationParameterValuesuccess = (
    dispatch: Dispatch<GetExaminationParameterValuesuccess>,
    response: ExaminationParameterValue
) => {
    dispatch({
        type: ExaminationParameterValuesActionTypes.GET_EXAMINATION_PARAMETER_VALUE_SUCCESS,
        payload: response,
    })
}

const handleGetExaminationParameterValueFail = (dispatch: Dispatch<GetExaminationParameterValueFail>) => {
    dispatch({
        type: ExaminationParameterValuesActionTypes.GET_EXAMINATION_PARAMETER_VALUE_FAIL,
    })
}

// ADD EXAMINATION_PARAMETER_VALUE
interface CreateExaminationParameterValue {
    type: ExaminationParameterValuesActionTypes.CREATE_EXAMINATION_PARAMETER_VALUE
}

interface CreateExaminationParameterValueSuccess {
    type: ExaminationParameterValuesActionTypes.CREATE_EXAMINATION_PARAMETER_VALUE_SUCCESS
    payload: ExaminationParameterValue
}

interface CreateExaminationParameterValueFail {
    type: ExaminationParameterValuesActionTypes.CREATE_EXAMINATION_PARAMETER_VALUE_FAIL
}

export const createExaminationParameterValue = (examinationParameterValue: ExaminationParameterValue): ThunkResult<void> => async dispatch => {
    handleCreateExaminationParameterValue(dispatch)
    try {
        const response: ExaminationParameterValue = await examinationParameterValues.create(examinationParameterValue)
        handleCreateExaminationParameterValueSuccess(dispatch, response)
    } catch (e) {
        handleCreateExaminationParameterValueFail(dispatch)
    }
}

const handleCreateExaminationParameterValue = (dispatch: Dispatch<CreateExaminationParameterValue>) => {
    dispatch({ type: ExaminationParameterValuesActionTypes.CREATE_EXAMINATION_PARAMETER_VALUE })
}

const handleCreateExaminationParameterValueSuccess = (
    dispatch: Dispatch<CreateExaminationParameterValueSuccess>,
    response: ExaminationParameterValue
) => {
    dispatch({ type: ExaminationParameterValuesActionTypes.CREATE_EXAMINATION_PARAMETER_VALUE_SUCCESS, payload: response })
}

const handleCreateExaminationParameterValueFail = (dispatch: Dispatch<CreateExaminationParameterValueFail>) => {
    dispatch({ type: ExaminationParameterValuesActionTypes.CREATE_EXAMINATION_PARAMETER_VALUE_FAIL })
}

// EDIT EXAMINATION_PARAMETER_VALUE
interface UpdateExaminationParameterValue {
    type: ExaminationParameterValuesActionTypes.UPDATE_EXAMINATION_PARAMETER_VALUE
}

interface UpdateExaminationParameterValueSuccess {
    type: ExaminationParameterValuesActionTypes.UPDATE_EXAMINATION_PARAMETER_VALUE_SUCCESS
    payload: ExaminationParameterValue
}

interface UpdateExaminationParameterValueFail {
    type: ExaminationParameterValuesActionTypes.UPDATE_EXAMINATION_PARAMETER_VALUE_FAIL
}

export const updateExaminationParameterValue = (
    updatedExaminationParameterValue: ExaminationParameterValue
): ThunkResult<void> => async dispatch => {
    handleUpdateExaminationParameterValue(dispatch)
    try {
        const response: ExaminationParameterValue = await examinationParameterValues.update(updatedExaminationParameterValue)
        handleUpdateExaminationParameterValueSuccess(dispatch, response)
    } catch (e) {
        handleUpdateExaminationParameterValueFail(dispatch)
    }
}

const handleUpdateExaminationParameterValue = (dispatch: Dispatch<UpdateExaminationParameterValue>): void => {
    dispatch({ type: ExaminationParameterValuesActionTypes.UPDATE_EXAMINATION_PARAMETER_VALUE })
}

const handleUpdateExaminationParameterValueSuccess = (
    dispatch: Dispatch<UpdateExaminationParameterValueSuccess>,
    updatedExaminationParameterValue: ExaminationParameterValue
) => {
    dispatch({ type: ExaminationParameterValuesActionTypes.UPDATE_EXAMINATION_PARAMETER_VALUE_SUCCESS, payload: updatedExaminationParameterValue })
}

const handleUpdateExaminationParameterValueFail = (dispatch: Dispatch<UpdateExaminationParameterValueFail>) => {
    dispatch({ type: ExaminationParameterValuesActionTypes.UPDATE_EXAMINATION_PARAMETER_VALUE_FAIL })
}

// DELETE EXAMINATION_PARAMETER_VALUE
interface DeleteExaminationParameterValue {
    type: ExaminationParameterValuesActionTypes.DELETE_EXAMINATION_PARAMETER_VALUE
}

interface DeleteExaminationParameterValueSuccess {
    type: ExaminationParameterValuesActionTypes.DELETE_EXAMINATION_PARAMETER_VALUE_SUCCESS
    payload: string
}

interface DeleteExaminationParameterValueFail {
    type: ExaminationParameterValuesActionTypes.DELETE_EXAMINATION_PARAMETER_VALUE_FAIL
}

export const deleteExaminationParameterValue = (
    deletedId: string
): ThunkResult<void> => async dispatch => {
    dispatch({ type: ExaminationParameterValuesActionTypes.DELETE_EXAMINATION_PARAMETER_VALUE })
    try {
        await examinationParameterValues.delete(deletedId)
        console.log("id: " + deletedId)
        dispatch({
            type: ExaminationParameterValuesActionTypes.DELETE_EXAMINATION_PARAMETER_VALUE_SUCCESS,
            payload: deletedId,
        })
        history.push('/ExaminationParameterValues')
    } catch (e) {
        dispatch({ type: ExaminationParameterValuesActionTypes.DELETE_EXAMINATION_PARAMETER_VALUE_FAIL })
    }
}

export type EXAMINATION_PARAMETER_VALUES_ACTIONS =
    | GetExaminationParameterValues
    | GetExaminationParameterValuesSuccess
    | GetExaminationParameterValuesFail
    | GetExaminationParameterValuesByExaminationId
    | GetExaminationParameterValuesByExaminationIdSuccess
    | GetExaminationParameterValuesByExaminationIdFail
    | GetExaminationParameterValue
    | GetExaminationParameterValuesuccess
    | GetExaminationParameterValueFail
    | CreateExaminationParameterValue
    | CreateExaminationParameterValueSuccess
    | CreateExaminationParameterValueFail
    | UpdateExaminationParameterValue
    | UpdateExaminationParameterValueSuccess
    | UpdateExaminationParameterValueFail
    | DeleteExaminationParameterValue
    | DeleteExaminationParameterValueSuccess
    | DeleteExaminationParameterValueFail
