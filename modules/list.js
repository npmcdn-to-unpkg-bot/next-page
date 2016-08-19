import React from 'react';
import { Table } from 'react-bootstrap';
import { hashHistory } from 'react-router';
import store from './store';
import constants from '../constants';

export default class EventList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedEvents: [],
            beaconEvents: [],
        }

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

    addEvent(){
        store.event = {};
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
            hashHistory.push('/1/1');
        }
    }

    handleEvents(res) {
        let events = res.BeaconEventList.mBeaconEventList.MyBeaconEvent;

        // this.setState({events:events, name:'hello'});
        this.setState({ beaconEvents: events });
        //console.log('events',res.BeaconEventList);
    }

    handleEvent(res){
        let project = store.getProject();
        if (project) {
            console.log('get events', project.LicenseKey);
            store.getEvents(project.LicenseKey, 'OrderBy:BeaconEventId,SortedDesc:1');
        }
    }

    componentDidMount() {
        store.addListener('EVENTS', this.eventsHandler);
        store.addListener('EVENT_DELETED',this.eventHandler);

        let project = store.getProject();
        if (project) {
            console.log('get events', project.LicenseKey);
            store.getEvents(project.LicenseKey, 'OrderBy:BeaconEventId,SortedDesc:1');
        }
    }

    componentWillUnmount() {
        store.removeListener('EVENTS', this.eventsHandler);
        store.removeListener('EVENT_DELETED',this.eventHandler);                
    }

    render() {
        let m = this;
        let events = this.state.beaconEvents;
        let canAdd = this.state.selectedEvents.length == 0;
        let canEdit = this.state.selectedEvents.length == 1;
        let canDelete = this.state.selectedEvents.length > 0;

        return <div className="list-container">
            <span className="command-buttons">
                {
                    canAdd?<span><button className="btn btn-primary btn-larger" onClick={this.addEvent.bind(this) }>新增</button>&nbsp;&nbsp;</span>:""
                }
                {
                    canDelete?<span><button className="btn btn-primary btn-larger" onClick={this.deleteEvents.bind(this) }>刪除</button>&nbsp;&nbsp;</span>:""
                }
                {
                    canEdit?<span><button className="btn btn-primary btn-larger" onClick={this.editEvent.bind(this) }>編輯</button>&nbsp;&nbsp;</span>:""
                }
            </span>
            <span className="search-box">
                關鍵字 <input className="keyword" type="text" placeholder="StoreID/事件名稱"></input>
            </span>
            <Table striped>
                <thead>
                    <tr>
                        <th>
                            <input type="checkbox" />
                        </th>
                        <th>啟動</th>
                        <th>編輯人員</th>
                        <th>類別</th>
                        <th>事件標題</th>
                        <th>執行日期</th>
                        <th>群組名稱/Beacon名稱</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        events.map(function (event, index) {
                            let selected = m.state.selectedEvents.some(function(ev){
                                return ev.BeaconEventId == event.BeaconEventId;
                            });

                            return <tr key={index}>
                                <td>
                                    <input ref={"select" + index.toString() } type="checkbox" onClick={m.handleSelect.bind(m, event) } 
                                        checked={selected} />
                                </td>
                                <td>啟動{event.BeaconEventId}</td>
                                <td>{event.Editor}</td>
                                <td>{constants.getKeyByValue(constants.AdActions, event.AdAction)}</td>
                                <td>{event.BeaconEventName}</td>
                                <td className="small">{event.BeginDate} ~ <br/>
                                                      {event.EndDate}<br/> 
                                                      {event.WeekdayRule}</td>
                                <td>群組名稱/Beacon名稱(ID)</td>
                            </tr>
                        })
                    }
                </tbody>
            </Table>
        </div>;
    }
}