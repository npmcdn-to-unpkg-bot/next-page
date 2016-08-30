import chttlService from '../services/service';
import xml2json from '../lib/xml2json';
import EventEmitter from 'eventemitter';
import constants from '../constants';
const __emitter = new EventEmitter.EventEmitter();

class Store {
    constructor(props){
        this.event = {};
    }

    _saveItem(key, item) {
        localStorage.setItem(key, JSON.stringify(item));
    }

    _getItem(key) {
        return JSON.parse(localStorage.getItem(key));
    }

    _removeItem(key){
        localStorage.removeItem(key);
    }

    login(account,password){
        let m = this;
        chttlService.login(account,password).then(function(res){
            var data = xml2json(res,'');
            console.log('data',data);
            if(data){
                data = JSON.parse(data);
                console.log('parsed',data);
                console.log('AccountInfo',data.AccountInfo);
                console.log('mAccount',data.AccountInfo.mAccount)
                console.log(data && data.AccountInfo && data.AccountInfo.mAccount);
                if(data && data.AccountInfo && data.AccountInfo.mAccount) {
                    m.setUser(data.AccountInfo);
                    __emitter.emit('LOGIN_SUCCESS',data.AccountInfo);
                } else {
                    __emitter.emit('LOGIN_FAILED', data);
                }
            } else {
                __emitter.emit('LOGIN_FAILED', data);
            }
             
        });
    }

    getBeaconGroups(licenseKey,org){
        let parameter = '';
        org = '';
        parameter += 'Org:'+(org || '')+',';

        console.log('store get beacon groups',licenseKey);
        let m = this;
        chttlService.getBeaconGroups(licenseKey,parameter).then(function(res){
            var data = xml2json(res,'');
            if(data){
                data = JSON.parse(data);

                if(data){
                    __emitter.emit('GROUPS',data);
                }
            } else {
            }
             
        });                
    }

    getBeaconsByMap(licenseKey,projectId,mapId,beaconName){
        let parameter = '';
        if(projectId){
            parameter += 'ProjectId:'+projectId+',';
        }
        if(mapId){
            parameter += 'MapId:'+mapId+',';
        }
        if(beaconName){
            parameter += 'Name:'+beaconName;
        }

        console.log('store get beacons',licenseKey);
        let m = this;
        chttlService.getBeaconsByMap(licenseKey,parameter).then(function(res){
            var data = xml2json(res,'');
            if(data){
                data = JSON.parse(data);

                if(data){
                    __emitter.emit('BEACONS',data);
                }
            } else {
            }
             
        });                
    }

    getBeaconsByParameter(){

    }

    getMapsByProject(licenseKey, projectId){
        console.log('store get maps',licenseKey);
        let m = this;
        chttlService.getMapsByProject(licenseKey,projectId).then(function(res){
            var data = xml2json(res,'');
            if(data){
                data = JSON.parse(data);

                if(data){
                    __emitter.emit('MAPS',data);
                }
            } else {
            }             
        });        
    }

    getMicroMap(licenseKey, mapId){
        console.log('store get map',licenseKey);
        let m = this;
        chttlService.getMicroMap(licenseKey,mapId).then(function(res){
            var data = xml2json(res,'');
            if(data){
                data = JSON.parse(data);

                if(data){
                    __emitter.emit('MAP',data);
                }
            } else {
            }             
        });        
    }

    getEvents(licenseKey, parameter){
        console.log('store get events',licenseKey);
        let m = this;
        chttlService.getEvents(licenseKey,parameter).then(function(res){
            var data = xml2json(res,'');
            if(data){
                data = JSON.parse(data);

                if(data){
                    __emitter.emit('EVENTS',data);
                }
                // if(data && data.AccountInfo && data.AccountInfo.mAccount) {
                //     m.setUser(data.AccountInfo);
                //     __emitter.emit('LOGIN_SUCCESS',data.AccountInfo);
                // } else {
                //     __emitter.emit('LOGIN_FAILED', data);
                // }
            } else {
                // __emitter.emit('LOGIN_FAILED', data);
            }
             
        });        
    }

