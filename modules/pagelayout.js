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
              <div>
                請輸入事件標題<br/>
                <input type="text" placeholder="事件的標題"></input><br/>
                請選擇查看訊息後需執行之動作<br/>
                <select>
                  <option value="純文字">純文字</option>
                </select><br/>
                請輸入執行動作內容<br/>
                <textarea rows="8" placeholder="執行動作內容"></textarea><br/>
                請選擇Application ID<br/>
                <input type="text" placeholder="iOS App ID"></input><br/>
                <input type="text" placeholder="Android App ID"></input><br/>
                請選擇觸發事件之人員<br/>
                <input type="text" placeholder="人員"></input>
              </div>
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
