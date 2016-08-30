import React from 'react';
import BeaconMap from './components/beacon-map';

export default class Maps extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return <BeaconMap map={
        { width:2500,
          height:1250,
          mapUrl:''
        }
      } />     
    }
}