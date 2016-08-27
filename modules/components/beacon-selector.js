import React from 'react';
import { Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import searchimg from '../../images/search.png';
import DropDownList from './dropdownlist';
import SortableHeader from './sortheader';
import BeaconMap from './beacon-map';
import store from '../store';

export default class BeaconSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            beacons: [],
            groups: [],
            beaconIdList: this.props.beaconIdList || '',
            beaconGroupIdList: this.props.beaconGroupIdList || '',
            isSelectedOnly: false,
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
        store.addListener('MAP',this.mapHandler);

        this.getBeaconGroups();
        this.getBeacons();
    }

    componentWillUnmount() {
        store.removeListener('BEACONS', this.beaconsHandler);
        store.removeListener('GROUPS', this.groupsHandler);
        store.removeListener('MAP', this.mapHandler);        
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

    handleGroupSelect(e) {
        let beaconGroupIdList = this.state.beaconGroupIdList.split(',');
        let groupId = e.target.value;

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

            if(org){
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

            if(!(beacons.length > 1)) beacons = [res.BeaconList.mBeaconList.MyBeaconTable];

            let mapnames = beacons.map(function (beacon) {
                return beacon.mapname;
            }).getUnique()
            .filter(function(mapname){
                return mapname;
            });

            mapnames.splice(0,0,'所有群組');
            mapnames.splice(0,0,'所有Beacons');               

            this.setState({ beacons: beacons, mapnames: mapnames });
        }
    }

    handleGroups(res) {
        if (res.BeaconGroupList && res.BeaconGroupList.mBeaconGroupList && res.BeaconGroupList.mBeaconGroupList.MyBeaconGroupTable) {
            let groups = res.BeaconGroupList.mBeaconGroupList.MyBeaconGroupTable;

            if(!(groups.length > 0)) groups = [res.BeaconGroupList.mBeaconGroupList.MyBeaconGroupTable];

            this.setState({ groups: groups});
        }
    }

    showSelectedBeacons() {
        this.setState({ isSelectedOnly: !this.state.isSelectedOnly })
    }

    showSearch() {
        this.setState({ isShowSearch: !this.state.isShowSearch });
    }

    handleFieldChange(field) {
        let searchKey = '';
        this.setState({ searchField: field, searchKey: searchKey, orderBy: ''});
    }

    handleSearch(e) {
        this.setState({ searchKey: e.target.value });
    }

    orderBeacons(fieldName){
        let isDescending = this.state.orderBy == fieldName?!this.state.isDescending:false;

        console.log('order by',this.state.orderBy);

        this.setState({orderBy:fieldName, isDescending:isDescending});
    }

    isSorting(fieldName){
        return this.state.orderBy == fieldName;
    }

    showMap(mapId){
        let project = store.getProject();

        if(project){
            store.getMicroMap(project.LicenseKey, mapId);
        }
    }

    handleMap(res){
        console.log(res,res.micromap);
        if(res && res.micromap){
            let micromap = res.micromap;
            console.log('micromap', micromap, micromap.imgheight);
            //let imgUrl = "data:image/png;charset=utf-8;base64," + micromap.imgbase;
            //console.log('imgurl',imgUrl); 
            this.setState({micromap:
                    {
                        width: parseInt(micromap.imgwidth),
                        height: parseInt(micromap.imgheight),
                        mapUrl: 'data:image/png;charset=utf-8;base64,'+micromap.imgbase
                        //mapUrl: "data:image/png;charset=utf-8;base64," + micromap.imgbase,
                        //width: parseInt(micromap.imgwidth),
                        //height: parseInt(mircomap.imgheight)   
                    }
                });
        }
    }

    showBeacons(group){
        if(this.state.selectedGroupId == group.BeaconGroupId){
            this.setState({groupBeacons:[],selectedGroupId:null});
        } else if(group.BeaconInfoList && group.BeaconInfoList.MyBeaconInfo){
            if(group.BeaconInfoList.MyBeaconInfo.length > 0)
                this.setState({groupBeacons:group.BeaconInfoList.MyBeaconInfo, selectedGroupId:group.BeaconGroupId});
            else
                this.setState({groupBeacons:[group.BeaconInfoList.MyBeaconInfo], selectedGroupId:group.BeaconGroupId});
            }
    }

    render() {
        let m = this;
        let beaconNumber = this.state.beaconIdList.split(',').filter(function (id) {
            return id != '';
        }).length;

        console.log(this.state.micromap);

        return <div>
            <span className="text-left">
                <h4>請選擇負責事件之群組/Beacon(
                    <label className="link" onClick={this.showSelectedBeacons.bind(this) }>{beaconNumber}</label>
                    ) </h4>
                <span className="float-left">
                    地圖 <DropDownList ref="maps" options={
                        this.state.mapnames.map(function (mapname) {
                            return { text: mapname, value: mapname }
                        })
                    } selectedValue={this.state.selectedMap} onChange={this.selectMap.bind(this) } />
                </span>
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
            </span>
            <Table striped bordered condensed hover>
                <thead>
                    <tr>
                        <th>
                            <input type="checkbox" onChange={this.selectAllBeacons.bind(this) } />
                        </th>
                        <SortableHeader fieldName="name" 
                            isSorting={this.isSorting('name')} isDescending={this.state.isDescending} 
                            toggleSort={this.orderBeacons.bind(this)}>名稱</SortableHeader>
                        <th>類別</th>
                        <SortableHeader fieldName="mapname" 
                            isSorting={this.isSorting('mapname')} isDescending={this.state.isDescending} 
                            toggleSort={this.orderBeacons.bind(this)}>地圖名稱</SortableHeader>
                        <th>明細</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.groups.filter(function (group) {
                            return m.state.selectedMap == '所有群組' || m.state.selectedMap == '';
                        }).filter(function(group){
                            switch(m.state.searchField){
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
                        }).map(function(group){
                            let selected = m.state.beaconGroupIdList.split(',').some(function (groupId) {
                                return groupId == group.BeaconGroupId;
                            })
                            return ((!m.state.isSelectedOnly) || selected) ? <tr>
                                    <td>
                                        <input type="checkbox" value={group.BeaconGroupId} onChange={m.handleGroupSelect.bind(m) }
                                            checked={selected}
                                            />{group.BeaconGroupId}
                                    </td>
                                    <td>{group.Name}<br/>
                                        {m.state.selectedGroupId == group.BeaconGroupId?m.state.groupBeacons.map(function(beacon){
                                            return <div>{beacon.BeaconName}</div>;
                                        }):""}
                                    </td>
                                    <td>群組</td>
                                    <td></td>
                                    <td><button className="btn" onClick={m.showBeacons.bind(m,group)}>明細</button></td>
                                </tr> : ""                            
                        })
                    }
                    {
                        this.state.beacons.filter(function (beacon) {
                            return beacon.mapname == m.state.selectedMap || m.state.selectedMap == '所有Beacons';
                        }).filter(function(beacon){
                            switch(m.state.searchField){
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
                            .map(function (beacon) {
                                let selected = m.state.beaconIdList.split(',').some(function (beaconId) {
                                    return beaconId == beacon.beaconid;
                                })
                                return ((!m.state.isSelectedOnly) || selected) ? <tr>
                                    <td>
                                        <input type="checkbox" value={beacon.beaconid} onChange={m.handleSelect.bind(m) }
                                            checked={selected}
                                            />{beacon.beaconid}
                                    </td>
                                    <td>{beacon.name}</td>
                                    <td>Beacon</td>
                                    <td>{beacon.mapname}{beacon.mapid}</td>
                                    <td>
                                        <button className="btn" onClick={m.showMap.bind(m,beacon.mapid)}>明細</button></td>
                                </tr> : ""
                            })
                    }
                </tbody>
            </Table>
        </div>
    }
}