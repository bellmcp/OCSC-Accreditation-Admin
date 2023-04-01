import {
  LOAD_PROGRESS_GOVERNMENT_REQUEST,
  LOAD_PROGRESS_GOVERNMENT_SUCCESS,
  LOAD_PROGRESS_GOVERNMENT_FAILURE,
  LOAD_PROGRESS_INDIVIDUAL_REQUEST,
  LOAD_PROGRESS_INDIVIDUAL_SUCCESS,
  LOAD_PROGRESS_INDIVIDUAL_FAILURE,
  LOAD_LOCK_STATUS_REQUEST,
  LOAD_LOCK_STATUS_SUCCESS,
  LOAD_LOCK_STATUS_FAILURE,
  LOAD_WAIT_CURRICULUM_REQUEST,
  LOAD_WAIT_CURRICULUM_SUCCESS,
  LOAD_WAIT_CURRICULUM_FAILURE,
} from './actions'

const initialState = {
  isLoading: false,
  isSearching: false,
  progressGovernment: [],
  progressIndividual: [],
  isLocked: false,
  lockMessage: '',
  waitCurriculums: [],
}

export default function (state = initialState, action: any) {
  switch (action.type) {
    case LOAD_PROGRESS_GOVERNMENT_REQUEST:
      return { ...state, isLoading: true, progressGovernment: [] }
    case LOAD_PROGRESS_INDIVIDUAL_REQUEST:
      return { ...state, isLoading: true, progressIndividual: [] }
    case LOAD_LOCK_STATUS_REQUEST:
      return { ...state, isLoading: true, isLocked: false, lockMessage: '' }
    case LOAD_WAIT_CURRICULUM_REQUEST:
      return { ...state, isSearching: true, waitCurriculums: [] }
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
    case LOAD_LOCK_STATUS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLocked: action.payload.isLocked,
        lockMessage: action.payload.lockMessage,
      }
    case LOAD_WAIT_CURRICULUM_SUCCESS:
      return {
        ...state,
        isSearching: false,
        waitCurriculums: action.payload.waitCurriculums,
      }
    case LOAD_PROGRESS_GOVERNMENT_FAILURE:
    case LOAD_PROGRESS_INDIVIDUAL_FAILURE:
    case LOAD_LOCK_STATUS_FAILURE:
      return { ...state, isLoading: false }
    case LOAD_WAIT_CURRICULUM_FAILURE:
      return { ...state, isSearching: false }
    default:
      return state
  }
}
