import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'

import App from './modules/App'
import Std_Step1 from './modules/std-step1'
import Std_Step2 from './modules/std-step2'
import Std_Step3 from './modules/std-step3'
import Std_Step4 from './modules/std-step4'
import Std_Step5 from './modules/std-step5'

import Adv_Step1 from './modules/adv-step1'
import Adv_Step2 from './modules/adv-step2'
import Adv_Step3 from './modules/adv-step3'
import Adv_Step4 from './modules/adv-step4'
import Adv_Step5 from './modules/adv-step5'

import Cus_Step1 from './modules/cus-step1'
import Cus_Step2 from './modules/cus-step2'
import Cus_Step3 from './modules/cus-step3'
import Cus_Step4 from './modules/cus-step4'
import Cus_Step5 from './modules/cus-step5'

import Loc_Step1 from './modules/loc-step1'
import Loc_Step2 from './modules/loc-step2'
import Loc_Step3 from './modules/loc-step3'
import Loc_Step4 from './modules/loc-step4'
import Loc_Step5 from './modules/loc-step5'

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}/>

      {/* make them children of 'App' */}
      <Route path="/std-step1" component={Std_Step1}/>
      <Route path="/std-step2" component={Std_Step2}/>
      <Route path="/std-step3" component={Std_Step3}/>
      <Route path="/std-step4" component={Std_Step4}/>
      <Route path="/std-step5" component={Std_Step5}/>

      <Route path="/adv-step1" component={Adv_Step1}/>
      <Route path="/adv-step2" component={Adv_Step2}/>
      <Route path="/adv-step3" component={Adv_Step3}/>
      <Route path="/adv-step4" component={Adv_Step4}/>
      <Route path="/adv-step5" component={Adv_Step5}/>

      <Route path="/cus-step1" component={Cus_Step1}/>
      <Route path="/cus-step2" component={Cus_Step2}/>
      <Route path="/cus-step3" component={Cus_Step3}/>
      <Route path="/cus-step4" component={Cus_Step4}/>
      <Route path="/cus-step5" component={Cus_Step5}/>

      <Route path="/loc-step1" component={Loc_Step1}/>
      <Route path="/loc-step2" component={Loc_Step2}/>
      <Route path="/loc-step3" component={Loc_Step3}/>
      <Route path="/loc-step4" component={Loc_Step4}/>
      <Route path="/loc-step5" component={Loc_Step5}/>                  

  </Router>
), document.getElementById('app'))
