import { history } from './../../index'
import { Examinations as examinations } from '../../api'
import { ThunkAction } from 'redux-thunk'
import { Dispatch } from 'redux'
import { RootState, RootActions } from '../store'
import { Examination, ExaminationDetails } from './examinationsReducer'

export type ThunkResult<R> = ThunkAction<R, RootState, undefined, RootActions>
export enum ExaminationsActionTypes {
    GET_EXAMINATIONS = 'GET_EXAMINATIONS',
    GET_EXAMINATIONS_SUCCESS = 'GET_EXAMINATIONS_SUCCESS',
    GET_EXAMINATIONS_FAIL = 'GET_EXAMINATIONS_FAIL',
    GET_EXAMINATIONS_BY_PET_ID = 'GET_EXAMINATIONS_BY_PET_ID',
    GET_EXAMINATIONS_BY_PET_ID_SUCCESS = 'GET_EXAMINATIONS_BY_PET_ID_SUCCESS',
    GET_EXAMINATIONS_BY_PET_ID_FAIL = 'GET_EXAMINATIONS_BY_PET_ID_FAIL',
    GET_EXAMINATION = 'GET_EXAMINATION',
    GET_EXAMINATION_SUCCESS = 'GET_EXAMINATION_SUCCESS',
    GET_EXAMINATION_FAIL = 'GET_EXAMINATION_FAIL',
    CREATE_EXAMINATION = 'CREATE_EXAMINATION',
    CREATE_EXAMINATION_SUCCESS = 'CREATE_EXAMINATION_SUCCESS',
    CREATE_EXAMINATION_FAIL = 'CREATE_EXAMINATION_FAIL',
    UPDATE_EXAMINATION = 'UPDATE_EXAMINATION',
    UPDATE_EXAMINATION_SUCCESS = 'UPDATE_EXAMINATION_SUCCESS',
    UPDATE_EXAMINATION_FAIL = 'UPDATE_EXAMINATION_FAIL',
    DELETE_EXAMINATION = 'DELETE_EXAMINATION',
    DELETE_EXAMINATION_SUCCESS = 'DELETE_EXAMINATION_SUCCESS',
    DELETE_EXAMINATION_FAIL = 'DELETE_EXAMINATION_FAIL',
}

// FETCH EXAMINATION LIST
interface GetExaminations {
    type: ExaminationsActionTypes.GET_EXAMINATIONS
}

interface GetExaminationsSuccess {
    type: ExaminationsActionTypes.GET_EXAMINATIONS_SUCCESS
    payload: any
}

interface GetExaminationsFail {
    type: ExaminationsActionTypes.GET_EXAMINATIONS_FAIL
}

export const getExaminations = (): ThunkResult<void> => async dispatch => {
    handleGetExaminations(dispatch)
    try {
        const response: Examination[] = await examinations.getExaminations()
        handleGetExaminationsSuccess(dispatch, response)
    } catch (e) {
        console.log(e)
        handleGetExaminationsFail(dispatch)
    }
}

export const handleGetExaminations = (dispatch: Dispatch<GetExaminations>) => {
    dispatch({ type: ExaminationsActionTypes.GET_EXAMINATIONS })
}

export const handleGetExaminationsSuccess = (
    dispatch: Dispatch<GetExaminationsSuccess>,
    response: Examination[]
) => {
    dispatch({
        type: ExaminationsActionTypes.GET_EXAMINATIONS_SUCCESS,
        payload: response,
    })
}

export const handleGetExaminationsFail = (dispatch: Dispatch<GetExaminationsFail>) => {
    dispatch({
        type: ExaminationsActionTypes.GET_EXAMINATIONS_FAIL,
    })
}

// FETCH EXAMINATION LIST BY PET ID
interface GetExaminationsByPetId {
    type: ExaminationsActionTypes.GET_EXAMINATIONS_BY_PET_ID
}

interface GetExaminationsByPetIdSuccess {
    type: ExaminationsActionTypes.GET_EXAMINATIONS_BY_PET_ID_SUCCESS
    payload: any
}

interface GetExaminationsByPetIdFail {
    type: ExaminationsActionTypes.GET_EXAMINATIONS_BY_PET_ID_FAIL
}

export const getExaminationsByPetId = (petId: string): ThunkResult<void> => async dispatch => {
    handleGetExaminationsByPetId(dispatch)
    try {
        const response: Examination[] = await examinations.getExaminationsByPetId(petId)
        handleGetExaminationsByPetIdSuccess(dispatch, response)
    } catch (e) {
        console.log(e)
        handleGetExaminationsByPetIdFail(dispatch)
    }
}

export const handleGetExaminationsByPetId = (dispatch: Dispatch<GetExaminationsByPetId>) => {
    dispatch({ type: ExaminationsActionTypes.GET_EXAMINATIONS_BY_PET_ID })
}

export const handleGetExaminationsByPetIdSuccess = (
    dispatch: Dispatch<GetExaminationsByPetIdSuccess>,
    response: Examination[]
) => {
    dispatch({
        type: ExaminationsActionTypes.GET_EXAMINATIONS_BY_PET_ID_SUCCESS,
        payload: response,
    })
}

export const handleGetExaminationsByPetIdFail = (dispatch: Dispatch<GetExaminationsByPetIdFail>) => {
    dispatch({
        type: ExaminationsActionTypes.GET_EXAMINATIONS_BY_PET_ID_FAIL,
    })
}

// FETCH SINGLE EXAMINATION
interface GetExamination {
    type: ExaminationsActionTypes.GET_EXAMINATION
}

