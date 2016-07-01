
import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
import { Table } from 'react-bootstrap'
import './pagelayout.scss';

import SimpleMap from "./components/beacons-map";
import SetBeacon from "./components/beacons-setting";
import SetTime from "./components/time-setting";

export class Step1 extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        // <PageLayoutStep0 t1="一般設定" t2="Step 01 -- 設定事件" 
        <div className="container frame-step1">
          <div className="row text-left">
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
    this.state =  { records: this.props.initialRecords,
                    dist: 0
                  };
  }

  handleOnChange(e) {
    // this.setState({ dist: e.target.value});
  }
  render() {
    let {records} = this.state;    
    return (
        <div className="container">
          <div className="row text-left">
            <div className="col-md-12">
              <h4>{this.props.t1}</h4>
              <div>Step 02 -- {this.props.t2}</div>
            </div>
          </div>
          {/* Content from caller's children: to specialize this page */}
          {this.props.children}

          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th>#</th>
                <th>GroupID</th>
                <th>Org ID</th>
                <th>群組名稱</th>
                <th>詳情</th>
              </tr>
            </thead>
            <tbody>
              {records.map(this.renderRow)}    
            </tbody>
          </Table>
          <div>
            Google Map (reserved)
          </div>
          <SetBeacon/>

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

  renderRow(record, index) {
    return (
      <tr key={index}>
        <th>{index + 1}</th>
        <th>{record.GID}</th>
        <th>{record.OID}</th>
        <th>{record.GName}</th>
        <th><button>Beacons</button></th>
      </tr>
    );
  }  
}
Step2.defaultProps = {
  initialRecords: [
      { GID:  "881", OID: "無障礙應用",  GName: "中華行分(行分活動用)", lat:  44.54, lng: -78.546 },
      { GID:  "882", OID: "無障礙應用",  GName: "中華行分(台北信義區)", lat: 121.33, lng:  25.020 },
      { GID:  "883", OID: "無障礙應用",  GName: "中華行分(三峽)",       lat: 121.22, lng:  24.560 },
      { GID: "1040", OID: "OurCityLove", GName: "關西服務區(盥洗室服務中心指示牌)", lat: 121.10, lng:  24.48 },
      { GID: "1046", OID: "OurCityLove", GName: "關西服務區(用餐優先席櫃台前圓桌)", lat: 121.10, lng:  24.48 },
      { GID: "1047", OID: "OurCityLove", GName: "關西服務區(噴水室路燈)",           lat: 121.10, lng:  24.48 }
  ]
};

export class Step3 extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <div className="container">
          <div className="row text-left">
            <div className="col-md-12">
              <h4>{this.props.t1}</h4>
              <div>Step 03 -- {this.props.t2}</div>
            </div>
          </div>
          {/* Content from caller's children: to specialize this page */}
          {this.props.children}

          <SetTime/>

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
          <div className="row text-left">
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
              <button className='btn btn-default'>確認發佈</button>
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
          <div className="row text-left">
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
