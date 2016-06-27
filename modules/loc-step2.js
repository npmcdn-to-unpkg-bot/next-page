import React from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default React.createClass({
  render() {
    return (
        <div className="container">
          <div className="row text-center">
            <h4>定位設定</h4>
            <div>Step 02 -- 設定負責群組/Beacon</div>
          </div>

          <hr/>         
          <div className="row text-right">          
            <LinkContainer to={{ pathname: '/std-step1', query: { name: 'maggie' } }}>
              <button className='btn btn-default'>上一步</button>
            </LinkContainer>

            <LinkContainer to={{ pathname: '/std-step3', query: { name: 'mandy' } }}>
              <button className='btn btn-default'>下一步</button>
            </LinkContainer>          
          </div>
        </div>
    )
  }
})