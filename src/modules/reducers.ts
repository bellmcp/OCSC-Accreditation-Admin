import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { loadingBarReducer } from 'react-redux-loading-bar'

import uiReducer from 'modules/ui/reducer'
import downloadReduer from 'modules/download/reducer'
import internationalReducer from 'modules/edu/international/reducer'
import faqReducer from 'modules/faq/reducer'

import searchReducer from 'modules/search/reducer'
import personLetterReducer from 'modules/personLetter/reducer'
import infoReducer from 'modules/info/reducer'

export default (history: any) =>
  combineReducers({
    router: connectRouter(history),
    loadingBar: loadingBarReducer,
    ui: uiReducer,
    faq: faqReducer,
    search: searchReducer,
    download: downloadReduer,
    international: internationalReducer,
    info: infoReducer,
    personLetter: personLetterReducer,
  })
