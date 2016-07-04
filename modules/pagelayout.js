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
  handleNextStep(e) {
    const store = this.props.store;
    store.event.title = this.refs.title.value;
    store.event.content = this.refs.content.value;
    store.event.iOSId = this.refs.iOSId.value;
    store.event.androidId = this.refs.androidId.value;
    store.event.personnel = this.refs.personnel.value;
  }
  render() {
    const {store} = this.props;
    return (
      // <PageLayoutStep0 t1="一般設定" t2="Step 01 -- 設定事件" 
      <div className="container frame-step1">
        <div className="row text-left">
          <div className="col-md-12">
            <h4>{this.props.t1}</h4>
            <div>Step 01 --{this.props.t2}</div>
            <div>
              請輸入事件標題<br/>
              <input ref="title" type="text" placeholder="事件的標題" value={store.event.title}></input><br/>
              請選擇查看訊息後需執行之動作<br/>
              <select>
                <option value="純文字">純文字</option>
              </select><br/>
              請輸入執行動作內容<br/>
              <textarea ref="content" rows="8" placeholder="執行動作內容" value={store.event.content}></textarea><br/>
              請選擇Application ID<br/>
              <input ref="iOSId" type="text" placeholder="iOS App ID" value={store.event.iOSId}></input><br/>
              <input ref="androidId" type="text" placeholder="Android App ID" value={store.event.androidId}></input><br/>
              請選擇觸發事件之人員<br/>
              <input ref="personnel" type="text" placeholder="人員"></input>
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
            <button className='btn btn-default' onClick={this.handleNextStep.bind(this) }>下一步</button>
          </LinkContainer>
        </div>
      </div>
    )
  }
}

export class Step2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      records: this.props.initialRecords,
      dist: 0
    };
  }

  handleOnChange(e) {
    // this.setState({ dist: e.target.value});
  }

  handleNextStep(e) {
    const store = this.props.store;
    store.event.beacon = this.refs.beacon.getValue();
  }

  componentDidMount(e){
    const {store} = this.props;
    const groupIds = store.event.groupIds || [];
    var records = this.state.records;
    records.map(function(record){
      record.selected = false;
    });

    records.filter(function(record){
      return groupIds.includes(record.GID);
    }).map(function(record){
      record.selected = true;
    })

    this.setState({records: records});
  }

  render() {
    let {records} = this.state;
    return (
      <div className="container">
        <div className="row text-left">
          <div className="col-md-12">
            <h4>{this.props.t1}</h4>
            <div>Step 02 --{this.props.t2}</div>
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
            {records.map(this.renderRow.bind(this)) }
          </tbody>
        </Table>
        <div>
          Google Map (reserved)
        </div>

        <SetBeacon ref="beacon" />

        <hr/>
        <div className="row text-right">
          <LinkContainer to={{ pathname: this.props.prev }}>
            <button className='btn btn-default'>上一步</button>
          </LinkContainer>
          <LinkContainer to={{ pathname: this.props.next }}>
            <button className='btn btn-default' onChange={this.handleNextStep.bind(this) }>下一步</button>
          </LinkContainer>
        </div>
      </div>
    )
  }

  //選擇Beacon群組
  handleSelect(e, record, m) {
    const {store} = m.props;
    // store.event.beacon = store.event.beacon || {};
    // store.event.beacon.groupIds = store.event.beacon.groupIds || [];
    var groupId = e.target.value;
    var records = this.state.records;
    var newRecord = records.filter(function (r) {
      return r.GID == record.GID;
    })[0];

    if (newRecord == null) return;
    else {
      if (e.target.checked) {
        newRecord.selected = true;
      } else {
        newRecord.selected = false;
      }
      store.event.groupIds = Array.from(records.filter(function(r){
        return r.selected;
      }),function(_r){
        return _r.GID;
      });

      this.setState({
        records: records
      })
    }
  }

  renderRow(record, index) {
    return (
      <tr key={index}>
        <th><input type="checkbox" value={record.GID} checked={record.selected} onClick={(e) => this.handleSelect(e, record, this) }></input></th>
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
    { GID: "881", OID: "無障礙應用", GName: "中華行分(行分活動用)", lat: 44.54, lng: -78.546, selected: false },
    { GID: "882", OID: "無障礙應用", GName: "中華行分(台北信義區)", lat: 121.33, lng: 25.020, selected: false },
    { GID: "883", OID: "無障礙應用", GName: "中華行分(三峽)", lat: 121.22, lng: 24.560, selected: false },
    { GID: "1040", OID: "OurCityLove", GName: "關西服務區(盥洗室服務中心指示牌)", lat: 121.10, lng: 24.48, selected: false },
    { GID: "1046", OID: "OurCityLove", GName: "關西服務區(用餐優先席櫃台前圓桌)", lat: 121.10, lng: 24.48, selected: false },
    { GID: "1047", OID: "OurCityLove", GName: "關西服務區(噴水室路燈)", lat: 121.10, lng: 24.48, selected: false }
  ]
};

