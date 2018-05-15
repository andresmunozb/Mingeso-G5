import React, { Component } from 'react';
import logo from './components/logo.svg';
import './components/App.css';
import Header from './components/Global/Header';
import { Switch, Route, Redirect } from 'react-router-dom'
import Admin from "./components/Admin/index"
import Student from "./components/Student/Solution/index"
import NewExercise from "./components/NewExercise"
import DashBoardDefault from "./components/dashboard/dashboard"
import IssueListTeacher from "./components/Teacher/IssueList"
import IssueListBase from "./components/PaginationTablePageBase"

//<Route path= "/dashboardCordinador" render={(props) => <Admin {...props} isAuthed={"hola admin"}/>}/>

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Switch>
           <Route path= "/listaEnunciadosProfesor" render={(props) => <IssueListBase {...props} type={"prof"}/>}/>
           <Route path="/listaEnunciadosAlumno" render={(props) => <IssueListBase {...props} type={"alumn"}/>}/>

          <Route path= "/dashboardDefault" render={(props) => <DashBoardDefault {...props} isAuthed={"hola admin"}/>}/>
          <Route path= "/nuevoEnunciado" render={(props) => <NewExercise {...props} estilos={"va a ser pequeño"}/>}/>
          <Route path= "/listaDeEnunciados" render={(props) => <IssueListTeacher {...props} isAuthed={"hola, soy una lista de enunciados de un profesor"}/>}/>
          <Route path= "/listaEnunciados" render={(props) => <Student {...props} isAuthed={"hola student"}/>}/>
           <Redirect from= "/" to="/dashboardDefault"/>

         </Switch>
      </div>
      
    );
  }
}

export default App;
