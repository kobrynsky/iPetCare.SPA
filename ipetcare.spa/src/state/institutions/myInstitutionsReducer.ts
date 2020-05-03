import {
  INSTITUTIONS_ACTIONS,
  InstitutionsActionTypes,
} from './institutionsActions'

export interface Institution {
  id?: string
  name: string
  address: string
}

export interface MyInstitutionsState {
  items: Institution[]
  loading: boolean
  error: String | null
}

const initialState = {
  items: [] as Institution[],
  loading: false,
  error: null,
}

export const myInstitutionsReducer = (
  state: MyInstitutionsState = initialState,
  action: INSTITUTIONS_ACTIONS
) => {
  switch (action.type) {
    case InstitutionsActionTypes.GET_INSTITUTIONS_PER_VET:
    case InstitutionsActionTypes.SINGUP_INSTITUTION:
    case InstitutionsActionTypes.SINGOUT_INSTITUTION:
      return { ...state, loading: true }

    case InstitutionsActionTypes.GET_INSTITUTIONS_PER_VET_FAIL:
    case InstitutionsActionTypes.SINGUP_INSTITUTION_FAIL:
    case InstitutionsActionTypes.SINGOUT_INSTITUTION_FAIL:
      return { ...state, loading: false }

    case InstitutionsActionTypes.GET_INSTITUTIONS_PER_VET_SUCCESS:
      return {
        ...state,
        items: [...action.payload],
        loading: false,
      }
    case InstitutionsActionTypes.SINGUP_INSTITUTION_SUCCESS:
    case InstitutionsActionTypes.SINGOUT_INSTITUTION_SUCCESS:
      return { ...state, loading: false }
    default:
      return state
  }
}
