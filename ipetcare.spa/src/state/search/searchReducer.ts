import { GetVetsSearchResponseDto, GetVetsSearchDto } from '../../api/dto'
import { SEARCH_ACTIONS, SearchActionTypes } from './searchActions'

export interface SearchState {
  vetsResponse: GetVetsSearchResponseDto
  loading: boolean
  error: string | null
}

export const initial: SearchState = {
  vetsResponse: {} as GetVetsSearchResponseDto,
  loading: false,
  error: null,
}

export const searchReducer = (
  state: SearchState = initial,
  action: SEARCH_ACTIONS
): SearchState => {
  switch (action.type) {
    case SearchActionTypes.SEARCH_VETS:
      return { ...state, loading: true }

    case SearchActionTypes.SEARCH_VETS_SUCCESS:
      return { ...state, loading: false, vetsResponse: action.payload }

    case SearchActionTypes.SEARCH_VETS_FAIL:
      return { ...state, loading: false, error: 'Błąd wyszukiwania' }

    default:
      return state
  }
}
