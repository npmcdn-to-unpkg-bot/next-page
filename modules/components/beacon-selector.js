import React from 'react';
import { Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import store from '../store';

export default class BeaconSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            beacons: [],
            beaconIdList: this.props.beaconIdList || '',
            isSelectedOnly:false
        }

        this.beaconsHandler = this.handleBeacons.bind(this);
    }

    componentDidMount() {
        store.addListener('BEACONS', this.beaconsHandler);

        this.getBeacons();
    }

    componentWillUnmount() {
        store.removeListener('BEACONS', this.beaconsHandler);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ beaconIdList: nextProps.beaconIdList });
    }

    handleSelect(e) {
        let beaconIdList = this.state.beaconIdList.split(',');
        let beaconId = e.target.value;

        if (!beaconIdList.includes(beaconId)) {
            beaconIdList.push(beaconId);
        } else {
            let index = beaconIdList.indexOf(beaconId);

            if (index >= 0) {
                beaconIdList.splice(index, 1);
            }
        }

        beaconIdList = beaconIdList.join(',');

        this.setState({ beaconIdList: beaconIdList });
    }

    selectAllBeacons(){

    }

    getBeaconIdList() {
        return this.state.beaconIdList;
    }

    getBeacons() {
        let project = store.getProject();

        if (project) {
            store.getBeaconsByMap(project.LicenseKey, project.ProjectId, 0, '');
        }
    }

    handleBeacons(res) {
        if (res.BeaconList && res.BeaconList.mBeaconList && res.BeaconList.mBeaconList.MyBeaconTable) {
            let beacons = res.BeaconList.mBeaconList.MyBeaconTable;

            this.setState({ beacons: beacons })
        }
    }

    showSelectedBeacons(){
        this.setState({isSelectedOnly: !this.state.isSelectedOnly})
    }

    render() {
        let m = this;
        let beaconNumber = this.state.beaconIdList.split(',').filter(function(id){
            return id != '';
        }).length;
        return <div>
            <span className="text-left">
                <h4>請選擇負責事件之群組/Beacon(
                    <label className="link" onClick={this.showSelectedBeacons.bind(this)}>{beaconNumber}</label>
                    ) </h4>
            </span>
            <Table striped bordered condensed hover>
                <thead>
                    <tr>
                        <th>
                            <input type="checkbox" onChange={this.selectAllBeacons.bind(this)} />
                        </th>
                        <th>名稱</th>
                        <th>類別</th>
                        <th>MapName</th>
                        <th>明細</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.beacons.map(function (beacon) {
                            let selected = m.state.beaconIdList.split(',').some(function (beaconId) {
                                return beaconId == beacon.beaconid;
                            })
                            return ((!m.state.isSelectedOnly) || selected)? <tr>
                                <td>
                                    <input type="checkbox" value={beacon.beaconid} onChange={m.handleSelect.bind(m) }
                                        checked={selected}
                                        />
                                </td>
                                <td>{beacon.name}</td>
                                <td>Beacon</td>
                                <td>{beacon.mapid}</td>
                                <td>明細</td>
                            </tr>:""
                        })
                    }
                </tbody>
            </Table>
        </div>
    }
}