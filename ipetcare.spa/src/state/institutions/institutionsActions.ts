import { history } from './../../index'
import { Institutions as institutions } from '../../api'
import { ThunkAction } from 'redux-thunk'
import { Dispatch } from 'redux'
import { RootState, RootActions } from '../store'
import { Institution } from './institutionsReducer'

export type ThunkResult<R> = ThunkAction<R, RootState, undefined, RootActions>
export enum InstitutionsActionTypes {
    GET_INSTITUTIONS = 'GET_INSTITUTIONS',
    GET_INSTITUTIONS_SUCCESS = 'GET_INSTITUTIONS_SUCCESS',
    GET_INSTITUTIONS_FAIL = 'GET_INSTITUTIONS_FAIL',
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

export const handleGetInstitutionsFail = (dispatch: Dispatch<GetInstitutionsFail>) => {
    dispatch({
        type: InstitutionsActionTypes.GET_INSTITUTIONS_FAIL,
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

export const getInstitution = (id: string): ThunkResult<void> => async dispatch => {
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

export const createInstitution = (institution: Institution): ThunkResult<void> => async dispatch => {
    handleCreateInstitution(dispatch)
    try {
        const response: Institution = await institutions.create(institution)
        handleCreateInstitutionSuccess(dispatch, response)
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
    dispatch({ type: InstitutionsActionTypes.CREATE_INSTITUTION_SUCCESS, payload: response })
}

const handleCreateInstitutionFail = (dispatch: Dispatch<CreateInstitutionFail>) => {
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
    } catch (e) {
        handleUpdateInstitutionFail(dispatch)
    }
}

const handleUpdateInstitution = (dispatch: Dispatch<UpdateInstitution>): void => {
    dispatch({ type: InstitutionsActionTypes.UPDATE_INSTITUTION })
}

const handleUpdateInstitutionSuccess = (
    dispatch: Dispatch<UpdateInstitutionSuccess>,
    updatedInstitution: Institution
) => {
    dispatch({ type: InstitutionsActionTypes.UPDATE_INSTITUTION_SUCCESS, payload: updatedInstitution })
}

const handleUpdateInstitutionFail = (dispatch: Dispatch<UpdateInstitutionFail>) => {
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
        console.log("id: " + deletedId)
        dispatch({
            type: InstitutionsActionTypes.DELETE_INSTITUTION_SUCCESS,
            payload: deletedId,
        })
        history.push('/Institutions')
    } catch (e) {
        dispatch({ type: InstitutionsActionTypes.DELETE_INSTITUTION_FAIL })
    }
}

export type INSTITUTIONS_ACTIONS =
    | GetInstitutions
    | GetInstitutionsSuccess
    | GetInstitutionsFail
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
