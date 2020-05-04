import { ImportantDate } from '../../api/dto'
import {
  ImportantDatesActionTypes,
  IMPORTANT_DATES_ACTIONS,
} from './importantDatesActions'

export interface ImportantDateState {
  upcomingDates: ImportantDate[]
  pastDates: ImportantDate[]
  loading: boolean
  error: String | null
}

const initialState = {
  upcomingDates: [] as ImportantDate[],
  pastDates: [] as ImportantDate[],
  loading: false,
  error: null,
}

export const importantDateReducer = (
  state: ImportantDateState = initialState,
  action: IMPORTANT_DATES_ACTIONS
) => {
  switch (action.type) {
    case ImportantDatesActionTypes.GET_IMPORTANT_DATES:
      return { ...state, loading: true }

    case ImportantDatesActionTypes.GET_IMPORTANT_DATES_FAIL:
      return { ...state, loading: false }

    case ImportantDatesActionTypes.GET_IMPORTANT_DATES_SUCCESS:
      return {
        ...state,
        upcomingDates: action.payload.upcomingDates,
        pastDates: action.payload.pastDates,
        loading: false,
      }

    default:
      return state
  }
}
