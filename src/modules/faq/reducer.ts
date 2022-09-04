import { LOAD_FAQ_REQUEST, LOAD_FAQ_SUCCESS, LOAD_FAQ_FAILURE } from './actions'

const initialState = {
  isLoading: false,
  faq: [],
}

export default function (state = initialState, action: any) {
  switch (action.type) {
    case LOAD_FAQ_REQUEST:
      return { ...state, isLoading: true, faq: [] }
    case LOAD_FAQ_SUCCESS:
      return { ...state, isLoading: false, faq: action.payload.faq }
    case LOAD_FAQ_FAILURE:
      return { ...state, isLoading: false }
    default:
      return state
  }
}
