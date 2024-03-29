import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { loadingBarReducer } from 'react-redux-loading-bar'

import uiReducer from 'modules/ui/reducer'
import loginReducer from 'modules/login/reducer'
import searchReducer from 'modules/search/reducer'
import personLetterReducer from 'modules/personLetter/reducer'
import infoReducer from 'modules/info/reducer'
import passwordReducer from 'modules/edit/password/reducer'
import curriculumReducer from 'modules/curriculum/reducer'
import reportReducer from 'modules/report/reducer'

export default (history: any) =>
  combineReducers({
    router: connectRouter(history),
    loadingBar: loadingBarReducer,
    login: loginReducer,
    ui: uiReducer,
    search: searchReducer,
    info: infoReducer,
    personLetter: personLetterReducer,
    password: passwordReducer,
    curriculum: curriculumReducer,
    report: reportReducer,
  })
