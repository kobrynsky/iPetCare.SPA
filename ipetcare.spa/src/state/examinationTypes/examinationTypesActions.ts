import { history } from './../../index'
import { ExaminationTypes as examinationTypes } from '../../api'
import { ThunkAction } from 'redux-thunk'
import { Dispatch } from 'redux'
import { RootState, RootActions } from '../store'
import { ExaminationType } from './examinationTypesReducer'
import { AxiosResponse } from 'axios'

export type ThunkResult<R> = ThunkAction<R, RootState, undefined, RootActions>
export enum ExaminationTypesActionTypes {
    GET_EXAMINATION_TYPES = 'GET_EXAMINATION_TYPES',
    GET_EXAMINATION_TYPES_SUCCESS = 'GET_EXAMINATION_TYPES_SUCCESS',
    GET_EXAMINATION_TYPES_FAIL = 'GET_EXAMINATION_TYPES_FAIL',
    GET_EXAMINATION_TYPE = 'GET_EXAMINATION_TYPE',
    GET_EXAMINATION_TYPE_SUCCESS = 'GET_EXAMINATION_TYPE_SUCCESS',
    GET_EXAMINATION_TYPE_FAIL = 'GET_EXAMINATION_TYPE_FAIL',
    CREATE_EXAMINATION_TYPE = 'CREATE_EXAMINATION_TYPE',
    CREATE_EXAMINATION_TYPE_SUCCESS = 'CREATE_EXAMINATION_TYPE_SUCCESS',
    CREATE_EXAMINATION_TYPE_FAIL = 'CREATE_EXAMINATION_TYPE_FAIL',
    UPDATE_EXAMINATION_TYPE = 'UPDATE_EXAMINATION_TYPE',
    UPDATE_EXAMINATION_TYPE_SUCCESS = 'UPDATE_EXAMINATION_TYPE_SUCCESS',
    UPDATE_EXAMINATION_TYPE_FAIL = 'UPDATE_EXAMINATION_TYPE_FAIL',
    DELETE_EXAMINATION_TYPE = 'DELETE_EXAMINATION_TYPE',
    DELETE_EXAMINATION_TYPE_SUCCESS = 'DELETE_EXAMINATION_TYPE_SUCCESS',
    DELETE_EXAMINATION_TYPE_FAIL = 'DELETE_EXAMINATION_TYPE_FAIL',
}

// FETCH EXAMINATION_TYPE LIST
interface GetExaminationTypes {
    type: ExaminationTypesActionTypes.GET_EXAMINATION_TYPES
}

interface GetExaminationTypesSuccess {
    type: ExaminationTypesActionTypes.GET_EXAMINATION_TYPES_SUCCESS
    payload: any
}

interface GetExaminationTypesFail {
    type: ExaminationTypesActionTypes.GET_EXAMINATION_TYPES_FAIL
}

export const getExaminationTypes = (): ThunkResult<void> => async dispatch => {
    handleGetExaminationTypes(dispatch)
    try {
        const response: ExaminationType[] = await examinationTypes.getExaminationTypes()
        handleGetExaminationTypesSuccess(dispatch, response)
    } catch (e) {
        handleGetExaminationTypesFail(dispatch)
    }
}

export const handleGetExaminationTypes = (dispatch: Dispatch<GetExaminationTypes>) => {
    dispatch({ type: ExaminationTypesActionTypes.GET_EXAMINATION_TYPES })
}

export const handleGetExaminationTypesSuccess = (
    dispatch: Dispatch<GetExaminationTypesSuccess>,
    response: ExaminationType[]
) => {
    dispatch({
        type: ExaminationTypesActionTypes.GET_EXAMINATION_TYPES_SUCCESS,
        payload: response,
    })
}

export const handleGetExaminationTypesFail = (dispatch: Dispatch<GetExaminationTypesFail>) => {
    dispatch({
        type: ExaminationTypesActionTypes.GET_EXAMINATION_TYPES_FAIL,
    })
}

// FETCH SINGLE EXAMINATION_TYPE
interface GetExaminationType {
    type: ExaminationTypesActionTypes.GET_EXAMINATION_TYPE
}

interface GetExaminationTypesuccess {
    type: ExaminationTypesActionTypes.GET_EXAMINATION_TYPE_SUCCESS
    payload: ExaminationType
}

interface GetExaminationTypeFail {
    type: ExaminationTypesActionTypes.GET_EXAMINATION_TYPE_FAIL
}

export const getExaminationType = (id: number): ThunkResult<void> => async dispatch => {
    handleGetExaminationType(dispatch)
    try {
        const response: ExaminationType = await examinationTypes.getExaminationType(id)
        handleGetExaminationTypesuccess(dispatch, response)
    } catch (e) {
        handleGetExaminationTypeFail(dispatch)
    }
}

export const handleGetExaminationType = (dispatch: Dispatch<GetExaminationType>) => {
    dispatch({ type: ExaminationTypesActionTypes.GET_EXAMINATION_TYPE })
}

const handleGetExaminationTypesuccess = (
    dispatch: Dispatch<GetExaminationTypesuccess>,
    response: ExaminationType
) => {
    dispatch({
        type: ExaminationTypesActionTypes.GET_EXAMINATION_TYPE_SUCCESS,
        payload: response,
    })
}

