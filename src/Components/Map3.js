import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { restdb, realtimeURL } from "./helper.js";
import L from "leaflet";
import MapInfo from "./MapInfo";
import "./mapinfo.css";

export default class Map3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      komentarai: [],
      loading: true
    };

    let eventSource = new EventSource(realtimeURL);

    eventSource.addEventListener(
      "post",
      e => {
        var fulldata = JSON.parse(e.data);
        var data = fulldata.data;
        delete data._version;
        delete data.komentaras;
        delete data.like;
        delete data.vardas;

        this.newPost(data);
      },
      false
    );
  }

  newPost = data => {
    var das = this.state.komentarai;

    if (das.hasOwnProperty(data.tagas)) {
      das[data.tagas].unshift({
        data: data.data,
        koordinate: data.Koordinates
      });
      this.setState({ komentarai: das, loading: false });
    } else {
      var key = data.tagas;
      var obj = {};
      obj[key] = [{ data: data.data, koordinate: data.Koordinates }];

      const object2 = Object.assign(obj, das);

      this.setState({ komentarai: object2, loading: false });
    }
  };

  componentDidMount() {
    restdb.get("/rest/komentarai").then(res => {
      var komentai = res.data;
      komentai.sort(function(b, a) {
        return a.data - b.data;
      });
      this.pranesimuSort(komentai);
    });
  }

  pranesimuSort = komentai => {
    const items = komentai;

    const pranesimai = items.reduce((catMemo, { tagas, data, Koordinates }) => {
      (catMemo[tagas] = catMemo[tagas] || []).push({
        data: data,
        koordinate: Koordinates
      });
      return catMemo;
    }, {});

    this.setState({ komentarai: pranesimai, loading: false });
  };

  render() {
    var loading;
    var listItems;

    loading = (
      <div className="h-100 d-flex justify-content-center align-items-center">
        <img src="/css/loader2.gif" alt="" />
      </div>
    );

    function koordinate(esama) {
      const position = esama;
      var res = position.split(", ");
      var result = [];
      result[0] = Number(res[0]);
      result[1] = Number(res[1]);
      return result;
    }

    const iconPerson = new L.Icon({
      iconUrl: require("./car.png"),
      iconRetinaUrl: require("./car.png"),
      iconAnchor: null,
      shadowUrl: null,
      shadowSize: null,
      shadowAnchor: null,
      iconSize: [32, 32]
    });

    listItems = Object.keys(this.state.komentarai).map(vardas => (
      <Marker
        position={koordinate(this.state.komentarai[vardas][0].koordinate)}
        icon={iconPerson}
      >
        <Popup>
          {vardas} <br />
          Paskelbta prieš: {laikas(this.state.komentarai[vardas][0].data)}
        </Popup>
      </Marker>
    ));

    function laikas(paskelbta) {
      var dataNow = Math.floor(Date.now() / 1000);
      var res = Math.abs(dataNow - paskelbta);
      //var sekundes = res % 60;
      var minutes = Math.floor(res / 60) % 60;
      var valandos = Math.floor(res / 3600) % 24;
      //var dienos = Math.floor(res / 86400);

      return valandos + " h " + minutes + " min ";
    }

    var vilnius = [54.677778, 25.291667];

    return (
      <React.Fragment>
        {this.state.loading ? (
          loading
        ) : (
          <Map
            center={vilnius}
            zoom={12}
            zoomControl={true}
            viewport={vilnius}
            style={{ width: "100%", height: "100%", zIndex: "0" }}
          >
            <MapInfo />
            <TileLayer
              style={{ all: "revert" }}
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {listItems}
          </Map>
        )}
      </React.Fragment>
    );
  }
}
