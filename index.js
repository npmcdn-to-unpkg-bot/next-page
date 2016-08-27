import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import Login from './modules/login';
import StepContainer from './modules/steps';
import EventList from './modules/list';
import Projects from './modules/projects';
import Orgs from './modules/orgs';
import Maps from './modules/maps';
// import AddStep from './modules/add-step';

import App from './modules/App'

global.Array.prototype.getUnique = function () {
  var u = {}, a = [];
  for (var i = 0, l = this.length; i < l; ++i) {
    if (u.hasOwnProperty(this[i])) {
      continue;
    }
    a.push(this[i]);
    u[this[i]] = 1;
  }
  return a;
}

Date.prototype.addDays = (function (days) {
  let date = new Date(this.getTime());
  date.setDate(date.getDate() + parseInt(days));
  return date;
});

Date.prototype.addMonths = (function (months) {
  let date = new Date(this.getTime());
  date.setMonth(date.getMonth() + parseInt(months));
  return date;
});

Array.prototype.orderBy = (function (fieldName, isDescending) {
  "use strict";
  if (fieldName == '') return this;
  else return this.sort(function (a, b) {
    if (!a[fieldName]) {
      if (b[fieldName]) return isDescending ? 1 : -1;
    }
    else if (!b[fieldName]) return isDescending ? -1 : 1;

    if (a[fieldName] == b[fieldName]) return 0;
    else if (a[fieldName] < b[fieldName]) return isDescending ? 1 : -1;
    else if (a[fieldName] > b[fieldName]) return isDescending ? -1 : 1;
  });
});

Array.prototype.multiOrderBy = (function (fields) {
  //field: {fieldName,isDescending}
  "use strict";
  if (fields == []) return this;
  else {
    return this.sort(function (a, b) {
      for (var i = 0; i < fields.length; i++) {
        let field = fields[i];
        let fieldName = field.fieldName;
        let isDescending = field.isDescending;

        if (!a[fieldName]) {
          if (b[fieldName]) return isDescending ? 1 : -1;
        }
        else if (!b[fieldName]) return isDescending ? -1 : 1;

        if (a[fieldName] < b[fieldName]) return isDescending ? 1 : -1;
        else if (a[fieldName] > b[fieldName]) return isDescending ? -1 : 1;
        else if (i == fields.length - 1) return 0;
      }
    });
  }
});

const routes = <Router history={hashHistory}>
  <Route path="/" component={App}>
    <IndexRoute component={Login} />
    <Route path="/projects" component={Projects} />
    <Route path="/orgs" component={Orgs} />
    <Route path="/:ev/:id" component={StepContainer} />
    <Route path="/list" component={EventList} />
    <Route path="/maps" component={Maps} />
  </Route>
</Router>;

render(
  routes, document.getElementById('app')
);
