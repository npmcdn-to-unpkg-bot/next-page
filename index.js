import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'

import App from './modules/App'
import { AddStep } from './modules/add-step'

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
      {/* make them children of 'App' */}
      <Route path="/:ev/:id" component={AddStep}/>
  </Router>
), document.getElementById('app'))
