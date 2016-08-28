import React from 'react';
import { Map, Marker, Popup, TileLayer, ImageOverlay } from 'react-leaflet';
import Leaflet from 'leaflet';
import GoogleLayer from './google-layer';
import Modal from 'react-modal';

export default class BeaconMap extends React.Component {
    constructor(props) {
        super(props);
        let southWest = Leaflet.Map.prototype.unproject([0, props.map.height], 3);
        let northEast = Leaflet.Map.prototype.unproject([props.map.width, 0], 3);
        let bounds = new Leaflet.LatLngBounds(southWest, northEast);

        this.modalStyle = {
            overlay: {
                position: 'fixed',
                top: 50,
                left: 50,
                right: 50,
                bottom: 50,
                backgroundColor: 'rgba(255, 255, 255, 0.5)'
            },
            content: {
                position: 'absolute',
                top: '20px',
                left: '20px',
                right: '20px',
                bottom: '20px',
                border: 'none',
                background: 'rgba(255, 255, 255, 0.5)',
                overflow: 'auto',
                WebkitOverflowScrolling: 'touch',
                outline: 'none',
                padding: '0px',
            }
        };

        this.state = {
            isBoundSet: false,
            bounds: bounds
        }
    }

    componentWillReceiveProps(nextProps) {
        let southWest = Leaflet.Map.prototype.unproject([0, nextProps.map.height], 3);
        let northEast = Leaflet.Map.prototype.unproject([nextProps.map.width, 0], 3);
        let bounds = new Leaflet.LatLngBounds(southWest, northEast);

        this.setState({ isBoundSet: false, bounds:bounds });
    }

    componentDidMount() {
        if (!this.state.isBoundSet) {
            if(this.refs.map){
            let map = this.refs.map.leafletElement;

            let southWest = map.unproject([0, this.props.map.height], map.getMaxZoom() - 1);
            let northEast = map.unproject([this.props.map.width, 0], map.getMaxZoom() - 1);
            let bounds = new Leaflet.LatLngBounds(southWest, northEast);

            //map.setMaxBounds(bounds);

            console.log('resetting bounds', bounds);

            this.setState({ bounds: bounds, isBoundSet: true });
            }
        }
    }

    render() {
        const position = [25.033493,121.564101];
        let {bounds} = this.state;
        let mapUrl = this.props.map.mapUrl;

        console.log(bounds);
        console.log(this.props.map);

        return <div>
        {
        this.props.map.mapUrl != ''?<Map ref="map" center={position} zoom={16} minZoom={1} maxZoom={20} crs={Leaflet.CRS.Simple} className="leaflet-container">
            <GoogleLayer />
            <Marker position={position}>
                <Popup>
                    <span>我是一個Marker</span>
                </Popup>
            </Marker>
            <Marker position={[bounds._southWest.lat / 2, bounds._northEast.lng / 2]}>
                <Popup>
                    <span>我是一個Marker</span>
                </Popup>
            </Marker>
            <Marker position={[bounds._southWest.lat, bounds._northEast.lng]}>
                <Popup>
                    <span>我是一個Marker</span>
                </Popup>
            </Marker>
        </Map>:''
        }</div>
    }
}
