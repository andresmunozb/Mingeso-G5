
import React, { Component } from 'react';
import ExerciseIterator from './ExerciseIterator'
import Axios from 'axios'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ThemeDefault from '../ThemeList';
import Paper from 'material-ui/Paper';
import ReactPaginate from 'react-paginate';
import { Form,Divider } from 'semantic-ui-react'

const background = {
    bigFrame:{
      padding: 30,
      position:'relative'
    }



}
class ExerciseListUnpublishedTeacher extends Component {
    constructor(props) {
      super(props);
      this.deleteExercise = this.deleteExercise.bind(this);
      this.deleteFromList = this.deleteFromList.bind(this);
      this.editExercise = this.editExercise.bind(this);
      this.viewExercise = this.viewExercise.bind(this);
      this.getExercises = this.getExercises.bind(this);
      this.getPagination = this.getPagination.bind(this);
      this.updateData = this.updateData.bind(this);
      this.handlePageClick = this.handlePageClick.bind(this);
      this.isValid = this.isValid.bind(this);

    }
    state = {

      unpublishedItems: [],
      currentPage:0,
      pageCount:0,
      offers :{},
      filterOffers: {},
      currentPageItems: [],
      filtered:"",
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
          ]
          
    }
    getExercises(){
      var _this = this;
      //GET formal es con id del usuario
     //Axios.get('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/exercises/'+this.props.id.toString()+'/unpublished')
     //Get por ahora es con id 1 
     Axios.get('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/exercises/1/unpublished')
      .then(response => {
          console.log("soy los ejercicios")
           console.log(response.data)
           _this.setState({ unpublishedItems: response.data });
           setTimeout(() => {
              _this.getPagination(null)
           }, 5);
          

        })
      .catch(function(error) {
           console.log(error)
     })

    }
  
    componentWillMount () {
      this.getExercises();

    }

    deleteFromList(idRemove){
        var _this = this;
        console.log("el ID a borrar fue: ")
        console.log(idRemove)
      let unpublishedItemsNew = _this.state.unpublishedItems
      //Busca el elemento a borrar
      var removeIndex = unpublishedItemsNew.map(function(item) { return item.id; }).indexOf(idRemove);
      console.log("el elemento a borrar fue: ")
      console.log(removeIndex)
      //Borrar elemento
      unpublishedItemsNew.splice(removeIndex,1)
      //Setteo de json de exercises y que se realice la paginacion de nuevo (Redibujar)
      _this.setState({
          unpublishedItems: unpublishedItemsNew
      });
      setTimeout(() => {
          console.log("soy el evento filtrado");
          console.log(_this.state.filtered)
          
          if(_this.state.filtered.length !== 0){
                _this.filterList(_this.state.filtered)
              }
          else{
                _this.setState({filtered:""})
                setTimeout(() => {
                _this.getPagination(null)
                }, 1);
          }
     }, 1);
    }
    editExercise(exercise){
      var testcases;
      Axios.get('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/exercises/'+exercise.id+'/testcases')
      .then(response => {
            console.log("soy los testcases")
            testcases = response.data
            this.props.history.push('edit_exercise',{ editAExercise: exercise, getTestCases: testcases })
      })
      .catch(function(error) {
           console.log(error)
      })
    }
    viewExercise(exercise){
      var testcases;
      Axios.get('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/exercises/'+exercise.id+'/testcases')
      .then(response => {
            console.log("soy los testcases")
            testcases = response.data
            this.props.history.push('view_exercise_teacher',{ viewAExercise: exercise, getTestCases: testcases })
      })
      .catch(function(error) {
           console.log(error)
      })
    }
  
    deleteExercise (exercise) {
      console.log("A borrar");

      console.log(exercise.id);
      var _this = this;
      let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "@crossorigin",
        }
      };   
      Axios.delete('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/exercises/'+exercise.id+'/delete',axiosConfig)
        .then((res) => {
            //Localmente quitarle al json de los exercises el exercise borrado 
            setTimeout(() => {
               _this.deleteFromList(exercise.id)
            }, 1);
            })
        .catch((err) => {
            console.log("AXIOS ERROR: ", err);
          })
      
    }
    isValid(str){
        //Si hay alguno de estos caracteres, retornar falso
        return /[~`!#$%^&*+=\-[\]\\';,/{}|\\":<>?]/g.test(str);
    }
    filterList(event) {
      let obj = this.state.unpublishedItems;
     // let obj = this.state.jsons;
      let filteredArray = [];
      Object.keys(obj).forEach(function (key) {
        filteredArray.push(obj[key]);
      });
      if(event.constructor === String){
        filteredArray = filteredArray.filter((item) => {
            if(this.isValid(event)){
              var cons = '\\'.concat(event);
              return  item.title.search(cons) !== -1;
            }
            else{
              return item.title.toLowerCase().search(event.toLowerCase()) !== -1;
  
            }
          //Si el caracter es valido, se puede buscar  
        });
          this.setState({filtered:event})
      }
      else{
        filteredArray = filteredArray.filter((item) => {
            if(this.isValid(event.target.value)){
              var cons = '\\'.concat(event.target.value);
              return  item.title.search(cons) !== -1;
            }
            else{
              return item.title.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
  
            }
          //Si el caracter es valido, se puede buscar  
        });
         this.setState({filtered:event.target.value})

      }
      setTimeout(() => {        
        this.getPagination(filteredArray);
     }, 1);
      
      
    }
    getPagination(data){
      console.log("soy los exercises")
      console.log(this.state.jsons)

      console.log("soy los exercises verdaderos")
      console.log(this.state.unpublishedItems)
      let _this = this;
      var keys;
      if(data === null){
        keys = Object.keys(this.state.unpublishedItems)
       // keys = Object.keys(this.state.jsons);
      }
      else{
       // keys = this.getKeys(data)
       keys = Object.keys(data);
       console.log(keys)
      }
      
      console.log("soy los keys")
      console.log(keys)
       let pageLength = 8;
       let pageCount = Math.ceil(keys.length / pageLength);
       let pages = [];
       let query;
      // this.setState({pageCount:pageCount});
       if(data == null){
        for (let i = 0; i < pageCount; i++) {
          let key = keys[i * pageLength];
             if(this.state.unpublishedItems.length>=1) {
                 query = this.state.unpublishedItems.slice(key, (i+1)*pageLength);
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
      let {filterOffers} = this.state;
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
           
          <Form style={{textAlign:"center"}} >
                <h1 >Enunciados no publicados</h1>
                    <Form.Field>
                        <label >Campo de busqueda</label>
                        <input  placeholder='Buscar ...' 
                                onChange={this.filterList.bind(this)}
                                style={{width: 300}}  />
                    </Form.Field>
                <Divider/>
                <ExerciseIterator deleteExercise = {this.deleteExercise} 
                                  published= {false} 
                                  /*exercises = { this.state.unpublishedItems }*/
                                  exercises = { this.state.currentPageItems } 
                                  editExercise = {this.editExercise}
                                  viewExercise = {this.viewExercise}
                                  />

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

          </Form>

          </Paper>

        </MuiThemeProvider>

      );
      
    }
  }
  /*
 }*/
  export default ExerciseListUnpublishedTeacher;
  