
import React, { Component } from 'react';
import ExerciseIterator from './ExerciseIterator'
import Axios from 'axios'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ThemeDefault from '../ThemeList';
import Paper from 'material-ui/Paper';
import ReactPaginate from 'react-paginate';
import { Form, TextArea,Grid,Button,Divider } from 'semantic-ui-react'
import {Link,Redirect} from 'react-router-dom';

const background = {
    bigFrame:{
      width: 1300,
      padding: 30,
      position:'relative'
    }



}
class ExerciseListUnpublishedTeacher extends Component {
    constructor(props) {
      super(props);
      this.state = {
        unpublishedItems: [],
        currentPage:0,
        pageCount:0,
        offers :{},
        filterOffers: {},
        currentPageItems: [],
        jsons: [{
                    "title": "Chela",
                    "description": "ojala nunca",
                    "published": false,"id":251
                },
                {
                    "title": "agua",
                    "description": "ojala nuncax4 ",
                    "published": false, "id":252

                },
                {
                    "title": "vaso plastico",
                    "description": "ojala nuncax2",
                    "published": false, "id":264

                },
                {
                    "title": "agua",
                    "description": "ojala nuncax4 ",
                    "published": false, "id":278
                },
                  {
                    "title": "vaso plastico",
                    "description": "ojala nuncax2",
                    "published": false, "id":279
                },
                {
                  "title": "vaso plastico",
                  "description": "ojala nuncax2",
                  "published": false, "id":280

                },
                  {
                    "title": "Chela",
                    "description": "ojala nunca",
                    "published": false, "id":290
                },
                {
                    "title": "agua",
                    "description": "ojala nuncax4 ",
                    "published": false, "id":295

                },
                {
                    "title": "vaso plastico",
                    "description": "ojala nuncax2",
                    "published": false, "id":296

                },
                {
                    "title": "agua",
                    "description": "ojala nuncax4 ",
                    "published": false, "id":298
                },
                  {
                    "title": "vaso plastico",
                    "description": "ojala nuncax2",
                    "published": false, "id":300
                },
                {
                  "title": "vaso plastico",
                  "description": "ojala nuncax2",
                  "published": false, "id":301

                  },
                  {
                    "title": "Chela",
                    "description": "ojala nunca",
                    "published": false, "id":302
                },
                {
                    "title": "agua",
                    "description": "ojala nuncax4 ",
                    "published": false, "id":303

                },
                {
                    "title": "vaso plastico",
                    "description": "ojala nuncax2",
                    "published": false, "id":304

                },
                {
                    "title": "agua",
                    "description": "ojala nuncax4 ",
                    "published": false, "id":306
                },
                  {
                    "title": "vaso plastico",
                    "description": "ojala nuncax2",
                    "published": false, "id":305
                },
                {
                  "title": "vaso plastico",
                  "description": "ojala nuncax2",
                  "published": false, "id":310

                },
                {
                  "title": "Chela",
                  "description": "ojala nunca",
                  "published": false, "id":315
                },
                {
                    "title": "agua",
                    "description": "ojala nuncax4 ",
                    "published": false, "id":316

                },
                {
                    "title": "vaso plastico",
                    "description": "ojala nuncax2",
                    "published": false, "id":317

                },
                {
                    "title": "agua",
                    "description": "ojala nuncax4 ",
                    "published": false, "id":318
                },
                  {
                    "title": "vaso plastico",
                    "description": "ojala nuncax2",
                    "published": false, "id":320
                },
                {
                  "title": "vaso plastico",
                  "description": "ojala nuncax2",
                  "published": false, "id":321

                },
                  {
                    "title": "Chela",
                    "description": "ojala nunca",
                    "published": false, "id":322
                },
                {
                    "title": "agua",
                    "description": "ojala nuncax4 ",
                    "published": false, "id":333

                },
                {
                    "title": "vaso plastico",
                    "description": "ojala nuncax2",
                    "published": false, "id":334

                },
                {
                    "title": "agua",
                    "description": "ojala nuncax4 ",
                    "published": false, "id":335
                },
                  {
                    "title": "vaso plastico",
                    "description": "ojala nuncax2",
                    "published": false, "id":336
                },
                {
                  "title": "vaso plastico",
                  "description": "ojala nuncax2",
                  "published": false, "id":338

                  },
                  {
                    "title": "Chela",
                    "description": "ojala nunca",
                    "published": false, "id":340
                },
                {
                    "title": "agua",
                    "description": "ojala nuncax4 ",
                    "published": false, "id":356
                },
                {
                    "title": "vaso plastico",
                    "description": "ojala nuncax2",
                    "published": false, "id":357                    

                },
                {
                    "title": "agua",
                    "description": "ojala nuncax4 ",
                    "published": false, "id":358
                },
                  {
                    "title": "vaso plastico",
                    "description": "ojala nuncax2",
                    "published": false, "id":360
                },
                {
                  "title": "vaso plastico",
                  "description": "ojala nuncax2",
                  "published": false, "id":361

                }
            ],
            
        }
      this.deleteExercise = this.deleteExercise.bind(this);
      this.editExercise = this.editExercise.bind(this);
      this.viewExercise = this.viewExercise.bind(this);
      this.deleteFromList = this.deleteFromList.bind(this);

      this.getExercises = this.getExercises.bind(this);
      this.getPagination = this.getPagination.bind(this);
      this.updateData = this.updateData.bind(this);
      this.handlePageClick = this.handlePageClick.bind(this);


    }
    getExercises(){
     /* Axios.get('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/exercises/unpublished')
      .then(response => {
           this.setState({ unpublishedItems: response.data }, this.getPagination(null));
           console.log(response.data)
        })
      .catch(function(error) {
           console.log(error)
     })*/
     this.getPagination(null);

    }
  
