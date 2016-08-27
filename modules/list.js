import React from 'react';
import { Table } from 'react-bootstrap';
import { hashHistory } from 'react-router';
import store from './store';
import constants from '../constants';
import searchimg from '../images/search.png';
import DropDownList from './components/dropdownlist';
import SortableHeader from './components/sortheader';
import Tabs from './components/tabs';
import EventTypeSelect from './components/event-type-select';
import { Switch, FABButton, Checkbox, Icon } from 'react-mdl';
import Modal from 'react-modal';
import EventTypeButton from './components/event-type-button';
import BeaconListBox from './components/beacon-list-box';

export default class EventList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedEvents: [],
            beaconEvents: [],
            isShowSearch: false,
            searchField: '事件標題',
            searchKey: '',
            orderBy: '',
            isDescending: false,
            selectedListTab: 0,
            isShowEventTypes: false,
            selectedEvent: null
        }

        var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;

        this.topbarModalStyle = {
            overlay: {
                position: 'fixed',
                top: 56,
                left: 0,
                right: 0,
                bottom: height - 105,
                backgroundColor: 'rgba(255, 255, 255, 0.5)'
            },
            content: {
                position: 'absolute',
                top: '7px',
                left: '7px',
                right: '7px',
                bottom: '0px',
                border: 'none',
                background: 'rgba(255, 255, 255, 0.5)',
                overflow: 'auto',
                WebkitOverflowScrolling: 'touch',
                outline: 'none',
                padding: '0px'
            }
        };

        this.buttonModalStyle = {
            overlay: {
                position: 'fixed',
                top: height - 130,
                left: width - 230,
                right: 10,
                bottom: 20,
                backgroundColor: 'rgba(255, 255, 255, 0.0)'
            },
            content: {
                position: 'absolute',
                top: '7px',
                left: '7px',
                right: '7px',
                bottom: '7px',
                border: 'none',
                background: 'rgba(255, 255, 255, 0.0)',
                overflow: 'auto',
                WebkitOverflowScrolling: 'touch',
                outline: 'none',
                padding: '0px'
            }
        };

        this.eventsHandler = this.handleEvents.bind(this);
        this.eventHandler = this.handleEvent.bind(this);
    }

    handleSelect(event) {
        let selectedEvents = Array.from(this.state.selectedEvents);
        let selectedEvent = selectedEvents.find(function (ev) {
            return ev.BeaconEventId == event.BeaconEventId;
        });

        if (!selectedEvent) {
            selectedEvents.push(event);
        } else {
            let index = selectedEvents.indexOf(selectedEvent);

            if (index >= 0) selectedEvents.splice(index, 1);
        }

        this.setState({ selectedEvents: selectedEvents });
    }

    showEventTypes() {
        this.setState({ isShowEventTypes: !this.state.isShowEventTypes });
    }

    selectEventType(typeName) {
        store.eventType = typeName;
        this.setState({ isShowEventTypes: false });
        this.addEvent();
    }

    showBeacons(event) {
        this.setState({ selectedEvent: event });
    }

    hideBeacons() {
        this.setState({ selectedEvent: null });
    }

    addEvent() {
        store.event = {};

        switch (store.eventType) {
            case '廣告事件':
                store.event.Action = 60;
                break;
            case '定位事件':
                store.event.Action = 12;
                break;
            case '客製化事件':
                store.event.Action = 10;
                break;
        }

        hashHistory.push('/1/1');
    }

    deleteEvents() {
        if (confirm('確定刪除選取的事件嗎?')) {
            let project = store.getProject();

            if (project) {
                this.state.selectedEvents.map(function (event) {
                    if (event.BeaconEventId >= 0) store.deleteEvent(project.LicenseKey, event.BeaconEventId);
                });

                this.setState({ selectedEvents: [] });
            }
        }
    }

    editEvent() {
        if (this.state.selectedEvents.length == 1) {
            let event = this.state.selectedEvents[0];

            store.event = event;
            if (store.event.Action == 12)
                store.eventType = '定位事件';
            else if (store.event.Action == 10)
                store.eventType = '客製化事件';
            else
                store.eventType = '廣告事件';

            hashHistory.push('/1/1');
        }
    }

    handleEvents(res) {
        let events = res.BeaconEventList.mBeaconEventList.MyBeaconEvent;

        if (!events) events = [];
        else if (!events.length) {
            events = [events];
        }

        // this.setState({events:events, name:'hello'});
        this.setState({ beaconEvents: events });
        //console.log('events',res.BeaconEventList);
    }

    handleEvent(res) {
        let project = store.getProject();
        if (project) {
            console.log('get events', project.LicenseKey);
            store.getEvents(project.LicenseKey, 'OrderBy:BeaconEventId,SortedDesc:1');
        }
    }

    getEventType(event, isShort) {
        switch (event.Action) {
            case '12':
                return isShort ? '定' : '定位事件';
            case '10':
                return isShort ? '客' : '客製化事件';
            case '60':
                return isShort ? '廣' : '廣告事件';
            default:
                return '';
        }
    }

    showSearch() {
        this.setState({ isShowSearch: !this.state.isShowSearch });
    }

    handleFieldChange(field) {
        let searchKey = '';
        if (field == '啟動') searchKey = 999;
        this.setState({ searchField: field, searchKey: searchKey, orderBy: '' });
    }

    handleSearch(e) {
        this.setState({ searchKey: e.target.value });
    }

    handleEnableSearch(enable) {
        this.setState({ searchKey: enable });
    }

    getClassByDate(date) {
        if (!date) return '';

        let endDate = new Date(date);
        let currentDate = new Date();

        if (currentDate.addDays(1) > endDate) return 'expire';
        else if (currentDate.addDays(3) > endDate) return 'caution';
        else return '';
    }

    isExpired(date) {
        let endDate = new Date(date);
        let currentDate = new Date();

        return currentDate > endDate;
    }

    orderEvents(fieldName) {
        let isDescending = this.state.orderBy == fieldName ? !this.state.isDescending : false;

        console.log('toggel sort', fieldName);

        this.setState({ orderBy: fieldName, isDescending: isDescending });
    }

    isSorting(fieldName) {
        console.log(fieldName, this.state.orderBy, this.state.orderBy == fieldName);
        return this.state.orderBy == fieldName;
    }

    toggleEnable(event, e) {
        let enabled = e.target.checked;
        let project = store.getProject();

        if (project) {
            console.log('toggle event', event);
            store.toggleEnableEvent(project.LicenseKey, event.BeaconEventId, enabled ? 1 : 0);
        }
        //console.log('enable',e.target.checked);
    }

    switchTab(index) {
        //let isActive = (index == 0);
        this.setState({ selectedListTab: index });
    }

    componentDidMount() {
        store.addListener('EVENTS', this.eventsHandler);
        store.addListener('EVENT_DELETED', this.eventHandler);

        let project = store.getProject();
        if (project) {
            let org = store.getOrg();
            let Org = org ? org.Org : '';
            console.log('get org beacons', Org, project.LicenseKey);
            store.getEvents(project.LicenseKey, 'OrderBy:BeaconEventId,SortedDesc:1,Org:' + Org);
        }
    }

    componentWillUnmount() {
        store.removeListener('EVENTS', this.eventsHandler);
        store.removeListener('EVENT_DELETED', this.eventHandler);
    }

    render() {
        let m = this;
        let events = this.state.beaconEvents || [];
        let canAdd = this.state.selectedEvents.length == 0;
        let canEdit = this.state.selectedEvents.length == 1;
        let canDelete = this.state.selectedEvents.length > 0;
        let user = store.getUser();
        let project = store.getProject();

        console.log(project);

        if (user.mAccount == 'storeuser') user.OwnershipStr = 'store';

        return <div className="list-container">
            <BeaconListBox isOpen={this.state.selectedEvent != null} event={this.state.selectedEvent} onClose={this.hideBeacons.bind(this) } />
            <EventTypeSelect isOpen={this.state.isShowEventTypes} onChange={this.selectEventType.bind(this) } userType={project.ProjectOwnershipTag || ''} />
            <Modal isOpen style={this.buttonModalStyle}>
                <span className="command-buttons">
                    {
                        // canAdd ? <span><button className="btn btn-primary btn-larger" onClick={this.showEventTypes.bind(this) }>新增</button>&nbsp; &nbsp; </span> : ""
                        canAdd ? <span><FABButton colored onClick={this.showEventTypes.bind(this)}>
                            <Icon name="add" />
                        </FABButton>&nbsp; &nbsp; </span> : ""
                    }
                    {
                        // canDelete ? <span><button className="btn btn-primary btn-larger" onClick={this.deleteEvents.bind(this) }>刪除</button>&nbsp; &nbsp; </span> : ""
                        canDelete ? <span><FABButton colored onClick={this.deleteEvents.bind(this)}>
                            <Icon name="delete" />
                        </FABButton>&nbsp; &nbsp; </span> : ""
                    }
                    {
                        // canEdit ? <span><button className="btn btn-primary btn-larger" onClick={this.editEvent.bind(this) }>編輯</button>&nbsp; &nbsp; </span> : ""
                        canEdit ? <span><FABButton colored onClick={this.editEvent.bind(this)}>
                            <Icon name="edit" />
                        </FABButton>&nbsp; &nbsp; </span> : ""
                    }
                </span>
            </Modal>
            <Modal isOpen style={this.topbarModalStyle}>
                <div className="topbar">
                    <span className="search-box">
                        {
                            this.state.isShowSearch ? <span className="search-field">
                                <DropDownList ref="fields" options={
                                    [{ text: "啟動", value: "啟動" },
                                        { text: "事件標題", value: "事件標題" },
                                        { text: "編輯人員", value: "編輯人員" },
                                        { text: "類別", value: "類別" },
                                        { text: "執行日期", value: "執行日期" },
                                        { text: "掛載於", value: "掛載於" }
                                    ]
                                } selectedValue={this.state.searchField} onChange={this.handleFieldChange.bind(this) } />
                                &nbsp;
                                {
                                    this.state.searchField == '啟動' ? <DropDownList ref='enable' options={
                                        [
                                            { text: '全部', value: 999 },
                                            { text: '啟動', value: 1 },
                                            { text: '未啟動', value: 0 }
                                        ]
                                    } selectedValue="999" onChange={this.handleEnableSearch.bind(this) } /> : ""
                                }
                                {
                                    this.state.searchField != '啟動' ?
                                        <input className="keyword" type="text" placeholder="搜尋欄位關鍵字"
                                            defaultValue={this.state.searchKey}
                                            onChange={this.handleSearch.bind(this) }
                                            ></input> : ""
                                }
                            </span> : ""
                        }
                        <img src={searchimg} className="search-button" width="30" height="30" onClick={this.showSearch.bind(this) } />
                    </span>
                    <Tabs ref="tabs" tabNames={['上架清單', '下架清單']} selectedTab={this.state.selectedListTab} onChange={this.switchTab.bind(this) } />
                </div>
            </Modal>
            <br/>
            <br/>
            <br/>
            <Table striped responsive>
                <thead>
                    <tr>
                        <SortableHeader fieldName="Action"
                            isSorting={this.isSorting('Action') } isDescending={this.state.isDescending}
                            toggleSort={this.orderEvents.bind(this) }>
                            類別&nbsp; &nbsp;
                            <span className="float-left">
                                <Checkbox />
                            </span>
                        </SortableHeader>
                        <th>啟動</th>
                        <SortableHeader fieldName="Editor"
                            isSorting={this.isSorting('Editor') } isDescending={this.state.isDescending}
                            toggleSort={this.orderEvents.bind(this) }>編輯人員</SortableHeader>
                        <SortableHeader fieldName="BeaconEventName"
                            isSorting={this.isSorting('BeaconEventName') } isDescending={this.state.isDescending}
                            toggleSort={this.orderEvents.bind(this) }>事件標題</SortableHeader>
                        <SortableHeader fieldName="BeginDate"
                            isSorting={this.isSorting('BeginDate') } isDescending={this.state.isDescending}
                            toggleSort={this.orderEvents.bind(this) }>執行日期</SortableHeader>
                        <th>掛載於</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        events.filter(function (event, index) {
                            //上架/下架
                            return m.state.selectedListTab == 0 ? !m.isExpired(event.EndDate) : m.isExpired(event.EndDate);
                        })
                            .filter(function (event, index) {
                                //搜尋
                                switch (m.state.searchField) {
                                    case '啟動':
                                        console.log('is 啟動');
                                        return event.Enable == m.state.searchKey || m.state.searchKey == 999;
                                    case '事件標題':
                                        console.log('is 事件標題');
                                        return (event.BeaconEventName || '').indexOf(m.state.searchKey) >= 0 || m.state.searchKey == '';
                                    case '編輯人員':
                                        console.log('is 編輯人員');
                                        return (event.Editor || '').indexOf(m.state.searchKey) >= 0 || m.state.searchKey == '';
                                    case '類別':
                                        console.log('is 類別');
                                        return constants.getKeyByValue(constants.AdActions, event.AdAction).indexOf(m.state.searchKey) >= 0 || m.state.searchKey == '';
                                    case '執行日期':
                                        let executionDate = event.BeginDate + '~' + event.EndDate + event.WeekdayRule;
                                        return executionDate.indexOf(m.state.searchKey) >= 0 || m.state.searchKey == '';
                                    case '掛載於':
                                        //取得群組/Beacon名稱
                                        return true;
                                    default:
                                        console.log('is Default');
                                        return true;
                                }
                            })
                            //.orderBy(m.state.orderBy, m.state.isDescending)
                            .multiOrderBy([
                                { fieldName: 'Enable', isDescending: true },
                                { fieldName: m.state.orderBy, isDescending: m.state.isDescending }
                            ])
                            .map(function (event, index) {
                                let selected = m.state.selectedEvents.some(function (ev) {
                                    return ev.BeaconEventId == event.BeaconEventId;
                                });

                                let eventClass = m.getClassByDate(event.EndDate);
                                let enabled = event.Enable == 0 ? false : true;
                                let checkboxClass = user.mAccount == event.Editor ? '' : 'hidden';

                                return <tr key={index}>
                                    <td>
                                        <EventTypeButton ref={"select" + index.toString() }
                                            eventType={m.getEventType(event, true) } isSelected={selected}
                                            onChange={m.handleSelect.bind(m, event) } disabled={user.mAccount != event.Editor} />
                                    </td>
                                    <td><Switch defaultChecked={enabled} onClick={m.toggleEnable.bind(m, event) } disabled={user.mAccount != event.Editor}/></td>
                                    <td>{event.Editor}</td>
                                    <td className={eventClass}>{event.BeaconEventName}</td>
                                    <td className="small">{event.BeginDate} ~ <br/>
                                        {event.EndDate}<br/>
                                        {constants.getWeekDays(event.WeekdayRule) }</td>
                                    <td>
                                        <button className="btn" onClick={m.showBeacons.bind(m, event) }>詳細</button>
                                    </td>
                                </tr>
                            })
                    }
                </tbody>
            </Table>
        </div>;
    }
}