export class Step3 extends React.Component {
  constructor(props) {
    super(props);
  }

  handleNextStep(e) {
    const {store} = this.props;
    //store.event.groups = '123,457,789';
    const date = this.refs.settime.getValue();
    store.event.date = date;
  }

  render() {
    const {store} = this.props;
    return (
      <div className="container">
        <div className="row text-left">
          <div className="col-md-12">
            <h4>{this.props.t1}</h4>
            <div>Step 03 --{this.props.t2}</div>
          </div>
        </div>
        {/* Content from caller's children: to specialize this page */}
        {this.props.children}

        <SetTime ref="settime" date={store.event.date} />

        <hr/>
        <div className="row text-right">
          <LinkContainer to={{ pathname: this.props.prev }}>
            <button className='btn btn-default'>上一步</button>
          </LinkContainer>
          <LinkContainer to={{ pathname: this.props.next }}>
            <button className='btn btn-default' onClick={this.handleNextStep.bind(this) }>下一步</button>
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

  handleNextStep(e) {
    const store = this.props.store;
  }

  render() {
    const {store} = this.props;
    return (
      <div className="container">
        <div className="row text-left">
          <div className="col-md-12">
            <h4>{this.props.t1}</h4>
            <div>Step 04 --{this.props.t2}</div>
          </div>
        </div>
        事件名稱:{store.event.title}<br/>
        事件內容:{store.event.content}<br/>
        執行動作:<br/>
        執行動作內容:<br/>
        ApplicetionID<br/>
        觸發事件人員<br/>
        負責執行群組<br/>
        觸發Beacon執行之距離<br/>
        上架日期:
        下架日期:
        周間執行星期:
        執行事件時間:
        {/* Content from caller's children: to specialize this page */}
        {this.props.children}
        <hr/>
        <div className="row text-right">
          <LinkContainer to={{ pathname: this.props.prev }}>
            <button className='btn btn-default'>上一步</button>
          </LinkContainer>

          <LinkContainer to={{ pathname: this.props.next }}>
            <button className='btn btn-default' onClick={this.handleNextStep.bind(this) }>確認發佈</button>
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

  submitEvent(e) {
    const {store} = this.props;
    console.log('New Event Added', store.event);
  }

  render() {
    const {store} = this.props;
    return (
      <div className="container">
        <div className="row text-left">
          <div className="col-md-12">
            <h4>{this.props.t1}</h4>
            <div>Step 05 --{this.props.t2}</div>
          </div>
        </div>
        {/* Content from caller's children: to specialize this page */}
        {store.event.title}<br/>
        {store.event.content}<br/>
        {store.event.iOSId}<br/>
        {store.event.androidId}<br/>
        {store.event.personnel}<br/>
        {store.event.date}<br/>
        {this.props.children}
        <hr/>
        <div className="row text-right">
          <LinkContainer to={{ pathname: this.props.back }}>
            <button className='btn btn-default' onClick={this.submitEvent.bind(this) }>確認</button>
          </LinkContainer>
        </div>
      </div>
    )
  }
}
