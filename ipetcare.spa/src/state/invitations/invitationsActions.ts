import { history } from './../../index'
import { Invitations as invitations } from '../../api'
import { ThunkAction } from 'redux-thunk'
import { Dispatch } from 'redux'
import { ThunkResult } from '../store'
import { Invitation } from './invitationsReducer'
import { toast } from 'react-toastify'

export enum InvitationsActionParameters {
    SEND_PET_ACCESS_REQUEST = 'SEND_PET_ACCESS_REQUEST',
    SEND_PET_ACCESS_REQUEST_FAIL = 'SEND_PET_ACCESS_REQUEST_FAIL',
    SEND_PET_ACCESS_REQUEST_SUCCESS = 'SEND_PET_ACCESS_REQUEST_SUCCESS',
    DELETE_PET_ACCESS = 'DELETE_PET_ACCESS',
    DELETE_PET_ACCESS_SUCCESS = 'DELETE_PET_ACCESS_SUCCESS',
    DELETE_PET_ACCESS_FAIL = 'DELETE_PET_ACCESS_FAIL'

}

// sendPetAccessRequest
interface SendPetAccessRequest {
    type: InvitationsActionParameters.SEND_PET_ACCESS_REQUEST
}

interface SendPetAccessRequestSuccess {
    type: InvitationsActionParameters.SEND_PET_ACCESS_REQUEST_SUCCESS
}

interface SendPetAccessRequestFail {
    type: InvitationsActionParameters.SEND_PET_ACCESS_REQUEST_FAIL
}

export const sendPetAccessRequest = (
    petId: string
): ThunkResult<void> => async dispatch => {
    handleSendPetAccessRequest(dispatch)
    try {
        await invitations.create(petId)
        sendPetAccessRequestSuccess(dispatch)
        toast.success('Wysłano zaproszenie o dostęp do zwierzaka')
    } catch (e) {
        sendPetAccessRequestFail(dispatch)
    }
}

const handleSendPetAccessRequest = (dispatch: Dispatch<SendPetAccessRequest>) => {
    dispatch({ type: InvitationsActionParameters.SEND_PET_ACCESS_REQUEST })
}

const sendPetAccessRequestSuccess = (
    dispatch: Dispatch<SendPetAccessRequestSuccess>,
) => {
    dispatch({
        type: InvitationsActionParameters.SEND_PET_ACCESS_REQUEST_SUCCESS,
    })
    window.location.href = '/pets'
}

const sendPetAccessRequestFail = (dispatch: Dispatch<SendPetAccessRequestFail>) => {
    dispatch({ type: InvitationsActionParameters.SEND_PET_ACCESS_REQUEST_FAIL })
}


//deletePetAccess
interface DeletePetAccess {
    type: InvitationsActionParameters.DELETE_PET_ACCESS
}

interface DeletePetAccessSuccess {
    type: InvitationsActionParameters.DELETE_PET_ACCESS_SUCCESS
}

interface DeletePetAccessFail {
    type: InvitationsActionParameters.DELETE_PET_ACCESS_FAIL
}

export const deletePetAccess = (petId: string, userId: string): ThunkResult<void> => async dispatch => {
    handleDeletePetAccess(dispatch)
    try {
        await invitations.deleteAccess(petId, userId)
        deletePetAccessSuccess(dispatch)
        toast.success('Usunięto dostęp do zwierzaka')
    } catch (e) {
        deletePetAccessFail(dispatch)
    }
}


const handleDeletePetAccess = (dispatch: Dispatch<DeletePetAccess>) => {
    dispatch({ type: InvitationsActionParameters.DELETE_PET_ACCESS })
}

const deletePetAccessSuccess = (
    dispatch: Dispatch<DeletePetAccessSuccess>,
) => {
    dispatch({
        type: InvitationsActionParameters.DELETE_PET_ACCESS_SUCCESS,
    })
    window.location.href = '/pets'
}

const deletePetAccessFail = (dispatch: Dispatch<DeletePetAccessFail>) => {
    dispatch({ type: InvitationsActionParameters.DELETE_PET_ACCESS_FAIL })
}


export type INVITATIONS_ACTIONS =
    | SendPetAccessRequest
    | SendPetAccessRequestFail
    | SendPetAccessRequestSuccess
    | DeletePetAccess
    | DeletePetAccessSuccess
    | DeletePetAccessFail