    addEvent(licenseKey, projectId, event){
        console.log('store get event', licenseKey, projectId, event);

        let data = this._getKeyValueArrays(event);
        let m = this;

        console.log('data',data);

        chttlService.addEvent(licenseKey, projectId, data.keyArray, data.valueArray).then(function(res){
            var data = xml2json(res,'');
            if(data){
                data = JSON.parse(data);

                if(data && data.Information && data.Information.Info){
                    console.log(data.Information.Info);
                    __emitter.emit('EVENT_ADDED',data);
                }
            } else {
            }
        })
    }

    updateEvent(licenseKey, event){
        console.log('store update event', licenseKey, event);

        let data = this._getKeyValueArrays(event);
        let m = this;

        console.log('data',data);

        chttlService.updateEvent(licenseKey, event.BeaconEventId, data.keyArray, data.valueArray).then(function(res){
            var data = xml2json(res,'');
            if(data){
                data = JSON.parse(data);

                console.log('event updated',data);

                if(data && data.Information && data.Information.MessageCode == "0"){
                    console.log('confirm updated');
                    __emitter.emit('EVENT_UPDATED',data);
                }
            } else {
            }
        })
    }

    deleteEvent(licenseKey, eventId){
        console.log('store delete event', licenseKey, eventId);

        chttlService.deleteEvent(licenseKey, eventId).then(function(res){
            console.log('event deleted',res);

            var data = xml2json(res,'');
            if(data){
                data = JSON.parse(data);

                if(data && data.Information && data.Information.MessageCode == "0"){
                    console.log(data);
                    __emitter.emit('EVENT_DELETED',data);
                }
            } else {
            }
        })
    }

    toggleEnableEvent(licenseKey, eventId, enabled){
        console.log('store toggle event', licenseKey, eventId, enabled);

        let m = this;

        chttlService.updateEvent(licenseKey, eventId, 'Enable', enabled).then(function(res){
            var data = xml2json(res,'');
            if(data){
                data = JSON.parse(data);

                console.log('event toggled',data);

                if(data && data.Information && data.Information.MessageCode == "0"){
                    console.log('confirm updated');
                    __emitter.emit('EVENT_UPDATED',data);
                }
            } else {
            }
        })
    }

    _getKeyValueArrays(event){
        let keyArray = '';
        let valueArray = '';

        if(event.BeaconEventName){
            keyArray = 'Name'
            valueArray = event.BeaconEventName;
        }

        if(event.AdAction){
            keyArray += '^AdAction';
            valueArray += '^'+event.AdAction;
        }

        if(event.Action){
            keyArray += '^Action';
            valueArray += '^'+event.Action;
        }

        if(event.BeaconIdList){
            keyArray += '^BeaconIdList';
            valueArray += '^'+event.BeaconIdList;
        }

        if(event.BeaconGroupIdList){
            keyArray += '^BeaconGroupIdList';
            valueArray += '^'+event.BeaconGroupIdList;
        }        

        if(event.Title){
            keyArray += '^Title';
            valueArray += '^'+event.Title;
        }

        if(event.Text1){
            keyArray += '^Text1';
            valueArray += '^'+event.Text1;
        }

        if(event.Text2){
            keyArray += '^Text2';
            valueArray += '^'+event.Text2;
        }

        if(event.TitleColor){
            keyArray += '^TitleColor';
            valueArray += '^'+event.TitleColor;
        }

        if(event.TitleBackgroundColor){
            keyArray += '^TitleBackgroundColor';
            valueArray += '^'+event.TitleBackgroundColor;
        }

        if(event.MainIconUrl){
            keyArray += '^MainIconUrl';
            valueArray += '^'+event.MainIconUrl;
        }

        if(event.BackgroundIconUrl){
            keyArray += '^BackgroundIconUrl';
            valueArray += '^'+event.BackgroundIconUrl;
        }        
                
        if(event.TargetContent){
            keyArray += '^TargetContent';
            valueArray += '^'+event.TargetContent;
        }                

        if(event.UserDefinedData){
            keyArray += '^UserDefinedData';
            valueArray += '^'+event.UserDefinedData;
        }                

        if(event.AdActionText){
            keyArray += '^AdActionText';
            valueArray += '^'+event.AdActionText;            
        }

        if(event.Org){
            keyArray += '^Org';
            valueArray += '^'+event.Org;            
        }

        if(event.People){
            keyArray += '^People';
            valueArray += '^'+event.People;            
        }

        if(event.BeginDate){
            keyArray += '^BeginDate';
            valueArray += '^'+event.BeginDate;            
        }

        if(event.EndDate){
            keyArray += '^EndDate';
            valueArray += '^'+event.EndDate;            
        }

        if(event.BeginTime){
            keyArray += '^BeginTime';
            valueArray += '^'+event.BeginTime;            
        }

        if(event.EndTime){
            keyArray += '^EndTime';
            valueArray += '^'+event.EndTime;            
        }

        if(event.Period){
            keyArray += '^Period';
            valueArray += '^'+event.Period;            
        }

        if(event.NearRange){
            keyArray += '^NearRange';
            valueArray += '^'+event.NearRange;            
        }

        if(event.AwayRange){
            keyArray += '^AwayRange';
            valueArray += '^'+event.AwayRange;            
        }                

        if(event.StayRange){
            keyArray += '^StayRange';
            valueArray += '^'+event.StayRange;            
        }                                     

        if(event.StayTime){
            keyArray += '^StayTime';
            valueArray += '^'+event.StayTime;            
        }                           

        if(event.WeekdayRule){
            keyArray += '^WeekdayRule';
            valueArray += '^'+constants.toDecimalWeekDayRule(event.WeekdayRule);            
        }

        return {keyArray:keyArray, valueArray:valueArray};
    }

