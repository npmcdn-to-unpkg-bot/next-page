import React from 'react';
import { Table } from 'react-bootstrap';
import { hashHistory } from 'react-router'
import SimpleMap from "./components/beacons-map";
import SetBeacon from "./components/beacons-setting";
import SetTime from "./components/time-setting";
import BeaconSelector from './components/beacon-selector';
import DropDownList from "./components/dropdownlist";
import MultiSelect from "./components/multi-select";
import constants from "../constants";
import getInputFormatDate from '../lib/utils';

export class Step1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            AdAction: -1
        }
    }

    // handleNextStep(e) {
    //     if (!this.refs.title.value) {
    //         alert('事件標題是必填欄位');
    //         return;
    //     }

    //     this.props.nextStep();
    // }

    saveEventData() {
        const store = this.props.store;
        var s = this.refs.action;
        var selectedAction = s.getSelectedValue();

        if (store.eventType != '定位事件') {
            store.event.BeaconEventName = this.refs.title.value;
            store.event.Title = this.refs.title.value;
        } else {
            store.event.BeaconEventName = '';
            store.event.Title = '';
        }

        let contenttext = '';
        if (this.refs.content) contenttext = encodeURI(this.refs.content.value);

        if (this.refs.actiontext) {
            let actiontext = encodeURI(this.refs.actiontext.value);

            switch (store.eventType) {
                case '廣告事件':
                    store.event.AdAction = selectedAction;
                    store.event.AdActionText = actiontext;
                    store.event.Text2 = contenttext;
                    break;
                case '定位事件':
                    store.event.UserDefinedData = actiontext;
                    break;
                case '客製化事件':
                    store.event.UserDefinedData = actiontext;
                    store.event.TargetContent = contenttext;
                    break;
            }
        }

        store.event.People = this.refs.personnel.value;
    }

    isValid() {
        let {store} = this.props;

        if (!this.refs.title.value && store.eventType != '定位事件') {
            alert('事件標題是必填欄位');
            return false;
        } else
            return true;
    }

    componentDidMount() {
        let {store} = this.props;

        if (store.event.AdAction) {
            this.setState({ AdAction: store.event.AdAction });
        }
    }

    handleAction(action) {
        this.setState({ AdAction: action });
    }

    render() {
        let {store} = this.props;
        let actiontext = '';
        let contenttext = '';

        switch (store.eventType) {
            case '廣告事件':
                actiontext = decodeURI(store.event.AdActionText || '');
                contenttext = decodeURI(store.event.Text2 || '');
                break;
            case '定位事件':
                actiontext = decodeURI(store.event.UserDefinedData || '');
                break;
            case '客製化事件':
                actiontext = decodeURI(store.event.UserDefinedData || '');
                contenttext = decodeURI(store.event.TargetContent || '');
                break;
        }

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
                        {
                            store.eventType == '廣告事件' ? <DropDownList ref="action" options={
                                [{ text: "", value: -1 },
                                    { text: "無動作", value: 1 },
                                    { text: "開網頁", value: 4 },
                                    { text: "播影音", value: 6 },
                                    { text: "打卡", value: 9 },
                                    { text: "看圖片", value: 11 },
                                    { text: "更詳細", value: 61 }]
                            } selectedValue={store.event.AdAction} onChange={this.handleAction.bind(this) } /> : ""
                        }
                        {
                            store.eventType == '定位事件' ? <DropDownList ref="action" options={
                                [
                                    { text: "定位事件", value: -1 }
                                ]
                            } selectedValue={store.event.AdAction} onChange={this.handleAction.bind(this) } /> : ""
                        }
                        {
                            store.eventType == '客製化事件' ? <DropDownList ref="action" options={
                                [{ text: "客製化事件", value: -1 }]
                            } selectedValue={store.event.AdAction} onChange={this.handleAction.bind(this) } /> : ""
                        }
                        {
                            this.state.AdAction != 1 ?
                                <textarea className="event-content" ref="actiontext" defaultValue={actiontext} id="actionText" placeholder="請輸執行動作內容" />
                                : ""
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-1"></div>
                    {
                        store.eventType != '定位事件' ? <div className="col-sm-12 col-md-offset-1 col-md-5 step-input-container">
                            <label htmlFor="eventContent">請輸入訊息內文</label>
                            <input type="text" ref="content" defaultValue={contenttext} className="form-control" id="eventTitle" />
                        </div> : ""
                    }
                    <div className="col-sm-12 col-md-5 step-input-container">
                        <label htmlFor="eventTitle">請選擇觸發事件之人員</label>
                        <input type="text" ref="personnel" defaultValue={store.event.People} className="form-control" id="eventTitle" />
                    </div>
                </div>
                <div className="row step-buttons">
                    <div className="col-sm-4"></div>
                    <div className="col-sm-4 text-left">
                        <span className="float-left btn-container">
                            <button className="btn btn-primary btn-cancel btn-block" onClick={this.props.cancelStep}>取消</button>
                        </span>
                        <span className="float-right btn-container">
                            <button className="btn btn-primary btn-block" onClick={this.props.nextStep}>下一步</button>
                        </span>
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

    saveEventData() {
        const store = this.props.store;
        let beaconIdList = this.refs.beacons.getBeaconIdList();
        let beaconGroupIdList = this.refs.beacons.getBeaconGroupIdList();

        console.log('beaconIdList', beaconIdList);

        store.event.BeaconIdList = beaconIdList;
        store.event.BeaconGroupIdList = beaconGroupIdList;
    }

    isValid() {
        const store = this.props.store;
        let beaconIdList = this.refs.beacons.getBeaconIdList();
        let n = beaconIdList.split(',').filter(function (id) {
            return id != '';
        }).length;

        let beaconGroupIdList = this.refs.beacons.getBeaconGroupIdList();
        let m = beaconGroupIdList.split(',').filter(function (id) {
            return id != '';
        }).length;

        if (n == 0 && m == 0) {
            alert('至少必須選擇一顆Beacon或一個群組');
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
            <div className="container step-form-container">
                <BeaconSelector ref="beacons" beaconIdList={store.event.BeaconIdList} beaconGroupIdList={store.event.BeaconGroupIdList} />
                <div>
                    Google Map (reserved)
                </div>

                <SetBeacon ref="beacon" />

                <div className="row step-buttons">
                    <div className="col-sm-4"></div>
                    <div className="col-sm-4 text-left">
                        <span className="float-left btn-container">
                            <button className="btn btn-primary btn-cancel" onClick={this.props.prevStep}>上一步</button>
                        </span>
                        <span className="float-right btn-container">
                            <button className="btn btn-primary" onClick={this.props.nextStep}>下一步</button>
                        </span>
                    </div>
                    <div className="col-sm-4"></div>
                </div>
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

    saveEventData() {
        const store = this.props.store;
        let beginDate = this.refs.beginDate.value;
        let endDate = this.refs.endDate.value;
        let weekDayRule = constants.toWeekDayRule(this.refs.weekDays.getSelectedValues());

        store.event.BeginDate = beginDate;
        store.event.EndDate = endDate;
        store.event.WeekdayRule = weekDayRule;
    }

    isValid() {
        return true;
    }

    render() {
        let {store} = this.props;

        if (!store.event.BeginDate) {
            store.event.BeginDate = new Date().toLocaleDateString();
        }

        if (!store.event.EndDate) {
            store.event.EndDate = new Date(store.event.BeginDate).addMonths(1).toLocaleDateString();
        }

        if (!store.event.WeekdayRule)
            store.event.WeekdayRule = 127;

        return <div className="step">
            <br/>
            <div className="container step-form-container">
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-sm-12 col-md-offset-1 col-md-5 step-input-container">
                        <label htmlFor="setTime">請輸入事件上架與下架之日期</label><br/>
                        上架日期&nbsp; <input ref="beginDate" type="date" defaultValue={getInputFormatDate(store.event.BeginDate) }
                            placeholder="選擇日期" />
                        下架日期&nbsp; <input ref="endDate" type="date" defaultValue={getInputFormatDate(store.event.EndDate) }
                            placeholder="選擇日期"/>
                    </div>
                    <div className="col-sm-12 col-md-5 step-input-container">
                        <label>請輸入周間執行星期</label><br/>
                        <MultiSelect ref="weekDays" options={
                            constants.WeekDays.map(function (w) {
                                return { text: w, value: w }
                            })
                        } selectedValues={constants.getWeekDays(store.event.WeekdayRule).split(',') } />
                    </div>
                </div>

                <div className="row step-buttons">
                    <div className="col-sm-4"></div>
                    <div className="col-sm-4 text-left">
                        <span className="float-left btn-container">
                            <button className="btn btn-primary btn-cancel" onClick={this.props.prevStep}>上一步</button>
                        </span>
                        <span className="float-right btn-container">
                            <button className="btn btn-primary" onClick={this.props.nextStep}>下一步</button>
                        </span>
                    </div>
                    <div className="col-sm-4"></div>
                </div>
            </div>
        </div>
    }
}

export class Step4 extends React.Component {
    constructor(props) {
        super(props);
    }

    saveEventData() {

    }

    isValid() {
        return true;
    }

    publish() {
        this.props.publishEvent();
    }

    render() {
        let {store} = this.props;
        let actiontext = '';
        let contenttext = '';

        if (!store.event.BeginDate) {
            store.event.BeginDate = new Date().toLocaleDateString();
        }

        if (!store.event.EndDate) {
            store.event.EndDate = new Date(store.event.BeginDate).addMonths(1).toLocaleDateString();
        }

        if (!store.event.WeekdayRule)
            store.event.WeekdayRule = 127;

        switch (store.eventType) {
            case '廣告事件':
                actiontext = decodeURI(store.event.AdActionText || '');
                contenttext = decodeURI(store.event.Text2 || '');
                break;
            case '定位事件':
                actiontext = decodeURI(store.event.UserDefinedData || '');
                break;
            case '客製化事件':
                actiontext = decodeURI(store.event.UserDefinedData || '');
                contenttext = decodeURI(store.event.TargetContent || '');
                break;
        }

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
                        {contenttext}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-sm-12 col-md-5 step-input-container">
                        <label htmlFor="eventAction">執行動作</label><br/>
                        {
                            store.eventType == '廣告事件' ? constants.getKeyByValue(constants.AdActions, store.event.AdAction) : store.eventType
                        }
                    </div>
                    <div className="col-sm-12 col-md-5 step-input-container">
                        <label htmlFor="eventAction">執行動作內容</label><br/>
                        {actiontext}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-sm-12 col-md-5 step-input-container">
                        <label htmlFor="eventAction">負責執行群組</label><br/>
                        Beacons: {store.event.BeaconIdList}<br/>
                        群組: {store.event.BeaconGroupIdList}
                    </div>
                    <div className="col-sm-12 col-md-5 step-input-container">
                        <label htmlFor="eventAction">觸發Beacon執行之距離</label><br/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-sm-12 col-md-5 step-input-container">
                        <label htmlFor="eventAction">上架日期</label>&nbsp;
                        {store.event.BeginDate}&nbsp;
                        <label htmlFor="eventAction">下架日期</label>&nbsp;
                        {store.event.EndDate}
                        <br/>
                        <label htmlFor="eventAction">周間執行星期</label>&nbsp;
                        {constants.getWeekDays(store.event.WeekdayRule) }
                    </div>
                    <div className="col-sm-12 col-md-5 step-input-container">
                        <label htmlFor="eventAction">執行事件時間</label><br/>
                        {store.event.date}
                    </div>
                </div>
            </div>
            <div className="row step-buttons">
                <div className="col-sm-4"></div>
                <div className="col-sm-4 text-left">
                    <span className="float-left btn-container">
                        <button className="btn btn-primary btn-cancel" onClick={this.props.prevStep}>上一步</button>
                    </span>
                    <span className="float-right btn-container">
                        <button className="btn btn-primary" onClick={this.publish.bind(this) }>確認發佈</button>
                    </span>
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