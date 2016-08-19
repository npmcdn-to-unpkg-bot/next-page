import $ from 'jquery';
import promise from 'es6-promise';
import config from '../config';

class CHTTLService {
    constructor() {
        this.baseUrl = config.baseUrl;
    }

    login(account, password) {
        var Promise = promise.Promise;
        var m = this;

        return new Promise(function (resolve, reject) {
            $.ajax({
                url: m.baseUrl + '/login',
                cache: false,
                processData: false,
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                method: 'POST',
                data: $.param({ Account: account, Password: password }),
                success: resolve,
                error: reject
            });
        });
    }

    getBeaconsByMap(licenseKey, parameter) {
        var Promise = promise.Promise;
        var m = this;

        return new Promise(function (resolve, reject) {
            $.ajax({
                url: m.baseUrl + '/getBeaconTableByParameter',
                cache: false,
                processData: false,
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                method: 'POST',
                data: $.param({ LicenseKey: licenseKey, Parameter: parameter }),
                success: resolve,
                error: reject
            });
        });
    }

    getEvents(licenseKey, parameter) {
        var Promise = promise.Promise;
        var m = this;

        return new Promise(function (resolve, reject) {
            $.ajax({
                url: m.baseUrl + '/getSimpleBeaconEventByParameter',
                cache: false,
                processData: false,
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                method: 'POST',
                data: $.param({ LicenseKey: licenseKey, Parameter: parameter }),
                success: resolve,
                error: reject
            });
        });
    }

    addEvent(licenseKey, projectId, keyArray, valueArray) {
        var Promise = promise.Promise;
        var m = this;

        return new Promise(function (resolve, reject) {
            $.ajax({
                url: m.baseUrl + '/insertSimpleBeaconEvent',
                cache: false,
                processData: false,
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                method: 'POST',
                data: $.param({ LicenseKey: licenseKey, ProjectId: projectId, KeyArray:keyArray, ValueArray:valueArray }),
                success: resolve,
                error: reject
            });
        });
    }

    updateEvent(licenseKey, eventId, keyArray, valueArray) {
        var Promise = promise.Promise;
        var m = this;

        return new Promise(function (resolve, reject) {
            $.ajax({
                url: m.baseUrl + '/updateSimpleBeaconEvent',
                cache: false,
                processData: false,
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                method: 'POST',
                data: $.param({ LicenseKey: licenseKey, BeaconEventId: eventId, KeyArray:keyArray, ValueArray:valueArray }),
                success: resolve,
                error: reject
            });
        });
    }    

    deleteEvent(licenseKey, eventId) {
        var Promise = promise.Promise;
        var m = this;

        return new Promise(function (resolve, reject) {
            $.ajax({
                url: m.baseUrl + '/deleteSimpleBeaconEvent',
                cache: false,
                processData: false,
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                method: 'POST',
                data: $.param({ LicenseKey: licenseKey, EventId:eventId }),
                success: resolve,
                error: reject
            });
        });
    }
}

const chttlService = new CHTTLService();

export default chttlService;