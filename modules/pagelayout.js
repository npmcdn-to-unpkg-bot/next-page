import React from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export class Step1 extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        // <PageLayoutStep0 t1="一般設定" t2="Step 01 -- 設定事件" 
        <div className="container">
          <div className="row text-center">
            <div className="col-md-12">
              <h4>{this.props.t1}</h4>
              <div>Step 01 -- {this.props.t2}</div>
            </div>
          </div>
          {/* Content from caller's children: to specialize this page */}
          {this.props.children}
          <hr/>
          <div className="row text-right">
            <LinkContainer to={{ pathname: this.props.back }}>
              <button className='btn btn-default'>取消</button>
            </LinkContainer>

            <LinkContainer to={{ pathname: this.props.next }}>
              <button className='btn btn-default'>下一步</button>
            </LinkContainer>
          </div>
        </div>
    )
  }
}

export class Step2 extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <div className="container">
          <div className="row text-center">
            <div className="col-md-12">
              <h4>{this.props.t1}</h4>
              <div>Step 02 -- {this.props.t2}</div>
            </div>
          </div>
          {/* Content from caller's children: to specialize this page */}
          {this.props.children}
          <hr/>         
          <div className="row text-right">          
            <LinkContainer to={{ pathname: this.props.prev }}>
              <button className='btn btn-default'>上一步</button>
            </LinkContainer>

            <LinkContainer to={{ pathname: this.props.next }}>
              <button className='btn btn-default'>下一步</button>
            </LinkContainer>          
          </div>
        </div>
    )
  }
}

export class Step3 extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <div className="container">
          <div className="row text-center">
            <div className="col-md-12">
              <h4>{this.props.t1}</h4>
              <div>Step 03 -- {this.props.t2}</div>
            </div>
          </div>
          {/* Content from caller's children: to specialize this page */}
          {this.props.children}
          <hr/>         
          <div className="row text-right">          
            <LinkContainer to={{ pathname: this.props.prev }}>
              <button className='btn btn-default'>上一步</button>
            </LinkContainer>

            <LinkContainer to={{ pathname: this.props.next }}>
              <button className='btn btn-default'>下一步</button>
            </LinkContainer>          
          </div>
        </div>
    )
  }
}

export class Step4 extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <div className="container">
          <div className="row text-center">
            <div className="col-md-12">
              <h4>{this.props.t1}</h4>
              <div>Step 04 -- {this.props.t2}</div>
            </div>
          </div>
          {/* Content from caller's children: to specialize this page */}
          {this.props.children}
          <hr/>
          <div className="row text-right">          
            <LinkContainer to={{ pathname: this.props.prev }}>
              <button className='btn btn-default'>上一步</button>
            </LinkContainer>

            <LinkContainer to={{ pathname: this.props.next }}>
              <button className='btn btn-default'>下一步</button>
            </LinkContainer>          
          </div>
        </div>
    )
  }
}

export class Step5 extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <div className="container">
          <div className="row text-center">
            <div className="col-md-12">
              <h4>{this.props.t1}</h4>
              <div>Step 05 -- {this.props.t2}</div>
            </div>
          </div>
          {/* Content from caller's children: to specialize this page */}
          {this.props.children}
          <hr/>         
          <div className="row text-right">
            <LinkContainer to={{ pathname: this.props.back }}>
              <button className='btn btn-default'>確認</button>
            </LinkContainer>          
          </div>
        </div>
    )
  }
}
