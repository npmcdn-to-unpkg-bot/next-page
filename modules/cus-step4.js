import React from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default React.createClass({
  render() {
    return (
        <div className="container">
          <div className="row text-center">
            <h4>客製化設定</h4>
            <div>Step 04 -- 確認設定與發佈</div>
          </div>

          <hr/>         
          <div className="row text-right">          
            <LinkContainer to={{ pathname: '/std-step3', query: { name: 'maggie' } }}>
              <button className='btn btn-default'>上一步</button>
            </LinkContainer>

            <LinkContainer to={{ pathname: '/std-step5', query: { name: 'mandy' } }}>
              <button className='btn btn-default'>確認發佈</button>
            </LinkContainer>          
          </div>
        </div>
    )
  }
})