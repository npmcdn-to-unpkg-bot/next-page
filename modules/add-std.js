import React from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Step1, Step2, Step3, Step4, Step5 } from './pagelayout';
import './add.scss';


export class Std1 extends React.Component {
  constructor(props) {
    super(props);

  }  
  render() {
    return (
        <Step1 t1='一般設定' t2='設定事件' back='/' prev='/' next='/std-step2'>
        <div name="standard-step1" className="row text-left">
          <div className="col-sm-12 col-md-6">
            <label htmlFor="eventTitle">請輸入事件標題</label>
            <input type="text" className="form-control" id="eventTitle" />
          </div>
          <div className="col-sm-12 col-md-6">
            <label htmlFor="eventAction">請選擇查看訊息後需執行之動作</label>
            <select className="form-control" id="eventAction">
              <option value="純觸發"   key="0">純觸發</option>
              <option value="純文字"   key="1">純文字</option>
              <option value="開啟網頁" key="2">開啟網頁</option>
              <option value="導航"     key="3">導航</option>
              <option value="播放影音" key="4">播放影音</option>
            </select>
          </div>
          <div className="col-sm-12 col-md-6">      
            <label htmlFor="eventContent">請輸入事件訊息內文</label><br/>
            <textarea className="eventContent" id="eventContent" />
          </div>
          <div className="col-sm-12 col-md-6">
            <label htmlFor="eventApp">請選擇Application ID</label>
            <input type="text" className="form-control" id="eventApp" />
            <input type="text" className="form-control" id="eventApp" />
            <label htmlFor="eventTitle">請選擇觸發事件之人員</label>
            <input type="text" className="form-control" id="eventTitle" />                                                
          </div>
        </div>
        </Step1>
    )
  }
}


export class Std2 extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <Step2 t1='一般設定' t2='設定負責群組/Beacon' back='/' prev='/std-step1' next='/std-step3'>
        </Step2>
    )
  } 
}

export class Std3 extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <Step3 t1='一般設定' t2='設定執行日期與時間' back='/' prev='/std-step2' next='/std-step4'>
        </Step3>
    )
  }
}

export class Std4 extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <Step4 t1='一般設定' t2='確認設定與發佈' back='/' prev='/std-step3' next='/std-step5'>
        </Step4>
    )
  }
}

export class Std5 extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <Step5 t1='一般設定' t2='發佈成功' back='/' prev='/std-step4' next='/'>
        </Step5>
    )
  }
}
