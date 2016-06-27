import React from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default React.createClass({
  render() {
    return (
        <div className="container">
          <div className="row text-center">
            <h4>定位設定</h4>
            <div>Step 01 -- 設定事件</div>
          </div>

          <hr/>
          <div className="row text-right">
            <LinkContainer to={{ pathname: '/', query: { name: 'maggie' } }}>
              <button className='btn btn-default'>取消</button>
            </LinkContainer>

            <LinkContainer to={{ pathname: '/std-step2', query: { name: 'mandy' } }}>
              <button className='btn btn-default'>下一步</button>
            </LinkContainer>
          </div>
        </div>
    )
  }
})