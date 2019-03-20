import React, { Component } from 'react';
import { restdb, realtimeURL } from './helper.js';
import FadeIn from 'react-fade-in';
import axios from 'axios';
import Map2 from './Map2';
import Modal from 'react-modal';
import update from 'immutability-helper';
import Cookies from 'universal-cookie';
import CommentModel from './CommentModel';
import Media from "react-media";

class Comments extends Component {

  constructor(props) {
    super(props);
    this.state = {
      komentarai: [],
      loading: true,
      model: {
              showModal: false,
              name: "",
              Koordinates: ""
            },
      model2: false
    }

    let eventSource = new EventSource(realtimeURL);

    eventSource.addEventListener('post', (e) => {


        var fulldata = JSON.parse(e.data);
        var data = fulldata.data;
        delete data._version;
        delete data.data;
        var today = Math.floor(Date.now() / 1000)
        data['data'] = today;
        this.newComment(data)

    }, false);


  }

  componentDidMount() {

    this.uploadAllComments();

  }

  loading = () => {

    this.setState({komentarai: this.state.komentarai, loading: true})

  }

  newComment(data){

    var allStatuses = this.state.komentarai;
    allStatuses.unshift(data);
    this.setState({komentarai: allStatuses, loading: false});

  }


  uploadAllComments = () => {

    this.setState({ komentarai: this.state.komentarai, loading: true });

      restdb.get("/rest/komentarai")
      .then(res => {
        var komentai = res.data;
        komentai.sort(function(b, a){return a.data - b.data });
        this.setState({ komentarai: komentai, loading: false });
     });

  }

  openMap = (stotele) => {

      this.setState({ komentarai: this.state.komentarai, loading: this.state.loading, model: {showModal: true, name: stotele.tagas, Koordinates: stotele.Koordinates}, model2: this.state.model2 });

  }

  closeMap = () => {

      this.setState({ komentarai: this.state.komentarai, loading: this.state.loading, model: {showModal: false, name: this.state.model.name, Koordinates: this.state.model.Koordinates}, model2: this.state.model2 });

  }

  openComment = (stotele) => {

      this.setState({ komentarai: this.state.komentarai, loading: this.state.loading, model: {showModal: this.state.model.showModal, name: stotele.tagas, Koordinates: stotele.Koordinates}, model2: true });

  }

  closeComment = () => {

      this.setState({ komentarai: this.state.komentarai, loading: this.state.loading, model: {showModal: this.state.model.showModal, name: this.state.model.name, Koordinates: this.state.model.Koordinates}, model2: false });

  }

  increase = (vardas) => {

      const cookies = new Cookies();

      if(!cookies.get(vardas._id))
      {
        var index = this.state.komentarai.findIndex((emp) => emp._id === vardas._id);
        vardas.like += 1;
        const updatedLikes = update(this.state.komentarai, {$splice: [[index, 1, vardas]]});  // array.splice(start, deleteCount, item1)
        this.setState({komentarai: updatedLikes});

        cookies.set(vardas._id, "1", { path: '/' });

        restdb.put('/rest/komentarai/' + vardas._id, vardas)
         .then(function (response) {
         })

      }

  }

  decrease = (vardas) => {

    const cookies = new Cookies();

    if(!cookies.get(vardas._id))
    {
      var index = this.state.komentarai.findIndex((emp) => emp._id === vardas._id);
      vardas.like -= 1;
      const updatedLikes = update(this.state.komentarai, {$splice: [[index, 1, vardas]]});  // array.splice(start, deleteCount, item1)
      this.setState({komentarai: updatedLikes});


      cookies.set(vardas._id, "0", { path: '/' });

      restdb.put('/rest/komentarai/' + vardas._id, vardas)
       .then(function (response) {
       })
    }

  }


  render() {

    const cookies = new Cookies();


    function size() {

      var size2;
      if (window.matchMedia("(min-width: 768px)").matches) {
       size2 = "65%";
      } else {
       size2 = "100%";
     }
      return size2;

    };

    function borderSize() {

      var size2;
      if (window.matchMedia("(min-width: 768px)").matches) {
       size2 = "1px";
      } else {
       size2 = "0px";
     }
      return size2;

    };

    const customStyles =
    {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        width                 : '100%',
        height                : '100vh',
        marginTop             : '0px',
        maxWidth              : '700px',
        maxHeight             : size(),
        paddingBottom         : '5px',
        paddingTop            : '0px',
        borderRadius          : '0px',
        borderWidth           : borderSize(),

      },
      overlay: {zIndex: 10}
    };



