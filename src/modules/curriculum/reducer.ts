import {
  LOAD_PROGRESS_GOVERNMENT_REQUEST,
  LOAD_PROGRESS_GOVERNMENT_SUCCESS,
  LOAD_PROGRESS_GOVERNMENT_FAILURE,
  LOAD_PROGRESS_INDIVIDUAL_REQUEST,
  LOAD_PROGRESS_INDIVIDUAL_SUCCESS,
  LOAD_PROGRESS_INDIVIDUAL_FAILURE,
} from './actions'

const initialState = {
  isLoading: false,
  progressGovernment: [],
  progressIndividual: [],
}

export default function (state = initialState, action: any) {
  switch (action.type) {
    case LOAD_PROGRESS_GOVERNMENT_REQUEST:
      return { ...state, isLoading: true, progressGovernment: [] }
    case LOAD_PROGRESS_INDIVIDUAL_REQUEST:
      return { ...state, isLoading: true, progressIndividual: [] }
    case LOAD_PROGRESS_GOVERNMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        progressGovernment: action.payload.progressGovernment,
      }
    case LOAD_PROGRESS_INDIVIDUAL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        progressIndividual: action.payload.progressIndividual,
      }
    case LOAD_PROGRESS_GOVERNMENT_FAILURE:
    case LOAD_PROGRESS_INDIVIDUAL_FAILURE:
      return { ...state, isLoading: false }
    default:
      return state
  }
}
