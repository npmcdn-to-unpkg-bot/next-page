import React from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default React.createClass({
  render() {
    return (
        <div className="container">
          <div className="row text-center">
            <h4>定位設定</h4>
            <div>Step 05 -- 發佈成功</div>
          </div>

          <hr/>         
          <div className="row text-right">
            <LinkContainer to={{ pathname: '/', query: { name: 'mandy' } }}>
              <button className='btn btn-default'>確認</button>
            </LinkContainer>          
          </div>
        </div>
    )
  }
})