    componentWillMount () {
      this.getExercises();

    }

    deleteFromList(idRemove){
      let unpublishedItemsNew = this.state.unpublishedItems
      //Busca el elemento a borrar
      var removeIndex = unpublishedItemsNew.map(function(item) { return item.id; }).indexOf(idRemove);
      //Borrar elemento
      unpublishedItemsNew.splice(unpublishedItemsNew,1)
      //Setteo de json de exercises y que se realice la paginacion de nuevo (Redibujar)
      this.setState({
          unpublishedItems: unpublishedItemsNew
      }, this.getPagination(null));
    }
  
    deleteExercise (exercise) {
      console.log("A borrar");

      console.log(exercise);
      let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "@crossorigin",
        }
      };   
     /* Axios.delete('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/exercises/'+exercises.id+'/delete',axiosConfig)
        .then((res) => {
            console.log("RESPONSE RECEIVED: ", res);
            //Localmente quitarle al json de los exercises el exercise borrado 
              deleteFromList(exercises.id)


          })
        .catch((err) => {
            console.log("AXIOS ERROR: ", err);
          })
      */
    }
    editExercise(exercise){
      console.log("A editar");

      console.log(exercise);
     /* <Redirect to={{
        pathname: '/login',
        search: '?utm=your+face',
        state: { editAExercise: exercise }
      }}/>*/
      

    }
    viewExercise(exercise){
      console.log("A ver");

      console.log(exercise);
     /* <Redirect to={{
        pathname: '/login',
        search: '?utm=your+face',
        state: { viewAExercise: exercise }
      }}/>*/
      

    }
    filterList(event) {
      //let obj = this.state.unpublishedItems;
      let obj = this.state.jsons;
      let filteredArray = [];
      let filterObjects = [];
      Object.keys(obj).forEach(function (key) {
        filteredArray.push(obj[key]);
      });
      
      filteredArray = filteredArray.filter((item) => {
        return item.title.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
   
      });
      
      this.getPagination(filteredArray);
      
      
    }
    getPagination(data){
      let _this = this;
      var keys;
      if(data === null){
        //keys = Object.keys(this.state.unpublishedItems)
        keys = Object.keys(this.state.jsons);
      }
      else{
       // keys = this.getKeys(data)
       keys = Object.keys(data);
       console.log(keys)
      }
       let pageLength = 8;
       let pageCount = Math.ceil(keys.length / pageLength);
       let pages = [];
       let query;
      // this.setState({pageCount:pageCount});
       if(data == null){
        for (let i = 0; i < pageCount; i++) {
          let key = keys[i * pageLength];
             if(this.state.jsons.length /*this.state.unpublishedItems.length*/>=1) {
                 query = /*this.state.unpublishedItems*/this.state.jsons.slice(key, (i+1)*pageLength);
                 pages.push(query);
             }
         }
       }
       else{
        for (let i = 0; i < pageCount; i++) {
          let key = keys[i * pageLength];
             if(data.length >=1) {
                 query = data.slice(key, (i+1)*pageLength);
                 pages.push(query);
             }
         }
       }
       
       _this.setState({offers: pages, pageCount: pageCount, filterOffers: pages}, this.updateData);
   
   
    }
    updateData(){
      let {filterOffers,offers, isFirstPage, isLastPage} = this.state;
      var currentPage = this.state.currentPage;
      
     if(currentPage >= this.state.pageCount){
          currentPage = this.state.pageCount-1;
      }
      let currentDataNow = {};
       for (let i = 0; i < filterOffers.length; i++) {
         if(currentPage === i){
            currentDataNow = filterOffers[i];
         }
       
       }
       this.setState({
        currentPageItems: currentDataNow
        });
    }

    handlePageClick = (data) => {
    
        let selected = data.selected;
        this.setState({currentPage:selected},this.updateData);
      
    }
   
  
    
    render() {

      return (
        <MuiThemeProvider muiTheme={ThemeDefault}>  
          <Paper style={background.bigFrame}>
            <h1>Enunciados no publicados</h1>
            <div className="tableElm" >
                <Form.Field>
                     <label>Campo de busqueda</label>
                     <input  placeholder='Buscar ...' 
                             onChange={this.filterList.bind(this)}  />
                </Form.Field>
            </div>
            <Divider/>
            <ExerciseIterator deleteExercise = {this.deleteExercise} 
                              viewExercise = {this.viewExercise} 
                              editExercise = {this.editExercise} 
                              published= {false} 
                              /*exercises = { this.state.unpublishedItems }*/
                              exercises = { this.state.currentPageItems } />

            <div className="commentBox" id="react-paginate">
                  <ReactPaginate previousLabel={"Anterior"}
                              nextLabel={"Siguiente"}
                              breakLabel={<a href="">...</a>}
                              breakClassName={"break-me"}
                              pageCount={this.state.pageCount}
                              marginPagesDisplayed={2}
                              pageRangeDisplayed={3}
                              onPageChange={this.handlePageClick}
                              containerClassName={"pagination"}
                              subContainerClassName={"pages pagination"}
                              activeClassName={"active"} />
                </div>
          </Paper>

        </MuiThemeProvider>

      );
      
    }
  }
  /*
 }*/
  export default ExerciseListUnpublishedTeacher;
  