import React from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Step1, Step2, Step3, Step4, Step5 } from './pagelayout';

export class Adv1 extends React.Component {
  constructor(props) {
    super(props);
  }  
  render() {
    return (
        <Step1 t1='廣告設定' t2='設定事件' back='/' prev='/' next='/adv-step2'>
          <button type="button" className="btn btn-default">S1</button>
        </Step1>
    )
  }
}

export class Adv2 extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <Step2 t1='廣告設定' t2='設定負責群組/Beacon' back='/' prev='/adv-step1' next='/adv-step3'>
        </Step2>
    )
  }
}

export class Adv3 extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <Step3 t1='廣告設定' t2='設定執行日期與時間' back='/' prev='/adv-step2' next='/adv-step4'>
          <button className='btn btn-default'>S3</button>
        </Step3>
    )
  }
}

export class Adv4 extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <Step4 t1='廣告設定' t2='確認設定與發佈' back='/' prev='/adv-step3' next='/adv-step5'>
          <button className='btn btn-default'>S4</button>
        </Step4>
    )
  }
}

export class Adv5 extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <Step5 t1='廣告設定' t2='發佈成功' back='/' prev='/adv-step4' next='/'>
          <button className='btn btn-default'>S5</button>
        </Step5>
    )
  }
}