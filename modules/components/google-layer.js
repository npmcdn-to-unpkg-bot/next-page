import 'leaflet-plugins/layer/tile/Google';

import L from 'leaflet';
import MapLayer from 'react-leaflet/lib/MapLayer';
import GoogleMapsLoader from 'google-maps';

// Inspired by TileLayer
// TODO: See how it works if there is multiple instances of this component in the app
// TODO: See how it works if Google maps API is loaded elsewhere
// (this should be handled by google-maps library)
export default class GoogleLayer extends MapLayer {

  componentWillMount() {
    super.componentWillMount();

    // Flag to know if the component should be rendered
    this.state = {
      googleLoaded: false
    };

    // This is a blank layer because MapLayer doesn't support having this undefined
    this.leafletElement = L.tileLayer('');

    // Google settings
    GoogleMapsLoader.LANGUAGE = 'tw';
    GoogleMapsLoader.REGION = 'TW';
    GoogleMapsLoader.KEY = 'AIzaSyBt3aHShXfpPkrv6vSFhIkqUm5xIEx0Xhk';

    // Async loading of Google maps API to avoid direct script tag in HTML and
    // be more compliant to React component approach
    GoogleMapsLoader.load(() => {
      // Remove the previously added blank layer, add your Google layer(s) and flag loaded
      const GoogleLayer = new L.Google('TERRAIN');
      this.props.layerContainer.removeLayer(this.leafletElement);
      this.leafletElement = GoogleLayer;
      this.props.layerContainer.addLayer(this.leafletElement);
      this.setState({
        googleLoaded: true
      });
    });
  }

  componentWillUnmount() {
    super.componentWillMount();

    // Unload on umount, perhaps not necessary but seems a good practice
    GoogleMapsLoader.release(() => {
      this.setState = {
        googleLoaded: false
      };
    });
  }

  shouldComponentUpdate() {
    // return super.shouldComponentUpdate()
    //     && this.state.googleLoaded;
    console.log(super.shouldComponentUpdate);
    return this.state.googleLoaded;
  }

  render() {
    return null;
  }
}