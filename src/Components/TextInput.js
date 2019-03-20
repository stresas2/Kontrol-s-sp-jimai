import React, { Component } from 'react';
import './form.css';

class TextInput extends Component {
  constructor(props) {
    super(props);
    this.state =
    {
        komentaras: [{name: "", comment: ""}],
        lng: 0
    };

    this.hanldeVardas = this.hanldeVardas.bind(this);
    this.handleKomentaras = this.handleKomentaras.bind(this);

  }


  hanldeVardas(event){
    var komentaras = this.state.komentaras[0].comment;
    var lng = this.state.lng;

    this.setState(
    {
        komentaras: [{name: event.target.value, comment: komentaras}],
        lng: lng
    }
    );

    this.props.komentaras(komentaras, event.target.value);
  };

  handleKomentaras(event){

    var vardas = this.state.komentaras[0].name;
    var lng = event.target.value.length;

    this.setState(
    {
        komentaras: [{name: vardas, comment: event.target.value}],
        lng: lng
    }
    );

    this.props.komentaras(event.target.value, vardas);
  };

  render() {

    return (


        <form className="px-2  pt-1">
          <div className="form-group mb-2">




          <form id="form">
            <label className="p-1 m-0" style={{color: "#6c757d", fontSize: "14px"}}>Vardas:</label>
            <input id="input" className="pt-0" type="text"  onChange={this.hanldeVardas} maxLength="50"  />
            <label className="p-1 pt-2 pb-0 m-0" style={{color: "#6c757d", fontSize: "14px"}}>Komentaras: ({300 - this.state.lng})</label>
          	<textarea id="textarea" className="pt-0"  maxLength="300" maxLength="300" onChange={this.handleKomentaras} rows="2"></textarea>
          </form>



          </div>

        </form>


    );
  }
}
export default TextInput;