const handleGetExaminationTypeFail = (dispatch: Dispatch<GetExaminationTypeFail>) => {
    dispatch({
        type: ExaminationTypesActionTypes.GET_EXAMINATION_TYPE_FAIL,
    })
}

// ADD EXAMINATION_TYPE
interface CreateExaminationType {
    type: ExaminationTypesActionTypes.CREATE_EXAMINATION_TYPE
}

interface CreateExaminationTypeSuccess {
    type: ExaminationTypesActionTypes.CREATE_EXAMINATION_TYPE_SUCCESS
    payload: ExaminationType
}

interface CreateExaminationTypeFail {
    type: ExaminationTypesActionTypes.CREATE_EXAMINATION_TYPE_FAIL
}

export const createExaminationType = (examinationType: ExaminationType): ThunkResult<void> => async dispatch => {
    handleCreateExaminationType(dispatch)
    try {
        const response: ExaminationType = await examinationTypes.create(examinationType)
        handleCreateExaminationTypeSuccess(dispatch, response)
    } catch (e) {
        handleCreateExaminationTypeFail(dispatch)
    }
}

const handleCreateExaminationType = (dispatch: Dispatch<CreateExaminationType>) => {
    dispatch({ type: ExaminationTypesActionTypes.CREATE_EXAMINATION_TYPE })
}

const handleCreateExaminationTypeSuccess = (
    dispatch: Dispatch<CreateExaminationTypeSuccess>,
    response: ExaminationType
) => {
    dispatch({ type: ExaminationTypesActionTypes.CREATE_EXAMINATION_TYPE_SUCCESS, payload: response })
    history.push('/ExaminationTypes')
}

const handleCreateExaminationTypeFail = (dispatch: Dispatch<CreateExaminationTypeFail>) => {
    dispatch({ type: ExaminationTypesActionTypes.CREATE_EXAMINATION_TYPE_FAIL })
}

// EDIT EXAMINATION_TYPE
interface UpdateExaminationType {
    type: ExaminationTypesActionTypes.UPDATE_EXAMINATION_TYPE
}

interface UpdateExaminationTypeSuccess {
    type: ExaminationTypesActionTypes.UPDATE_EXAMINATION_TYPE_SUCCESS
    payload: ExaminationType
}

interface UpdateExaminationTypeFail {
    type: ExaminationTypesActionTypes.UPDATE_EXAMINATION_TYPE_FAIL
}

export const updateExaminationType = (
    updatedExaminationType: ExaminationType
): ThunkResult<void> => async dispatch => {
    handleUpdateExaminationType(dispatch)
    try {
        const response: ExaminationType = await examinationTypes.update(updatedExaminationType)
        handleUpdateExaminationTypeSuccess(dispatch, response)
    } catch (e) {
        handleUpdateExaminationTypeFail(dispatch)
    }
}

const handleUpdateExaminationType = (dispatch: Dispatch<UpdateExaminationType>): void => {
    dispatch({ type: ExaminationTypesActionTypes.UPDATE_EXAMINATION_TYPE })
}

const handleUpdateExaminationTypeSuccess = (
    dispatch: Dispatch<UpdateExaminationTypeSuccess>,
    updatedExaminationType: ExaminationType
) => {
    dispatch({ type: ExaminationTypesActionTypes.UPDATE_EXAMINATION_TYPE_SUCCESS, payload: updatedExaminationType })
}

const handleUpdateExaminationTypeFail = (dispatch: Dispatch<UpdateExaminationTypeFail>) => {
    dispatch({ type: ExaminationTypesActionTypes.UPDATE_EXAMINATION_TYPE_FAIL })
}

// DELETE EXAMINATION_TYPE
interface DeleteExaminationType {
    type: ExaminationTypesActionTypes.DELETE_EXAMINATION_TYPE
}

interface DeleteExaminationTypeSuccess {
    type: ExaminationTypesActionTypes.DELETE_EXAMINATION_TYPE_SUCCESS
    payload: number
}

interface DeleteExaminationTypeFail {
    type: ExaminationTypesActionTypes.DELETE_EXAMINATION_TYPE_FAIL
}

export const deleteExaminationType = (
    deletedId: number
): ThunkResult<void> => async dispatch => {
    dispatch({ type: ExaminationTypesActionTypes.DELETE_EXAMINATION_TYPE })
    try {
        await examinationTypes.delete(deletedId)
        dispatch({
            type: ExaminationTypesActionTypes.DELETE_EXAMINATION_TYPE_SUCCESS,
            payload: deletedId,
        })
    } catch (e) {
        dispatch({ type: ExaminationTypesActionTypes.DELETE_EXAMINATION_TYPE_FAIL })
    }
}

export type EXAMINATION_TYPES_ACTIONS =
    | GetExaminationTypes
    | GetExaminationTypesSuccess
    | GetExaminationTypesFail
    | GetExaminationType
    | GetExaminationTypesuccess
    | GetExaminationTypeFail
    | CreateExaminationType
    | CreateExaminationTypeSuccess
    | CreateExaminationTypeFail
    | UpdateExaminationType
    | UpdateExaminationTypeSuccess
    | UpdateExaminationTypeFail
    | DeleteExaminationType
    | DeleteExaminationTypeSuccess
    | DeleteExaminationTypeFail
