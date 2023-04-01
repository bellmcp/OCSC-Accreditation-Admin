import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'

import CurriculumProgress from './progress/CurriculumProgress'

export default function Routes() {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route path={`${path}/progress`}>
        <CurriculumProgress />
      </Route>
    </Switch>
  )
}
