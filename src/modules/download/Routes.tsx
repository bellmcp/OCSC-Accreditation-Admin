import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Download from './components/Download'

export default function Routes() {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route path={`${path}`}>
        <Download />
      </Route>
    </Switch>
  )
}
