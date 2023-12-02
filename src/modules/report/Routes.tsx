import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'

import Summary from './summary/components/Summary'
import Progress from './progress/components/Progress'

export default function Routes() {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route path={`${path}/summary`}>
        <Summary />
      </Route>
      <Route path={`${path}/progress`}>
        <Progress />
      </Route>
      <Route path={`${path}/accredit`}>Accredit</Route>
      <Route path={`${path}/usage`}>Usage</Route>
    </Switch>
  )
}
