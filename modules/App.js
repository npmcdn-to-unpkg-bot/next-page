import React from 'react'
import { Router, Route, hashHistory } from 'react-router'
import Home from './Home'
import { AddStep } from './add-step'

class App extends React.Component {
  render() {
      return <Router history={hashHistory}>
                <Route path="/" component={Home}/>
                <Route path="/:ev/:id" component={AddStep}/>
            </Router>;
  }
}
export default App;