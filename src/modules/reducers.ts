import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { loadingBarReducer } from 'react-redux-loading-bar'

import ui from 'modules/ui/reducer'
import search from 'modules/search/reducer'
import download from 'modules/download/reducer'
import international from 'modules/edu/international/reducer'
import faq from 'modules/faq/reducer'

export default (history: any) =>
  combineReducers({
    router: connectRouter(history),
    loadingBar: loadingBarReducer,
    ui,
    faq,
    search,
    download,
    international,
  })
