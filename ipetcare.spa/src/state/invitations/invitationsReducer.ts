import { INVITATIONS_ACTIONS, InvitationsActionParameters } from './invitationsActions'

export interface Invitation {
    id: string
    pet: Pet
    status?: boolean
}

interface Pet {
    id: string
    name: string
}
export interface InvitationsState {
    items: Invitation[]
    loading: boolean
    error: String | null
}

const initialState = {
    items: [] as Invitation[],
    loading: false,
    error: null,
}

export const invitationReducer = (
    state: InvitationsState = initialState,
    action: INVITATIONS_ACTIONS
) => {
    switch (action.type) {
        case InvitationsActionParameters.SEND_PET_ACCESS_REQUEST:
        case InvitationsActionParameters.DELETE_PET_ACCESS:
        case InvitationsActionParameters.ACCEPT_PET_ACCESS:
        case InvitationsActionParameters.DECLINE_PET_ACCESS:
            return { ...state, loading: true }

        case InvitationsActionParameters.SEND_PET_ACCESS_REQUEST_FAIL:
        case InvitationsActionParameters.SEND_PET_ACCESS_REQUEST_SUCCESS:
        case InvitationsActionParameters.DELETE_PET_ACCESS_FAIL:
        case InvitationsActionParameters.DELETE_PET_ACCESS_SUCCESS:
        case InvitationsActionParameters.ACCEPT_PET_ACCESS_FAIL:
        case InvitationsActionParameters.DECLINE_PET_ACCESS_FAIL:
        case InvitationsActionParameters.ACCEPT_PET_ACCESS_SUCCESS:
        case InvitationsActionParameters.DECLINE_PET_ACCESS_SUCCESS:
            return { ...state, loading: false }

        default:
            return state
    }
}
