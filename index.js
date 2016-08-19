import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import Login from './modules/login';
import StepContainer from './modules/steps';
import EventList from './modules/list';
import Projects from './modules/projects';
// import AddStep from './modules/add-step';

import App from './modules/App'

const routes = <Router history={hashHistory}>
  <Route path="/" component={App}>
    <IndexRoute component={Login} />
    <Route path="/projects" component={Projects} />
    <Route path="/:ev/:id" component={StepContainer} />
    <Route path="/list" component={EventList} />
  </Route>
</Router>;

render(
  routes, document.getElementById('app')
);
