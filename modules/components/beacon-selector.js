import React from 'react';
import { Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import searchimg from '../../images/search.png';
import DropDownList from './dropdownlist';
import SortableHeader from './sortheader';
import Tabs from './tabs';
import BeaconMap from './beacon-map';
import EventTypeButton from './event-type-button';
import store from '../store';

export default class BeaconSelector extends React.Component {
    constructor(props) {
        super(props);

        let event = this.props.event || {};
        let beaconIdList = '';
        let beaconGroupIdList = '';

        if(event && event.BeaconGroupInfoList && event.BeaconGroupInfoList.MyBeaconGroupInfo){
            if(event.BeaconGroupInfoList.MyBeaconGroupInfo.length > 1){
                event.BeaconGroupInfoList.MyBeaconGroupInfo.map(function(info){
                    if(info.IsCustomBeaconGroup == 1) beaconGroupIdList += info.BeaconGroupId + ',';
                    else beaconIdList += info.BeaconId + ','; 
                })
            } else {                    
                let info = event.BeaconGroupInfoList.MyBeaconGroupInfo; 
                if(info.IsCustomBeaconGroup == 1) beaconGroupIdList += info.BeaconGroupId + ',';
                else beaconIdList += info.BeaconId + ',';                 
            }
        }

        this.state = {
            beacons: [],
            groups: [],
            beaconIdList: beaconIdList,
            beaconGroupIdList: beaconGroupIdList,
            selectedListTab: 0,
            groupBeacons: [],
            selectedGroupId: null,
            mapnames: [],
            selectedMap: '所有Beacons',
            isShowSearch: false,
            searchField: '名稱',
            searchKey: '',
            orderBy: '',
            isDescending: false,
            micromap: {
                mapUrl: '',
                width: 0,
                height: 0
            }
        }

        this.beaconsHandler = this.handleBeacons.bind(this);
        this.groupsHandler = this.handleGroups.bind(this);
        this.mapHandler = this.handleMap.bind(this);
    }

    componentDidMount() {
        store.addListener('BEACONS', this.beaconsHandler);
        store.addListener('GROUPS', this.groupsHandler);
        store.addListener('MAP', this.mapHandler);

        this.getBeaconGroups();
        this.getBeacons();
    }

    componentWillUnmount() {
        store.removeListener('BEACONS', this.beaconsHandler);
        store.removeListener('GROUPS', this.groupsHandler);
        store.removeListener('MAP', this.mapHandler);
    }

    componentWillReceiveProps(nextProps) {
        // this.setState({ beaconIdList: nextProps.beaconIdList });
        this.setState({ event: nextProps.event });
    }

    switchTab(index) {
        //let isActive = (index == 0);
        this.setState({ selectedListTab: index });
    }

    handleSelect(beacon) {
        let beaconIdList = this.state.beaconIdList.split(',');
        let beaconId = beacon.beaconid;

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

    handleGroupSelect(group) {
        let beaconGroupIdList = this.state.beaconGroupIdList.split(',');
        let groupId = group.BeaconGroupId;

        if (!beaconGroupIdList.includes(groupId)) {
            beaconGroupIdList.push(groupId);
        } else {
            let index = beaconGroupIdList.indexOf(groupId);

            if (index >= 0) {
                beaconGroupIdList.splice(index, 1);
            }
        }

        beaconGroupIdList = beaconGroupIdList.join(',');

        this.setState({ beaconGroupIdList: beaconGroupIdList });
    }

    selectMap(mapname) {
        console.log(this);
        this.setState({ selectedMap: mapname });
    }

    selectAllBeacons() {

    }

    getBeaconIdList() {
        return this.state.beaconIdList;
    }

    getBeaconGroupIdList() {
        return this.state.beaconGroupIdList;
    }

    getBeaconGroups() {
        let project = store.getProject();

        if (project) {
            let org = store.getOrg();

            if (org) {
                store.getBeaconGroups(project.LicenseKey, org.Org);
            }
        }
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

            if (!(beacons.length > 1)) beacons = [res.BeaconList.mBeaconList.MyBeaconTable];

            let mapnames = beacons.map(function (beacon) {
                return beacon.mapname;
            }).getUnique()
                .filter(function (mapname) {
                    return mapname;
                });

            mapnames.splice(0, 0, '所有群組');
            mapnames.splice(0, 0, '所有Beacons');

            this.setState({ beacons: beacons, mapnames: mapnames });
        }
    }

    handleGroups(res) {
        if (res.BeaconGroupList && res.BeaconGroupList.mBeaconGroupList && res.BeaconGroupList.mBeaconGroupList.MyBeaconGroupTable) {
            let groups = res.BeaconGroupList.mBeaconGroupList.MyBeaconGroupTable;

            if (!(groups.length > 0)) groups = [res.BeaconGroupList.mBeaconGroupList.MyBeaconGroupTable];

            this.setState({ groups: groups });
        }
    }

    showSearch() {
        this.setState({ isShowSearch: !this.state.isShowSearch });
    }

    handleFieldChange(field) {
        let searchKey = '';
        this.setState({ searchField: field, searchKey: searchKey, orderBy: '' });
    }

    handleSearch(e) {
        this.setState({ searchKey: e.target.value });
    }

    orderBeacons(fieldName) {
        let isDescending = this.state.orderBy == fieldName ? !this.state.isDescending : false;

        console.log('order by', this.state.orderBy);

        this.setState({ orderBy: fieldName, isDescending: isDescending });
    }

    isSorting(fieldName) {
        return this.state.orderBy == fieldName;
    }

    showMap(mapId) {
        let project = store.getProject();

        if (project) {
            store.getMicroMap(project.LicenseKey, mapId);
        }
    }

    handleMap(res) {
        console.log(res, res.micromap);
        if (res && res.micromap) {
            let micromap = res.micromap;
            console.log('micromap', micromap, micromap.imgheight);
            //let imgUrl = "data:image/png;charset=utf-8;base64," + micromap.imgbase;
            //console.log('imgurl',imgUrl); 
            this.setState({
                micromap:
                {
                    width: parseInt(micromap.imgwidth),
                    height: parseInt(micromap.imgheight),
                    mapUrl: 'data:image/png;charset=utf-8;base64,' + micromap.imgbase
                    //mapUrl: "data:image/png;charset=utf-8;base64," + micromap.imgbase,
                    //width: parseInt(micromap.imgwidth),
                    //height: parseInt(mircomap.imgheight)   
                }
            });
        }
    }

    showBeacons(group) {
        if (this.state.selectedGroupId == group.BeaconGroupId) {
            this.setState({ groupBeacons: [], selectedGroupId: null });
        } else if (group.BeaconInfoList && group.BeaconInfoList.MyBeaconInfo) {
            if (group.BeaconInfoList.MyBeaconInfo.length > 0)
                this.setState({ groupBeacons: group.BeaconInfoList.MyBeaconInfo, selectedGroupId: group.BeaconGroupId });
            else
                this.setState({ groupBeacons: [group.BeaconInfoList.MyBeaconInfo], selectedGroupId: group.BeaconGroupId });
        }
    }

    render() {
        let m = this;
        // let beaconNumber = this.state.beaconIdList.split(',').filter(function (id) {
        //     return id != '';
        // }).length;

        console.log(this.state.micromap);

        return <div>
            <span className="text-left">
                <h4>請選擇負責事件之群組/Beacon</h4>
                <div className="topbar">
                    <span className="search-box">
                        {
                            this.state.isShowSearch ? <span className="search-field">
                                <DropDownList ref="fields" options={
                                    [{ text: "名稱", value: "名稱" },
                                        { text: "BeaconId", value: "BeaconId" },
                                    ]
                                } selectedValue={this.state.searchField} onChange={this.handleFieldChange.bind(this) } />
                                &nbsp;
                                {
                                    <input className="keyword" type="text" placeholder="搜尋內容"
                                        defaultValue={this.state.searchKey}
                                        onChange={this.handleSearch.bind(this) }
                                        ></input>
                                }
                            </span> : ""
                        }
                        <img src={searchimg} className="search-button" width="30" height="30" onClick={this.showSearch.bind(this) } />
                    </span>
                    <Tabs ref="tabs" tabNames={['Beacon清單', '已選清單']} selectedTab={this.state.selectedListTab} onChange={this.switchTab.bind(this) } />
                    <span>
                        &nbsp;&nbsp;篩選 <DropDownList ref="maps" options={
                            this.state.mapnames.map(function (mapname) {
                                return { text: mapname, value: mapname }
                            })
                        } selectedValue={this.state.selectedMap} onChange={this.selectMap.bind(this) } />
                    </span>
                </div>
            </span>
            <Table striped>
                <thead>
                    <tr>
                        <th>
                            <input type="checkbox" onChange={this.selectAllBeacons.bind(this) } />
                        </th>
                        <SortableHeader fieldName="name"
                            isSorting={this.isSorting('name') } isDescending={this.state.isDescending}
                            toggleSort={this.orderBeacons.bind(this) }>名稱</SortableHeader>
                        <th>類別</th>
                        <SortableHeader fieldName="mapname"
                            isSorting={this.isSorting('mapname') } isDescending={this.state.isDescending}
                            toggleSort={this.orderBeacons.bind(this) }>地圖名稱</SortableHeader>
                        <th>明細</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.groups.filter(function (group) {
                            return m.state.selectedMap == '所有群組' || m.state.selectedMap == '';
                        }).filter(function (group) {
                            switch (m.state.searchField) {
                                case '名稱':
                                    console.log('is 名稱');
                                    return (group.Name || '').indexOf(m.state.searchKey) >= 0 || m.state.searchKey == '';
                                case 'BeaconId':
                                    console.log('is BeaconId');
                                    return group.BeaconGroupId == m.state.searchKey || m.state.searchKey == '';
                                default:
                                    console.log('is Default');
                                    return true;
                            }
                        }).map(function (group, index) {
                            let selected = m.state.beaconGroupIdList.split(',').some(function (groupId) {
                                return groupId == group.BeaconGroupId;
                            })
                            return ((m.state.selectedListTab == 0) || selected) ? <tr>
                                <td>
                                    <EventTypeButton ref={"selectg" + index.toString() }
                                        eventType='群' isSelected={selected}
                                        onChange={m.handleGroupSelect.bind(m, group) } />
                                </td>
                                <td>{group.Name}<br/>
                                    {m.state.selectedGroupId == group.BeaconGroupId ? m.state.groupBeacons.map(function (beacon) {
                                        return <div>{beacon.BeaconName}</div>;
                                    }) : ""}
                                </td>
                                <td>群組</td>
                                <td></td>
                                <td><button className="btn" onClick={m.showBeacons.bind(m, group) }>明細</button></td>
                            </tr> : ""
                        })
                    }
                    {
                        this.state.beacons.filter(function (beacon) {
                            return beacon.mapname == m.state.selectedMap || m.state.selectedMap == '所有Beacons';
                        }).filter(function (beacon) {
                            switch (m.state.searchField) {
                                case '名稱':
                                    console.log('is 名稱');
                                    return (beacon.name || '').indexOf(m.state.searchKey) >= 0 || m.state.searchKey == '';
                                case 'BeaconId':
                                    console.log('is BeaconId');
                                    return beacon.beaconid == m.state.searchKey || m.state.searchKey == '';
                                default:
                                    console.log('is Default');
                                    return true;
                            }
                        })
                            .orderBy(m.state.orderBy, m.state.isDescending)
                            .map(function (beacon, index) {
                                let selected = m.state.beaconIdList.split(',').some(function (beaconId) {
                                    return beaconId == beacon.beaconid;
                                })
                                return ((m.state.selectedListTab == 0) || selected) ? <tr>
                                    <td>
                                        <EventTypeButton ref={"selectb" + index.toString() }
                                            eventType='B' isSelected={selected}
                                            onChange={m.handleSelect.bind(m, beacon) } />
                                    </td>
                                    <td>{beacon.name}</td>
                                    <td>Beacon</td>
                                    <td>{beacon.mapname}{beacon.mapid}</td>
                                    <td>
                                        <button className="btn" onClick={m.showMap.bind(m, beacon.mapid) }>明細</button></td>
                                </tr> : ""
                            })
                    }
                </tbody>
            </Table>
        </div>
    }
}