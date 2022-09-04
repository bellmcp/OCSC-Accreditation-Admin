import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import InternationalEdu from './international/components/InternationalEdu'

export default function Routes() {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route path={`${path}/international`}>
        <InternationalEdu />
      </Route>
    </Switch>
  )
}
