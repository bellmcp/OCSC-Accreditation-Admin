import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from 'modules/routes/PrivateRoute'

import Login from 'modules/login/components/Login'
import PersonLetterRoutes from 'modules/personLetter/Routes'
import SearchRoutes from 'modules/search/Routes'
import InfoRoutes from 'modules/info/Routes'

import NotFound from './NotFound'

const PATH = process.env.REACT_APP_BASE_PATH

export default function Routes() {
  return (
    <Switch>
      <Route exact path={`${PATH}/login`}>
        <Login />
      </Route>
      <PrivateRoute path={`${PATH}/search`} component={SearchRoutes} />
      <PrivateRoute path={`${PATH}/info`} component={InfoRoutes} />
      <PrivateRoute exact path={`${PATH}`} component={PersonLetterRoutes} />
      <Route>
        <NotFound />
      </Route>
    </Switch>
  )
}
