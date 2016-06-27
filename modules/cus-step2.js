import React from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default React.createClass({
  render() {
    return (
        <div>
          <div>Step2</div>
          
          <hr/>         
          <LinkContainer to={{ pathname: '/std-step1', query: { name: 'maggie' } }}>
            <button className='btn btn-default'>上一步</button>
          </LinkContainer>

          <LinkContainer to={{ pathname: '/std-step3', query: { name: 'mandy' } }}>
            <button className='btn btn-default'>下一步</button>
          </LinkContainer>          
        </div>
    )
  }
})