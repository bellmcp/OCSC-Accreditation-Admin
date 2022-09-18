import React from 'react'
import { Route, Switch } from 'react-router-dom'

import PersonLetterRoutes from 'modules/personLetter/Routes'
import SearchRoutes from 'modules/search/Routes'
import InfoRoutes from 'modules/info/Routes'

import NotFound from './NotFound'

const PATH = process.env.REACT_APP_BASE_PATH

export default function Routes() {
  return (
    <Switch>
      <Route path={`${PATH}/search`}>
        <SearchRoutes />
      </Route>
      <Route path={`${PATH}/info`}>
        <InfoRoutes />
      </Route>
      <Route exact path={`${PATH}`}>
        <PersonLetterRoutes />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  )
}
