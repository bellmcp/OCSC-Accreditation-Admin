import {
  LOAD_COUNTRIES_REQUEST,
  LOAD_COUNTRIES_SUCCESS,
  LOAD_COUNTRIES_FAILURE,
  LOAD_RECOGNITION_INFO_REQUEST,
  LOAD_RECOGNITION_INFO_SUCCESS,
  LOAD_RECOGNITION_INFO_FAILURE,
} from './actions'

const initialState = {
  isLoading: false,
  countries: [],
  recognitionInfo: {},
}

export default function (state = initialState, action: any) {
  switch (action.type) {
    case LOAD_COUNTRIES_REQUEST:
      return { ...state, isLoading: true, countries: [] }
    case LOAD_RECOGNITION_INFO_REQUEST:
      return { ...state, recognitionInfo: {} }
    case LOAD_COUNTRIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        category: action.payload.category,
        countries: action.payload.countries,
      }
    case LOAD_RECOGNITION_INFO_SUCCESS:
      return {
        ...state,
        recognitionInfo: action.payload.recognitionInfo,
      }
    case LOAD_COUNTRIES_FAILURE:
    case LOAD_RECOGNITION_INFO_FAILURE:
      return { ...state, isLoading: false }
    default:
      return state
  }
}
