import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Faq from './components/Faq'

export default function Routes() {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route path={path}>
        <Faq />
      </Route>
    </Switch>
  )
}
