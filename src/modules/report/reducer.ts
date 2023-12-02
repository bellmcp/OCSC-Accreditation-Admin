import {
  GET_SUMMARY_REPORT_REQUEST,
  GET_SUMMARY_REPORT_SUCCESS,
  GET_SUMMARY_REPORT_FAILURE,
  GET_PROGRESS_REPORT_REQUEST,
  GET_PROGRESS_REPORT_SUCCESS,
  GET_PROGRESS_REPORT_FAILURE,
  GET_ACCREDIT_REPORT_REQUEST,
  GET_ACCREDIT_REPORT_SUCCESS,
  GET_ACCREDIT_REPORT_FAILURE,
  GET_USAGE_REPORT_REQUEST,
  GET_USAGE_REPORT_SUCCESS,
  GET_USAGE_REPORT_FAILURE,
  CLEAR_SEARCH_RESULT,
} from './actions'

const initialState = {
  isSearching: false,
  searchResults: [],
}

export default function (state = initialState, action: any) {
  switch (action.type) {
    case GET_SUMMARY_REPORT_REQUEST:
      return { ...state, isSearching: true, searchResults: [] }
    case GET_SUMMARY_REPORT_SUCCESS:
      return {
        ...state,
        isSearching: false,
        searchResults: action.payload.searchResults,
      }
    case GET_SUMMARY_REPORT_FAILURE:
      return { ...state, isSearching: false }
    case GET_PROGRESS_REPORT_REQUEST:
      return { ...state, isSearching: true, searchResults: [] }
    case GET_PROGRESS_REPORT_SUCCESS:
      return {
        ...state,
        isSearching: false,
        searchResults: action.payload.searchResults,
      }
    case GET_PROGRESS_REPORT_FAILURE:
      return { ...state, isSearching: false }
    case GET_ACCREDIT_REPORT_REQUEST:
      return { ...state, isSearching: true, searchResults: [] }
    case GET_ACCREDIT_REPORT_SUCCESS:
      return {
        ...state,
        isSearching: false,
        searchResults: action.payload.searchResults,
      }
    case GET_ACCREDIT_REPORT_FAILURE:
      return { ...state, isSearching: false }
    case GET_USAGE_REPORT_REQUEST:
      return { ...state, isSearching: true, searchResults: [] }
    case GET_USAGE_REPORT_SUCCESS:
      return {
        ...state,
        isSearching: false,
        searchResults: action.payload.searchResults,
      }
    case GET_USAGE_REPORT_FAILURE:
      return { ...state, isSearching: false }
    case CLEAR_SEARCH_RESULT:
      return { ...state, searchResults: [] }
    default:
      return state
  }
}