interface GetExaminationsuccess {
    type: ExaminationsActionTypes.GET_EXAMINATION_SUCCESS
    payload: ExaminationDetails
}

interface GetExaminationFail {
    type: ExaminationsActionTypes.GET_EXAMINATION_FAIL
}

export const getExamination = (id: string): ThunkResult<void> => async dispatch => {
    handleGetExamination(dispatch)
    try {
        const response: ExaminationDetails = await examinations.getExamination(id)
        handleGetExaminationsuccess(dispatch, response)
    } catch (e) {
        handleGetExaminationFail(dispatch)
    }
}

export const handleGetExamination = (dispatch: Dispatch<GetExamination>) => {
    dispatch({ type: ExaminationsActionTypes.GET_EXAMINATION })
}

const handleGetExaminationsuccess = (
    dispatch: Dispatch<GetExaminationsuccess>,
    response: ExaminationDetails
) => {
    dispatch({
        type: ExaminationsActionTypes.GET_EXAMINATION_SUCCESS,
        payload: response,
    })
}

const handleGetExaminationFail = (dispatch: Dispatch<GetExaminationFail>) => {
    dispatch({
        type: ExaminationsActionTypes.GET_EXAMINATION_FAIL,
    })
}

// ADD EXAMINATION
interface CreateExamination {
    type: ExaminationsActionTypes.CREATE_EXAMINATION
}

interface CreateExaminationSuccess {
    type: ExaminationsActionTypes.CREATE_EXAMINATION_SUCCESS
    payload: Examination
}

interface CreateExaminationFail {
    type: ExaminationsActionTypes.CREATE_EXAMINATION_FAIL
}

export const createExamination = (examination: Examination): ThunkResult<void> => async dispatch => {
    handleCreateExamination(dispatch)
    try {
        const response: Examination = await examinations.create(examination)
        handleCreateExaminationSuccess(dispatch, response)
    } catch (e) {
        handleCreateExaminationFail(dispatch)
    }
}

const handleCreateExamination = (dispatch: Dispatch<CreateExamination>) => {
    dispatch({ type: ExaminationsActionTypes.CREATE_EXAMINATION })
}

const handleCreateExaminationSuccess = (
    dispatch: Dispatch<CreateExaminationSuccess>,
    response: Examination
) => {
    dispatch({ type: ExaminationsActionTypes.CREATE_EXAMINATION_SUCCESS, payload: response })
}

const handleCreateExaminationFail = (dispatch: Dispatch<CreateExaminationFail>) => {
    dispatch({ type: ExaminationsActionTypes.CREATE_EXAMINATION_FAIL })
}

// EDIT EXAMINATION
interface UpdateExamination {
    type: ExaminationsActionTypes.UPDATE_EXAMINATION
}

interface UpdateExaminationSuccess {
    type: ExaminationsActionTypes.UPDATE_EXAMINATION_SUCCESS
    payload: Examination
}

interface UpdateExaminationFail {
    type: ExaminationsActionTypes.UPDATE_EXAMINATION_FAIL
}

export const updateExamination = (
    updatedExamination: Examination
): ThunkResult<void> => async dispatch => {
    handleUpdateExamination(dispatch)
    try {
        const response: Examination = await examinations.update(updatedExamination)
        handleUpdateExaminationSuccess(dispatch, response)
    } catch (e) {
        handleUpdateExaminationFail(dispatch)
    }
}

const handleUpdateExamination = (dispatch: Dispatch<UpdateExamination>): void => {
    dispatch({ type: ExaminationsActionTypes.UPDATE_EXAMINATION })
}

const handleUpdateExaminationSuccess = (
    dispatch: Dispatch<UpdateExaminationSuccess>,
    updatedExamination: Examination
) => {
    dispatch({ type: ExaminationsActionTypes.UPDATE_EXAMINATION_SUCCESS, payload: updatedExamination })
}

const handleUpdateExaminationFail = (dispatch: Dispatch<UpdateExaminationFail>) => {
    dispatch({ type: ExaminationsActionTypes.UPDATE_EXAMINATION_FAIL })
}

// DELETE EXAMINATION
interface DeleteExamination {
    type: ExaminationsActionTypes.DELETE_EXAMINATION
}

interface DeleteExaminationSuccess {
    type: ExaminationsActionTypes.DELETE_EXAMINATION_SUCCESS
    payload: string
}

interface DeleteExaminationFail {
    type: ExaminationsActionTypes.DELETE_EXAMINATION_FAIL
}

export const deleteExamination = (
    deletedId: string,
    petId: string
): ThunkResult<void> => async dispatch => {
    dispatch({ type: ExaminationsActionTypes.DELETE_EXAMINATION })
    try {
        await examinations.delete(deletedId, petId)
        console.log("id: " + deletedId)
        dispatch({
            type: ExaminationsActionTypes.DELETE_EXAMINATION_SUCCESS,
            payload: deletedId,
        })
        history.push('/Examinations')
    } catch (e) {
        dispatch({ type: ExaminationsActionTypes.DELETE_EXAMINATION_FAIL })
    }
}

export type EXAMINATIONS_ACTIONS =
    | GetExaminations
    | GetExaminationsSuccess
    | GetExaminationsFail
    | GetExaminationsByPetId
    | GetExaminationsByPetIdSuccess
    | GetExaminationsByPetIdFail
    | GetExamination
    | GetExaminationsuccess
    | GetExaminationFail
    | CreateExamination
    | CreateExaminationSuccess
    | CreateExaminationFail
    | UpdateExamination
    | UpdateExaminationSuccess
    | UpdateExaminationFail
    | DeleteExamination
    | DeleteExaminationSuccess
    | DeleteExaminationFail
