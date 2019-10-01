import React, { Component } from "react";
import TextInput from "./TextInput";
import Search from "./Search";
import { restdb } from "./helper.js";
import ReCAPTCHA from "react-google-recaptcha";

class SearchBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      komentaras: "",
      vardas: "",
      tagas: "",
      Koordinates: "",
      patvirtinta: false
    };
  }

  stateKomentaras = (newKomentaras, newVardas) => {
    this.setState({ komentaras: newKomentaras, vardas: newVardas });
  };

  stateTagas = stotele => {
    if (stotele) {
      this.setState({ tagas: stotele.name, Koordinates: stotele.Koordinates });
    }
  };

  submit = () => {
    if (
      this.state.patvirtinta &&
      !!this.state.tagas &&
      !!this.state.vardas &&
      !!this.state.komentaras
    ) {
      var today = Math.floor(Date.now() / 1000);
      var naujasKomentaras = this.state;
      naujasKomentaras["data"] = today;
      naujasKomentaras["like"] = 0;

      restdb
        .post("/rest/komentarai", naujasKomentaras)
        .then(function(response) {});

      this.setState({ patvirtinta: false });
      window.grecaptcha.reset();
      var body = document.body; // For Safari
      var html = document.documentElement; // Chrome, Firefox, IE and Opera places the overflow at the html level, unless else is specified. Therefore, we use the documentElement property for these browsers

      body.scrollTop = 0;
      html.scrollTop = 0;

      document.getElementById("error").style.color = "#6c757e";
      document.getElementById("error").innerHTML = "Ačiū už pranešimą!";
    } else {
      document.getElementById("error").style.color = "#dc3546";
      document.getElementById("error").innerHTML =
        "Neužpildėte visų viršuje esančių laukelių!";
    }
  };

  verifyCallback = response => {
    this.setState({ patvirtinta: true });
  };

  render() {
    const recaptchaRef = React.createRef();

    return (
      <div className="container-fluid pt-3  sticky-top sticky-offset">
        <div className="bg-white shadow" style={{ borderRadius: "10px" }}>
          <div className="mx-3 pt-2">
            <TextInput komentaras={this.stateKomentaras.bind(this)} />

            <Search tagas={this.stateTagas.bind(this)} />

            <center className="mt-1" style={{ overflow: "hidden" }}>
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6Le_kYkUAAAAACWS3AUOHwbKtaZnhBQCOR3PiRZe"
                onChange={this.verifyCallback}
                id="rc-imageselect"
              />
            </center>
            <div className="text-center">
              <div
                style={{
                  color: "#dc3546",
                  padding: "5px",
                  fontSize: "14px",
                  paddingBottom: "10px"
                }}
                id="error"
              ></div>
              <button
                onClick={this.submit}
                id="submit"
                className="btn btn-primary auto mb-4"
              >
                Skelbti
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBlock;
