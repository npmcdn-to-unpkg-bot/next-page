import React from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default React.createClass({
  render() {
    return (
        <div>
          <h4>事件管理</h4>
          <div>Menu 00 -- 新增事件</div>

          <ul role="nav">
            <li><Link to="/std-step1">新增一般事件</Link></li>
            <li><Link to="/adv-step1">新增廣告事件</Link></li>
            <li><Link to="/cus-step1">新增客製化事件</Link></li>
            <li><Link to="/loc-step1">新增定位事件</Link></li>
          </ul>
        </div>
    )
  }
})