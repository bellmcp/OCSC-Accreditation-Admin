import {
  GET_PERSON_LETTER_REQUEST,
  GET_PERSON_LETTER_SUCCESS,
  GET_PERSON_LETTER_FAILURE,
  CLEAR_SEARCH_RESULT,
} from './actions'

const initialState = {
  isLoading: false,
  searchResults: [],
}

export default function (state = initialState, action: any) {
  switch (action.type) {
    case GET_PERSON_LETTER_REQUEST:
      return { ...state, isSearching: true, searchResults: [] }
    case GET_PERSON_LETTER_SUCCESS:
      return {
        ...state,
        isSearching: false,
        searchResults: action.payload.searchResults,
      }
    case GET_PERSON_LETTER_FAILURE:
      return { ...state, isSearching: false }
    case CLEAR_SEARCH_RESULT:
      return { ...state, searchResults: [] }
    default:
      return state
  }
}
