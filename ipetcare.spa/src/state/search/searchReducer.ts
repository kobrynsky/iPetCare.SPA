import { GetSearchResponseDto, GetSearchDto } from '../../api/dto'
import { SEARCH_ACTIONS, SearchActionTypes } from './searchActions'

export interface SearchState {
  vetsResponse: GetSearchResponseDto
  ownersResponse: GetSearchResponseDto
  loading: boolean
  error: string | null
}

export const initial: SearchState = {
  vetsResponse: {} as GetSearchResponseDto,
  ownersResponse: {} as GetSearchResponseDto,
  loading: false,
  error: null,
}

export const searchReducer = (
  state: SearchState = initial,
  action: SEARCH_ACTIONS
): SearchState => {
  switch (action.type) {
    case SearchActionTypes.SEARCH_VETS:
    case SearchActionTypes.SEARCH_OWNERS:
      return { ...state, loading: true }

    case SearchActionTypes.SEARCH_VETS_SUCCESS:
      return { ...state, loading: false, vetsResponse: action.payload }

    case SearchActionTypes.SEARCH_OWNERS_SUCCESS:
      return { ...state, loading: false, ownersResponse: action.payload }

    case SearchActionTypes.SEARCH_VETS_FAIL:
    case SearchActionTypes.SEARCH_OWNERS_FAIL:
      return { ...state, loading: false, error: 'Błąd wyszukiwania' }

    default:
      return state
  }
}
