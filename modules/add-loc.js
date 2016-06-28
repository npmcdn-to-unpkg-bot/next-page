import React from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Step1, Step2, Step3, Step4, Step5 } from './pagelayout';

export class Loc1 extends React.Component {
  constructor(props) {
    super(props);
  }  
  render() {
    return (
        <Step1 t1='定位設定' t2='設定事件' back='/' prev='/' next='/loc-step2'>
          <button type="button" className="btn btn-default">S1</button>
        </Step1>
    )
  }
}

export class Loc2 extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <Step2 t1='定位設定' t2='設定負責群組/Beacon' back='/' prev='/loc-step1' next='/loc-step3'>
          <button type="button" className="btn btn-default">S2</button>        
        </Step2>
    )
  }
}

export class Loc3 extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <Step3 t1='定位設定' t2='設定執行日期與時間' back='/' prev='/loc-step2' next='/loc-step4'>
          <button className='btn btn-default'>S3</button>
        </Step3>
    )
  }
}

export class Loc4 extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <Step4 t1='定位設定' t2='確認設定與發佈' back='/' prev='/loc-step3' next='/loc-step5'>
          <button className='btn btn-default'>S4</button>
        </Step4>
    )
  }
}

export class Loc5 extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <Step5 t1='定位設定' t2='發佈成功' back='/' prev='/loc-step4' next='/'>
          <button className='btn btn-default'>S5</button>
        </Step5>
    )
  }
}
