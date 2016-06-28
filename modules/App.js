import React from 'react'
import { Link } from 'react-router'
import './app.scss';

class App extends React.Component {
  render() {
    return (
        <div className="container">
          <div className="row tex-left">
            <div className="step-indicator">Menu -- 新增事件</div>
          </div>

          <ul role="nav">
            <li><Link to="/std-step1">新增一般事件</Link></li>
            <li><Link to="/adv-step1">新增廣告事件</Link></li>
            <li><Link to="/cus-step1">新增客製化事件</Link></li>
            <li><Link to="/loc-step1">新增定位事件</Link></li>
          </ul>
        {/* add this */}
        {this.props.children}

      </div>
    )
  }
}
export default App;