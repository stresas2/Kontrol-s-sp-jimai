import React, { Component } from "react";
import { withLeaflet, MapControl } from "react-leaflet";
import L from "leaflet";

class MapInfo extends MapControl {

  createLeafletElement(opts) {
    const MapInfo = L.Control.extend({
      onAdd: map => {
        this.panelDiv = L.DomUtil.create("div", "info");
        this.panelDiv.innerHTML = "<img src='/css/car.png' /> - <b>Kontrolė</b>";
        return this.panelDiv;
      }
    });
    return new MapInfo({ position: "topright" });
  }

  componentDidMount() {
    const { map } = this.props.leaflet;
    this.leafletElement.addTo(map);
  }
}

export default withLeaflet(MapInfo);