    getNewId(){
        let events = this.getEvents();
        let ids = events.map(function(event){
            return event.id;
        })
        
        return Math.max(...ids) + 1;
    }

    getUser(){
        let user = this._getItem('user');
        if(user) 
            return JSON.parse(user);
        else
            return null;
    }

    setUser(user){
        this._saveItem('user',JSON.stringify(user));
    }

    // getUserType(){
    //     let project = this.getProject();

    //     if(!project) return null;
    //     else {
    //         let ownerShips = project.ProjectOwnship.OwnershipInfo.Ownership;

    //         if(ownerShips.length > 0){

    //         } else {
    //             if(ownerships.StoreId) return '店家';
    //             else

    //         }         
    //     }
    // }

    getProject(){
        let project = this._getItem('project');
        console.log('get item project',project);
        if(project) 
            return JSON.parse(project);
        else
            return null;
    }

    setProject(project){
        this._saveItem('project',JSON.stringify(project));
    }

    getOrg(){
        let org = this._getItem('org');
        console.log('get item org',org);
        if(org) 
            return JSON.parse(org);
        else
            return null;
    }

    setOrg(org){
        this._saveItem('org',JSON.stringify(org));
    }

    newEvent(){
        this.event = {};
    }

    // getEvents(){
    //     let events = this._getItem('events');
    //     if(events) return events;
    //     else return [];
    // }

    // setEvents(events){
    //     this._saveItem('events',events);
    // }

    // addEvent(event){
    //     let events = this.getEvents();
    //     event.id = this.getNewId();
    //     events.push(event);
    //     this.setEvents(events);
    // }

    // updateEvent(event){
    //     let events = this.getEvents();
    //     let selectedEvent = events.find(function(ev){
    //         return ev.id == event.id;
    //     })
        
    //     if(selectedEvent){
    //         let index = events.indexOf(selectedEvent);

    //         if(index >= 0) events.splice(index,1,event);
    //         this.setEvents(events);            
    //     }
    // }

    // deleteEvent(event){
    //     let events = this.getEvents();
    //     let selectedEvent = events.find(function(ev){
    //         return ev.id == event.id;
    //     })

    //     if(selectedEvent){
    //         let index = events.indexOf(selectedEvent);

    //         if(index >= 0) events.splice(index,1);
    //         this.setEvents(events);
    //     }
    // }

    clear(){
        this.event = {};
        localStorage.clear();
    }

        //註冊事件綁定
    addListener(event, cb) {
        __emitter.addListener(event, cb);
    }

    //發送事件
    fire(event, data){
        __emitter.emit(event,data);
    }

    //清除事件綁定
    removeListener(event, cb) {
        __emitter.removeListener(event, cb);
    }
}

const store = new Store();

export default store;