    var mapas =
    <Modal
    isOpen={this.state.model.showModal}
    contentLabel="Example Modal"
    style={customStyles}
    >
      <div className="text-right pt-1 mt-2">
        <span onClick={this.closeMap} id="exit" className="h1 font-weight-bold" id="exit" style={{}}>&times;</span>
      </div>
      <Map2 vardas={this.state.model.name} koordinates={this.state.model.Koordinates} />
      <div className="text-center">
        <p className="text-dark h6 pt-2" style={{lineHeight: 1.5}}>{this.state.model.name}</p>
      </div>
    </Modal>;

    var newComment2 =
    <Modal
    isOpen={this.state.model2}
    contentLabel="Example Modal"
    style={customStyles}

    >

    <div className="frame">
      <div className="scroll">

       <div className="float-right pt-1">
         <span onClick={this.closeComment} id="exit" className="h1 font-weight-bold" id="exit" style={{}}>&times;</span>
       </div>

       <CommentModel />

     </div>
   </div>


    </Modal>;

    function laikas(paskelbta){
        var dataNow = Math.floor(Date.now() / 1000);
        var res = Math.abs(dataNow - paskelbta);
        //var sekundes = res % 60;
        var minutes = Math.floor(res / 60) % 60;
        var valandos = Math.floor(res / 3600) % 24;
        //var dienos = Math.floor(res / 86400);

       return valandos + ' h ' + minutes + ' min ';
    };


    var listItems;
    var loading;

    if (this.state.loading){
      loading =
      <center><img src="/css/loader2.gif" alt="" /></center>;
    }

      listItems = this.state.komentarai.map((vardas) =>

      <div className="container-fluid bg-white mb-4 fade-in p-0 shadow" key={vardas._id} style={{borderRadius: "10px"}}>

            <div style={{height: "40px", backgroundColor: "#849b9c", borderRadius: "10px 10px 0px 0px"}}>
              <div className="d-flex flex-nowrap">
                <div className="p-2"   style={{overflowX: 'hidden', textOverflow: 'ellipsis'}}>
                  <i className="fas fa-user d-inline mr-2"></i>
                  <span className="d-inline">{vardas.vardas}</span>
                </div>
                <div className="ml-auto no-wrap">
                  <div className="p-2">
                    Prieš: { laikas(vardas.data) } <i className='far fa-clock'></i>
                  </div>
                </div>
              </div>
            </div>

            <div className="container-fluid  text-dark text-justify p-3 text-wrap" style={{minHeight:80}}>
               {vardas.komentaras}
             </div>

             <hr className="m-0 p-0" />

             <div className="d-flex">

              <div className="p-2 ml-2">
                <i className='fas fa-thumbs-up pr-2' id="like" onClick={this.increase.bind(this, vardas)} style={{ fontSize: "20px"  }}></i>

                { vardas.like > 0 ?

                  <b className="text-success">{vardas.like}</b> :
                  <b className="text-danger">{vardas.like}</b>

                }

                <i className='fas fa-thumbs-down  pl-2' id="dislike" onClick={this.decrease.bind(this, vardas)} style={{ fontSize: "20px"  }}></i>

              </div>

              <div className="ml-auto">
               <button className="btn btn-outline-warning m-1 btn-sm" onClick={this.openMap.bind(this, vardas)}>{vardas.tagas}</button>

               <i className='fas fa-map-marker-alt m-2' style={{fontSize: "20px", color: "#87acb5" }}></i>
              </div>

             </div>


        </div>


      );

      const emty =
      <div className="container-fluid bg-white mb-4 fade-in p-0 shadow" style={{borderRadius: "10px", height: "60px", position: "relative"}}>

        <div className="text-dark text-center center">Nėra pranešimų!</div>

      </div>;

      const mobileButton =

      <div className="d-block d-md-none fixed-bottom mb-3 dot bg-light" onClick={this.openComment} style={{left: "44%"}}>
        <i className='far fa-edit' id="mobileButton"></i>
      </div>;


    return (

    <div className="m-3" >
    {loading}

    {!listItems.length && !this.state.loading ? emty : null}

    {listItems}

    {mapas}

    {newComment2}

    {this.state.model2 || this.state.model.showModal ? null : mobileButton}
    </div>
    );

  }
}

export default Comments;
