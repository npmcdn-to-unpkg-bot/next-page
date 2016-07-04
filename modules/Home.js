import React from 'react'
import { Link } from 'react-router'
import './app.scss';
import store from './store';

class Home extends React.Component {
  render() {
    store.clear();
    return (
        <div className="container">
          <div className="row tex-left">
            <div className="step-indicator">Menu -- 新增事件</div>
          </div>

          <ul role="nav">
            <li><Link to="/1/1">新增一般事件</Link></li>
            <li><Link to="/2/1">新增廣告事件</Link></li>
            <li><Link to="/4/1">新增客製化事件</Link></li>
            <li><Link to="/3/1">新增定位事件</Link></li>
          </ul>
        {/* add this */}
        {this.props.children}

      </div>
    )
  }
}
export default Home;