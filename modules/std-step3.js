import React from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default React.createClass({
  render() {
    return (
        <div className="container">
          <div className="row text-center">
            <h4>一般設定</h4>
            <div>Step 03 -- 設定執行日期與時間</div>
          </div>

          <hr/>         
          <div className="row text-right">          
            <LinkContainer to={{ pathname: '/std-step2', query: { name: 'maggie' } }}>
              <button className='btn btn-default'>上一步</button>
            </LinkContainer>

            <LinkContainer to={{ pathname: '/std-step4', query: { name: 'mandy' } }}>
              <button className='btn btn-default'>下一步</button>
            </LinkContainer>          
          </div>
        </div>
    )
  }
})