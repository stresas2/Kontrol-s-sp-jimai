import React, { Component } from "react";
import SearchBlock from "./Components/SearchBlock";
import Header from "./Components/Header";
import Comments from "./Components/Comments";
import Map3 from "./Components/Map3";
import "./App.css";
import { Switch, Route } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const home = () => {
      return (
        <React.Fragment>
          <div
            className="col col-4 d-none d-md-block p-0 m-0"
            style={{
              minHeight: "calc(100vh - 50px)",
              zIndex: 0,
              backgroundColor: "#e8e7e2"
            }}
          >
            <SearchBlock />
          </div>

          <div
            className="col col-md-8 col-sm-12 p-0 m-0"
            style={{
              minHeight: "calc(100vh - 50px)",
              minWidth: "320px",
              backgroundColor: "#e8e7e2"
            }}
          >
            <Comments />
          </div>
        </React.Fragment>
      );
    };

    const map = () => {
      return (
        <div
          className="col col-12 p-0 m-0"
          style={{
            minHeight: "calc(100vh - 50px)",
            backgroundColor: "#e8e7e2"
          }}
        >
          <Map3 />
        </div>
      );
    };

    return (
      <div
        className="container"
        style={{ minHeight: "100%", maxWidth: "100%", minWidth: "320px" }}
      >
        <div className="row">
          {/* virsus */}

          <div className="col col-12 p-0 m-0 sticky-top" style={{ zIndex: 1 }}>
            <Header />
          </div>

          {/* kairys sonas */}
          <div
            className="col col-1 d-none d-lg-block "
            style={{ backgroundColor: "#e8e7e2" }}
          ></div>

          {/* pagrindas */}
          <div className="col col-xs-12 col-sm-12 col-md-12 col-lg-10 p-0 m-0 ">
            <div className="container-fluid">
              <div className="row">
                <Switch>
                  <Route path="/" component={home} exact />

                  <Route path="/map" component={map} />

                  <Route component={home} />
                </Switch>
              </div>
            </div>
          </div>

          {/* desinys sonas */}
          <div
            className="col col-1 d-none d-lg-block"
            style={{ backgroundColor: "#e8e7e2" }}
          ></div>
        </div>
      </div>
    );
  }
}

export default App;
