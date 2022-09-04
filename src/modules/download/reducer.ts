import {
  LOAD_LETTERS_REQUEST,
  LOAD_LETTERS_SUCCESS,
  LOAD_LETTERS_FAILURE,
} from './actions'

const initialState = {
  isLoading: false,
  letters: [],
  category: 0,
}

export default function (state = initialState, action: any) {
  switch (action.type) {
    case LOAD_LETTERS_REQUEST:
      return { ...state, isLoading: true, letters: [] }
    case LOAD_LETTERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        category: action.payload.category,
        letters: action.payload.letters,
      }
    case LOAD_LETTERS_FAILURE:
      return { ...state, isLoading: false }
    default:
      return state
  }
}
