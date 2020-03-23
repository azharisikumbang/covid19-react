import React, { Component } from 'react';
import { Map, TileLayer } from 'react-leaflet';

// import idMapData from '../data/id-all.geo.json';

class idMap extends Component {
  constructor(props){
    super(props)

    this.state = {
      config: {
        accessToken: "pk.eyJ1IjoiYXpoYXJpc2tiIiwiYSI6ImNrODQ4aG81NzFnbHIzZXJ1a3RseXc0Z2UifQ.IfjiIpd5KrtG1JVue-xIDg",
        idMap: "mapbox/light-v10",
        indonesia: {
          latLong: [0.549, 118.169],
        },
        zoom: 5
      }
    }

  }

  componentDidMount(){
    console.log("runnig");
  }

  render() {
    return (
      <div style={{height: "500px", overflow: "auto"}}>
        <Map center={this.state.config.indonesia.latLong} zoom={this.state.config.zoom} >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
          id={this.state.config.idMap}
          accessToken={this.state.config.accessToken}
        />
        </Map>
      </div>
    );
  }
}

export default idMap;
