import React from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Step1, Step2, Step3, Step4, Step5 } from './pagelayout';

export class Cus1 extends React.Component {
  constructor(props) {
    super(props);
  }  
  render() {
    return (
        <Step1 t1='客製化設定' t2='設定事件' back='/' prev='/' next='/cus-step2'>
          <button type="button" className="btn btn-default">S1</button>
        </Step1>
    )
  }
}

export class Cus2 extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <Step2 t1='客製化設定' t2='設定負責群組/Beacon' back='/' prev='/cus-step1' next='/cus-step3'>
          <button type="button" className="btn btn-default">S2</button>        
        </Step2>
    )
  }
}

export class Cus3 extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <Step3 t1='客製化設定' t2='設定執行日期與時間' back='/' prev='/cus-step2' next='/cus-step4'>
          <button className='btn btn-default'>S3</button>
        </Step3>
    )
  }
}

export class Cus4 extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <Step4 t1='客製化設定' t2='確認設定與發佈' back='/' prev='/cus-step3' next='/cus-step5'>
          <button className='btn btn-default'>S4</button>
        </Step4>
    )
  }
}

export class Cus5 extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <Step5 t1='客製化設定' t2='發佈成功' back='/' prev='/cus-step4' next='/'>
          <button className='btn btn-default'>S5</button>
        </Step5>
    )
  }
}
