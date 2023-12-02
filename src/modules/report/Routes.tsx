import React from 'react'
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom'
import { isLoginAsAdmin } from 'utils/isLogin'

import Summary from './summary/components/Summary'
import Progress from './progress/components/Progress'
import Accredit from './accredit/components/Accredit'
import Usage from './usage/components/Usage'

const PATH = process.env.REACT_APP_BASE_PATH

export default function Routes() {
  const { path } = useRouteMatch()
  const isAdmin = isLoginAsAdmin()

  return (
    <Switch>
      <Route path={`${path}/summary`}>
        {isAdmin ? <Summary /> : <Redirect to={`${PATH}`} />}
      </Route>
      <Route path={`${path}/progress`}>
        {isAdmin ? <Progress /> : <Redirect to={`${PATH}`} />}
      </Route>
      <Route path={`${path}/accredit`}>
        {isAdmin ? <Accredit /> : <Redirect to={`${PATH}`} />}
      </Route>
      <Route path={`${path}/usage`}>
        {isAdmin ? <Usage /> : <Redirect to={`${PATH}`} />}
      </Route>
    </Switch>
  )
}
