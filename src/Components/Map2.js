import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

export default class Map2 extends Component {


  render() {

    const position = this.props.koordinates;
    var res = position.split(", ");
    var result = [];
    result[0] = Number(res[0]);
    result[1] = Number(res[1]);


    return (
      <Map center={result} zoom={13} zoomControl={true} width="90%" viewport={result}  style={{ width: '100%'}}>
        <TileLayer style={{all: "revert"}}
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={result}>
          <Popup>
            {this.props.vardas}
          </Popup>
        </Marker>
      </Map>
    )
  }
}
