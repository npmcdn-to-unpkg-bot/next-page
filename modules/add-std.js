import React from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Step1, Step2, Step3, Step4, Step5 } from './pagelayout';

export class Std1 extends React.Component {
  constructor(props) {
    super(props);
  }  
  render() {
    return (
        <Step1 t1='一般設定' t2='設定事件' back='/' prev='/' next='/std-step2'>
          <button type="button" className="btn btn-default">S1</button>
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
          <button type="button" className="btn btn-default">S2</button>        
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
          <button className='btn btn-default'>S3</button>
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
          <button className='btn btn-default'>S4</button>
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
          <button className='btn btn-default'>S5</button>
        </Step5>
    )
  }
}
