import { history } from './../../index'
import { Invitations as invitations } from '../../api'
import { ThunkAction } from 'redux-thunk'
import { Dispatch } from 'redux'
import { ThunkResult } from '../store'
import { Invitation } from './invitationsReducer'
import { toast } from 'react-toastify'
import { InvitationStatus } from '../pets/petsReducer'

export enum InvitationsActionParameters {
    SEND_PET_ACCESS_REQUEST = 'SEND_PET_ACCESS_REQUEST',
    SEND_PET_ACCESS_REQUEST_FAIL = 'SEND_PET_ACCESS_REQUEST_FAIL',
    SEND_PET_ACCESS_REQUEST_SUCCESS = 'SEND_PET_ACCESS_REQUEST_SUCCESS',
    DELETE_PET_ACCESS = 'DELETE_PET_ACCESS',
    DELETE_PET_ACCESS_SUCCESS = 'DELETE_PET_ACCESS_SUCCESS',
    DELETE_PET_ACCESS_FAIL = 'DELETE_PET_ACCESS_FAIL',
    ACCEPT_PET_ACCESS = 'ACCEPT_PET_ACCESS',
    ACCEPT_PET_ACCESS_SUCCESS = 'ACCEPT_PET_ACCESS_SUCCESS',
    ACCEPT_PET_ACCESS_FAIL = 'ACCEPT_PET_ACCESS_FAIL',
    DECLINE_PET_ACCESS = 'DECLINE_PET_ACCESS',
    DECLINE_PET_ACCESS_FAIL = 'DECLINE_PET_ACCESS_FAIL',
    DECLINE_PET_ACCESS_SUCCESS = 'DECLINE_PET_ACCESS_SUCCESS'
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

export const deletePetAccess = (petId: string, userId: string, redirect?: boolean): ThunkResult<void> => async dispatch => {
    handleDeletePetAccess(dispatch)
    try {
        await invitations.deleteAccess(petId, userId)
        deletePetAccessSuccess(dispatch)

        if (redirect)
            window.location.href = '/pets'
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
}

const deletePetAccessFail = (dispatch: Dispatch<DeletePetAccessFail>) => {
    dispatch({ type: InvitationsActionParameters.DELETE_PET_ACCESS_FAIL })
}

//acceptPetAccess
interface AcceptPetAccess {
    type: InvitationsActionParameters.ACCEPT_PET_ACCESS
}

interface AcceptPetAccessSuccess {
    type: InvitationsActionParameters.ACCEPT_PET_ACCESS_SUCCESS
}

interface AcceptPetAccessFail {
    type: InvitationsActionParameters.ACCEPT_PET_ACCESS_FAIL
}

export const acceptPetAccess = (invitationId: string): ThunkResult<void> => async dispatch => {
    handleAcceptPetAccess(dispatch)
    try {
        await invitations.accept(invitationId)
        acceptPetAccessSuccess(dispatch, invitationId)
        toast.success('Zaakceptowano dostęp do zwierzaka')
    } catch (e) {
        acceptPetAccessFail(dispatch)
    }
}


const handleAcceptPetAccess = (dispatch: Dispatch<AcceptPetAccess>) => {
    dispatch({ type: InvitationsActionParameters.ACCEPT_PET_ACCESS })
}

const acceptPetAccessSuccess = (
    dispatch: Dispatch<AcceptPetAccessSuccess>,
    invitationId: string
) => {
    dispatch({
        type: InvitationsActionParameters.ACCEPT_PET_ACCESS_SUCCESS,
        payload: invitationId
    })
}

const acceptPetAccessFail = (dispatch: Dispatch<AcceptPetAccessFail>) => {
    dispatch({ type: InvitationsActionParameters.ACCEPT_PET_ACCESS_FAIL })
}


//declinePetAccess
interface DeclinePetAccess {
    type: InvitationsActionParameters.DECLINE_PET_ACCESS
}

interface DeclinePetAccessSuccess {
    type: InvitationsActionParameters.DECLINE_PET_ACCESS_SUCCESS
}

interface DeclinePetAccessFail {
    type: InvitationsActionParameters.DECLINE_PET_ACCESS_FAIL
}

export const declinePetAccess = (invitationId: string): ThunkResult<void> => async dispatch => {
    handleDeclinePetAccess(dispatch)
    try {
        await invitations.decline(invitationId)
        declinePetAccessSuccess(dispatch)
        toast.success('Odrzucono dostęp do zwierzaka')
    } catch (e) {
        declinePetAccessFail(dispatch)
    }
}


const handleDeclinePetAccess = (dispatch: Dispatch<DeclinePetAccess>) => {
    dispatch({ type: InvitationsActionParameters.DECLINE_PET_ACCESS })
}

const declinePetAccessSuccess = (
    dispatch: Dispatch<DeclinePetAccessSuccess>,
) => {
    dispatch({
        type: InvitationsActionParameters.DECLINE_PET_ACCESS_SUCCESS,
    })
    window.location.href = '/pets'
}

const declinePetAccessFail = (dispatch: Dispatch<DeclinePetAccessFail>) => {
    dispatch({ type: InvitationsActionParameters.DECLINE_PET_ACCESS_FAIL })
}


export type INVITATIONS_ACTIONS =
    | SendPetAccessRequest
    | SendPetAccessRequestFail
    | SendPetAccessRequestSuccess
    | DeletePetAccess
    | DeletePetAccessSuccess
    | DeletePetAccessFail
    | AcceptPetAccess
    | AcceptPetAccessFail
    | AcceptPetAccessSuccess
    | DeclinePetAccess
    | DeclinePetAccessFail
    | DeclinePetAccessSuccess