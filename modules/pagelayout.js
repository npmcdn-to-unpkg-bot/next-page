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
    var s = this.refs.action;
    var selectedAction = s.options[s.selectedIndex].value;

    store.event.title = this.refs.title.value;
    store.event.content = this.refs.content.value;
    store.event.iOSId = this.refs.iOSId.value;
    store.event.androidId = this.refs.androidId.value;
    store.event.personnel = this.refs.personnel.value;
    store.event.eventAction = selectedAction;
  }

  render() {
    const {store} = this.props;
    return (
      // <PageLayoutStep0 t1="一般設定" t2="Step 01 -- 設定事件" 
      <div className="container">
        <div className="row text-left">
          <div className="col-md-12">
            <h4>{this.props.t1}</h4>
            <div>Step 01 --{this.props.t2}</div>
            <div className="col-sm-12 col-md-6">
              <label htmlFor="eventTitle">請輸入事件標題</label>
              <input type="text" ref="title" defaultValue={store.event.title} className="form-control" id="eventTitle" />
            </div>
            <div className="col-sm-12 col-md-6">
              <label htmlFor="eventAction">請選擇查看訊息後需執行之動作</label>
              <select ref="action" className="form-control" id="eventAction">
                <option value="純觸發"   key="0">純觸發</option>
                <option value="純文字"   key="1">純文字</option>
                <option value="開啟網頁" key="2">開啟網頁</option>
                <option value="導航"     key="3">導航</option>
                <option value="播放影音" key="4">播放影音</option>
                <option value="轉震動模式" key="5">轉震動模式</option>
                <option value="文字轉語音" key="6">文字轉語音</option>
                <option value="打卡" key="7">打卡</option>
                <option value="打開圖片" key="8">打開圖片</option>
              </select>
            </div>
            <div className="col-sm-12 col-md-6">
              <label htmlFor="eventContent">請輸入事件訊息內文</label><br/>
              <textarea className="eventContent" ref="content" defaultValue={store.event.content} id="eventContent" />
            </div>
            <div className="col-sm-12 col-md-6">
              <label htmlFor="eventApp">請選擇Application ID</label>
              <input type="text" ref="iOSId" defaultValue={store.event.iOSId} className="form-control" id="eventApp" placeholder="iOS ID" />
              <input type="text" ref="androidId" defaultValue={store.event.androidId} className="form-control" id="eventApp" placeholder="Android ID" />
              <label htmlFor="eventTitle">請選擇觸發事件之人員</label>
              <input type="text" ref="personnel" defaultValue={store.event.personnel} className="form-control" id="eventTitle" />
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

  componentDidMount(e) {
    const {store} = this.props;
    const groupIds = store.event.groupIds || [];
    var records = this.state.records;
    records.map(function (record) {
      record.selected = false;
    });

    records.filter(function (record) {
      return groupIds.includes(record.GID);
    }).map(function (record) {
      record.selected = true;
    })

    this.setState({ records: records });
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
            <button className='btn btn-default' onClick={this.handleNextStep.bind(this) }>下一步</button>
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
      store.event.groupIds = Array.from(records.filter(function (r) {
        return r.selected;
      }), function (_r) {
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
        <th><input type="checkbox" value={record.GID} checked={record.selected} onChange={(e) => this.handleSelect(e, record, this) }></input></th>
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
    const distances = ["近(<2M)","中(<4M)","遠(<6M)","超級遠(廣播模式)"];
    return (
      <div className="container">
        <div className="row text-left">
          <div className="col-md-12">
            <h4>{this.props.t1}</h4>
            <div>Step 04 --{this.props.t2}</div>
            <div className="col-sm-12 col-md-6">
              <label htmlFor="eventTitle">事件名稱</label><br/>
              {store.event.title}
            </div>
            <div className="col-sm-12 col-md-6">
              <label htmlFor="eventAction">訊息內容</label><br/>
              {store.event.content}
            </div>
            <div className="col-sm-12 col-md-6">
              <label htmlFor="eventAction">執行動作</label><br/>
              {store.event.eventAction}
            </div>
            <div className="col-sm-12 col-md-6">
              <label htmlFor="eventAction">執行動作內容</label><br/>
            </div>
            <div className="col-sm-12 col-md-6">
              <label htmlFor="eventAction">ApplicetionID</label><br/>
              iOS- {store.event.iOSId || "未設定"}<br/>
              Android- {store.event.androidId || "未設定"}<br/>
            </div>
            <div className="col-sm-12 col-md-6">
              <label htmlFor="eventAction">負責執行群組</label><br/>
              {store.event.groupIds}
            </div>
            <div className="col-sm-12 col-md-6">
              <label htmlFor="eventAction">觸發Beacon執行之距離</label><br/>
              {store.event.beacon.type} {store.event.beacon.type == "停留"?store.event.beacon.stay + "秒":""} - 距離{distances[store.event.beacon.distance]}
            </div>
            <div className="col-sm-12 col-md-6">
              <label htmlFor="eventAction">上架日期</label><br/>
            </div>
            <div className="col-sm-12 col-md-6">
              <label htmlFor="eventAction">下架日期</label><br/>
            </div>
            <div className="col-sm-12 col-md-6">
              <label htmlFor="eventAction">周間執行星期</label><br/>
            </div>
            <div className="col-sm-12 col-md-6">
              <label htmlFor="eventAction">執行事件時間</label><br/>
              {store.event.date}
            </div>
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
