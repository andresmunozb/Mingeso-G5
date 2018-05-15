import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Global/Header';
import { Switch, Route, Redirect } from 'react-router-dom'
import Admin from "./Admin/index"
import Student from "./Student/Solution/index"
import NewExercise from "./Teacher/Exercise/NewExercise"
import DashBoardDefault from "./dashboard/dashboard"
import IssueListTeacher from "./Teacher/Exercise/IssueList"

//<Route path= "/dashboardCordinador" render={(props) => <Admin {...props} isAuthed={"hola admin"}/>}/>

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Switch>
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
