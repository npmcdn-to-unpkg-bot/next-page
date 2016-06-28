import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'

import App from './modules/App'
import { Std1, Std2, Std3, Std4, Std5 } from './modules/add-std'
import { Adv1, Adv2, Adv3, Adv4, Adv5 } from './modules/add-adv'
import { Cus1, Cus2, Cus3, Cus4, Cus5 } from './modules/add-cus'
import { Loc1, Loc2, Loc3, Loc4, Loc5 } from './modules/add-loc'

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}/>

      {/* make them children of 'App' */}
      <Route path="/std-step1" component={Std1}/>
      <Route path="/std-step2" component={Std2}/>
      <Route path="/std-step3" component={Std3}/>
      <Route path="/std-step4" component={Std4}/>
      <Route path="/std-step5" component={Std5}/>

      <Route path="/adv-step1" component={Adv1}/>
      <Route path="/adv-step2" component={Adv2}/>
      <Route path="/adv-step3" component={Adv3}/>
      <Route path="/adv-step4" component={Adv4}/>
      <Route path="/adv-step5" component={Adv5}/>

      <Route path="/cus-step1" component={Cus1}/>
      <Route path="/cus-step2" component={Cus2}/>
      <Route path="/cus-step3" component={Cus3}/>
      <Route path="/cus-step4" component={Cus4}/>
      <Route path="/cus-step5" component={Cus5}/>

      <Route path="/loc-step1" component={Loc1}/>
      <Route path="/loc-step2" component={Loc2}/>
      <Route path="/loc-step3" component={Loc3}/>
      <Route path="/loc-step4" component={Loc4}/>
      <Route path="/loc-step5" component={Loc5}/>                  

  </Router>
), document.getElementById('app'))
