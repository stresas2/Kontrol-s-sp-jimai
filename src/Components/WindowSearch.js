import React, { Component } from 'react';
import './search.css';
import Stoteles from '../data/stoteles.json';



class WindowSearch extends Component {
  constructor(props) {
    super(props);
    this.state =
    {
        tagas: "",
        Koordinates: ""
    };

    this.onDelete = this.onDelete.bind(this);
  }

   stotelesFilter(e) {


     var chars = {
                  'Ą':'A',
                  'Č':'C',
                  'Ę':'E',
                  'Ė':'E',
                  'Į':'I',
                  'Š':'S',
                  'Ų':'U',
                  'Ū':'U',
                  'Ž':'Z'
                };

     var input, filter, ul, li, a, i;
     input = document.getElementById("myInput2");
     filter = input.value.toUpperCase().replace(/[ĄČĘĖĮŠŲŪŽ]/g, m => chars[m]);
     ul = document.getElementById("myUL2");
     li = ul.getElementsByTagName("li");
     for (i = 0; i < li.length; i++) {
         a = li[i];

         if (a.innerHTML.toUpperCase().replace(/[ĄČĘĖĮŠŲŪŽ]/g, m => chars[m]).indexOf(filter) > -1) {
             li[i].style.display = "";
         } else {
             li[i].style.display = "none";
         }
     }
   };

   handleClick(stotele){
     this.setState({ tagas: stotele.name, Koordinates: stotele.Koordinates});
     this.props.tagas(stotele);
   };

   onDelete(){
     this.setState({ tagas: undefined, Koordinates: undefined });
     this.props.tagas(undefined)
   };

  render() {

    var stoteles = Stoteles;

    function compare(a, b) {
      // Use toUpperCase() to ignore character casing
      const genreA = a.name.toUpperCase();
      const genreB = b.name.toUpperCase();

      let comparison = 0;
      if (genreA > genreB) {
        comparison = 1;
      } else if (genreA < genreB) {
        comparison = -1;
      }
      return comparison;
    }

    stoteles.sort(compare);

    stoteles = stoteles.map((stoteles) =>
      <li onClick={this.handleClick.bind(this, stoteles)} key={stoteles.name} > {stoteles.name} </li>
    );

    return (
      <div className="px-2 pb-1">
          <div className="border border-ligth">

          <div className="input-group border-bottom">
            <div className="input-group-prepend">
              <div className="input-group-text border-0 rounded-0" style={{backgroundColor: "#87acb5"}}>
                <i className="fa fa-search" style={{color: "#fff", fontSize: "20px"}}></i>
              </div>
            </div>
            <input type="text" className="form-control border-0 rounded-0" id="myInput2" placeholder="Stotelės paieška..." onChange = {this.stotelesFilter}  />
          </div>

              <ul className="d-block text-dark" id="myUL2">
                {stoteles}
              </ul>
          </div>

            { this.state.tagas ? <button className="btn btn-sm btn-primary mt-1" onClick={this.onDelete}> {this.state.tagas} <span aria-hidden="true">&times;</span></button>  : null  }

      </div>
    );

  }
}

export default WindowSearch;
