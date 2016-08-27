import React from 'react';
import { Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default class BeaconList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let m = this;
        let beacons = [];
        let groups = [];
        let {event} = this.props;

        if (event.BeaconGroupInfoList && event.BeaconGroupInfoList.MyBeaconGroupInfo) {
            if (event.BeaconGroupInfoList.MyBeaconGroupInfo.length > 0) {
                beacons = event.BeaconGroupInfoList.MyBeaconGroupInfo
                    .filter(function(group){
                        return group.IsCustomBeaconGroup == 0;
                    });

                groups = event.BeaconGroupInfoList.MyBeaconGroupInfo
                    .filter(function(group){
                        return group.IsCustomBeaconGroup == 1;
                    });

                console.log('groups',groups);                    
            } else {
                if(event.BeaconGroupInfoList.MyBeaconGroupInfo.IsCustomBeaconGroup == 0)
                    beacons = [event.BeaconGroupInfoList.MyBeaconGroupInfo];
                else
                    groups = [event.BeaconGroupInfoList.MyBeaconGroupInfo];
            }
        }

        return <div>
            <span className="text-center">
                <h3>事件掛載Beacons/群組</h3>
            </span>
            <br/>        
            <Table striped bordered condensed hover>
                <thead>
                    <tr>
                        <th>名稱</th>
                        <th>類別</th>
                        <th>地圖名稱</th>
                        <th>明細</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        groups.map(function (group) {
                            return <tr>
                                <td>{group.BeaconGroupName}</td>
                                <td>群組</td>
                                <td></td>
                                <td>明細</td>
                            </tr>
                        })
                    }
                    {
                        beacons.map(function (beacon) {
                            return <tr>
                                <td>{beacon.BeaconName}</td>
                                <td>Beacon</td>
                                <td>{beacon.MapId}</td>
                                <td>明細</td>
                            </tr>
                        })
                    }
                </tbody>
            </Table>
        </div>
    }
}