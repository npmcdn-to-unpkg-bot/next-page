import React from 'react';
import { Table } from 'react-bootstrap';
import { hashHistory } from 'react-router'
import SimpleMap from "./components/beacons-map";
import SetBeacon from "./components/beacons-setting";
import SetTime from "./components/time-setting";
import BeaconSelector from './components/beacon-selector';
import DropDownList from "./components/dropdownlist";
import constants from "../constants";

export class Step1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            AdAction: -1
        }
    }

    handleNextStep(e) {       
        if(!this.refs.title.value){
            alert('事件標題是必填欄位');
            return;
        }

        this.props.nextStep();
    }

    saveEventData(){
        const store = this.props.store;
        var s = this.refs.action;
        var selectedAction = s.getSelectedValue();

        store.event.BeaconEventName = this.refs.title.value;
        store.event.AdActionText = this.refs.content.value;
        store.event.personnel = this.refs.personnel.value;
        store.event.AdAction = selectedAction;
    }

    isValid(){
        if(!this.refs.title.value){
            alert('事件標題是必填欄位');
            return false;
        } else
            return true;
    }

    componentDidMount(){
        let {store} = this.props;

        if(store.event.AdAction){
            this.setState({AdAction:store.event.AdAction});
        }
    }

    handleAction(action){
        this.setState({AdAction:action});
    }

    render() {
        let {store} = this.props;

        return <div className="step">
            <br/>
            <div className="container step-form-container">
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-sm-12 col-md-offset-1 col-md-5 step-input-container">
                        <label htmlFor="eventTitle">請輸入事件標題</label>
                        <input type="text" ref="title" defaultValue={store.event.BeaconEventName} className="form-control" id="eventTitle" />
                    </div>
                    <div className="col-sm-12 col-md-5 step-input-container">
                        <label htmlFor="eventAction">請選擇查看訊息後需執行之動作</label>
                        <DropDownList ref="action" options={
                            [   {text:"", value:-1},
                                {text:"無動作", value:1},
                                {text:"開網頁", value:4},
                                {text:"播影音", value:6},
                                {text:"打卡", value:9},
                                {text:"看圖片", value:11},
                                {text:"更詳細", value:61}]
                        } selectedValue={store.event.AdAction} onChange={this.handleAction.bind(this)} />
                        {
                            this.state.AdAction != 1?
                            <textarea className="event-content" ref="content" defaultValue={store.event.AdActionText} id="eventContent" placeholder="請輸入文字內容" />
                            :""
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-sm-12 col-md-offset-1 col-md-5 step-input-container">
                        <label htmlFor="eventTitle">請選擇觸發事件之人員</label>
                        <input type="text" ref="personnel" defaultValue={store.event.personnel} className="form-control" id="eventTitle" />
                    </div>
                </div>
                <div className="row step-buttons">
                    <div className="col-sm-4"></div>
                    <div className="col-sm-2 text-left">
                        <button className="btn btn-primary btn-cancel" onClick={this.props.cancelStep}>取消</button>
                    </div>
                    <div className="col-sm-2 text-right">
                        <button className="btn btn-primary" onClick={this.handleNextStep.bind(this) }>下一步</button>
                    </div>
                    <div className="col-sm-4"></div>
                </div>
            </div>
        </div>
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

    saveEventData(){
        const store = this.props.store;
        let beaconIdList = this.refs.beacons.getBeaconIdList();

        store.event.BeaconIdList = beaconIdList;
    }

    isValid(){
        const store = this.props.store;
        let beaconIdList = this.refs.beacons.getBeaconIdList();
        let n = beaconIdList.split(',').filter(function(id){
            return id != '';
        }).length;

        if(n == 0) {
            alert('至少必須選擇一顆Beacon');
            return false;
        } else
            return true;
    }

    renderRow(record, index) {
        return (
            <tr key={index}>
                <td><input type="checkbox" value={record.GID} checked={record.selected} onChange={(e) => this.handleSelect(e, record, this) }></input></td>
                <td>{record.GID}</td>
                <td>{record.OID}</td>
                <td>{record.GName}</td>
                <td><button>Beacons</button></td>
            </tr>
        );
    }

    render() {
        let {store} = this.props;
        let {records} = this.state;

        return <div className="step">
            <br/>
            <BeaconSelector ref="beacons" beaconIdList={store.event.BeaconIdList} />
            <div>
                Google Map (reserved)
            </div>

            <SetBeacon ref="beacon" />

            <div className="row step-buttons">
                <div className="col-sm-4"></div>
                <div className="col-sm-2 text-left">
                    <button className="btn btn-primary btn-cancel" onClick={this.props.prevStep}>上一步</button>
                </div>
                <div className="col-sm-2 text-right">
                    <button className="btn btn-primary" onClick={this.props.nextStep}>下一步</button>
                </div>
                <div className="col-sm-4"></div>
            </div>
        </div>
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

    saveEventData(){

    }

    isValid(){
        return true;
    }

    render() {
        let {store} = this.props;

        return <div className="step">
            <br/>
            <SetTime ref="settime" date={store.event.date} />

            <div className="row step-buttons">
                <div className="col-sm-4"></div>
                <div className="col-sm-2 text-left">
                    <button className="btn btn-primary btn-cancel" onClick={this.props.prevStep}>上一步</button>
                </div>
                <div className="col-sm-2 text-right">
                    <button className="btn btn-primary" onClick={this.props.nextStep}>下一步</button>
                </div>
                <div className="col-sm-4"></div>
            </div>
        </div>
    }
}

export class Step4 extends React.Component {
    constructor(props) {
        super(props);
    }

    saveEventData(){

    }

    isValid(){
        return true;
    }

    publish() {
        this.props.publishEvent();
    }

    render() {
        let {store} = this.props;

        return <div className="step">
            <br/>
            <div className="container step-form-container">
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-sm-12 col-md-5 step-input-container">
                        <label htmlFor="eventTitle">事件名稱</label><br/>
                        {store.event.BeaconEventName}
                    </div>
                    <div className="col-sm-12 col-md-5 step-input-container">
                        <label htmlFor="eventAction">訊息內容</label><br/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-sm-12 col-md-5 step-input-container">
                        <label htmlFor="eventAction">執行動作</label><br/>
                        {constants.getKeyByValue(constants.AdActions, store.event.AdAction)}
                    </div>
                    <div className="col-sm-12 col-md-5 step-input-container">
                        <label htmlFor="eventAction">執行動作內容</label><br/>
                        {store.event.AdActionText}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-sm-12 col-md-5 step-input-container">
                        <label htmlFor="eventAction">ApplicetionID</label><br/>
                        iOS- {store.event.iOSId || "未設定"}<br/>
                        Android- {store.event.androidId || "未設定"}<br/>
                    </div>
                    <div className="col-sm-12 col-md-5 step-input-container">
                        <label htmlFor="eventAction">負責執行群組</label><br/>
                        {store.event.BeaconIdList}
                    </div>
                    <div className="col-sm-12 col-md-5 step-input-container">
                        <label htmlFor="eventAction">觸發Beacon執行之距離</label><br/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-sm-12 col-md-5 step-input-container">
                        <label htmlFor="eventAction">上架日期</label><br/>
                    </div>
                    <div className="col-sm-12 col-md-5 step-input-container">
                        <label htmlFor="eventAction">下架日期</label><br/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-sm-12 col-md-5 step-input-container">
                        <label htmlFor="eventAction">周間執行星期</label><br/>
                    </div>
                    <div className="col-sm-12 col-md-5 step-input-container">
                        <label htmlFor="eventAction">執行事件時間</label><br/>
                        {store.event.date}
                    </div>
                </div>
            </div>
            <div className="row step-buttons">
                <div className="col-sm-4"></div>
                <div className="col-sm-2 text-left">
                    <button className="btn btn-primary btn-cancel" onClick={this.props.prevStep}>上一步</button>
                </div>
                <div className="col-sm-2 text-right">
                    <button className="btn btn-primary" onClick={this.publish.bind(this) }>確認發佈</button>
                </div>
                <div className="col-sm-4"></div>
            </div>
        </div>
    }
}

export class Step5 extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let {store} = this.props;

        return <div className="step">
            <br/>
            <div>Step5</div>
            <br/>
            <button className="btn btn-primary btn-cancel" onClick={this.props.prevStep}>上一步</button>
            <button className="btn btn-primary" onClick={this.props.nextStep}>下一步</button>
        </div>
    }
}