import React, { Component } from 'react';
import TextInput from './TextInput';
import WindowSearch from './WindowSearch';
import { restdb } from './helper.js';
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios';


class CommentModel extends Component {
  constructor(props){
    super(props);
    this.state = {
      komentaras: "",
      vardas: "",
      tagas: "",
      Koordinates: "",
      patvirtinta: false
    };
  }

  stateKomentaras = ( newKomentaras, newVardas ) => {
    this.setState({ komentaras: newKomentaras, vardas: newVardas } );
  };

  stateTagas = ( stotele ) => {
    if(stotele){
    this.setState({ tagas: stotele.name, Koordinates: stotele.Koordinates } );
    }
  };

  submit = () => {
    if(this.state.patvirtinta && !!this.state.tagas && !!this.state.vardas && !!this.state.komentaras ){
      var today = Math.floor(Date.now() / 1000);
      var naujasKomentaras = this.state;
      naujasKomentaras['data'] = today;
      naujasKomentaras['like'] = 0;


       restdb.post('/rest/komentarai', naujasKomentaras)
        .then(function (response) {

        })

        this.setState({patvirtinta: false})
        window.grecaptcha.reset();
        var body = document.body; // For Safari
        var html = document.documentElement; // Chrome, Firefox, IE and Opera places the overflow at the html level, unless else is specified. Therefore, we use the documentElement property for these browsers

        body.scrollTop = 0;
        html.scrollTop = 0;

        document.getElementById('error2').style.color = "#6c757e";
        document.getElementById('error2').innerHTML = "Ačiū už pranešimą!";
      }
    else {
      document.getElementById('error2').style.color = "#dc3546";
      document.getElementById('error2').innerHTML = "Neužpildėte visų viršuje esančių laukelių!";
    }

  }

  verifyCallback = (response) => {
    this.setState({patvirtinta: true});
  }

  render() {

    const recaptchaRef = React.createRef();

    return (
      <div className="p-0 m-0 mt-2">



            <TextInput komentaras={this.stateKomentaras.bind(this)} />

            <WindowSearch tagas={this.stateTagas.bind(this)}/>

            <center  className="m-0" style={{overflow: "hidden"}}>
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6Le_kYkUAAAAACWS3AUOHwbKtaZnhBQCOR3PiRZe"
                onChange={this.verifyCallback}
                size = "normal"
              />
            </center>
            <div className="text-center m-0">

              <div className="p-0 m-0" style={{color: "#dc3546", padding: "10px", fontSize: "14px", paddingBottom: "10px"}} id="error2"></div>
              <button onClick={this.submit} id="submit" className="btn btn-sm btn-primary auto mt-2 mb-2">Skelbti</button>


            </div>


      </div>

    )
  }
}

export default CommentModel;
