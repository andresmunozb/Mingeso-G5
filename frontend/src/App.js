import React, { Component } from 'react';
import logo from './components/logo.svg';
import './components/App.css';
import Header from './components/Global/Header';
import { Switch, Route, Redirect } from 'react-router-dom'
import Admin from "./components/Admin/index"
import Student from "./components/Student/Solution/CodPage"
import NewExercise from "./components/NewExercise"
import DashBoardDefault from "./components/dashboard/dashboard"
import IssueListTeacher from "./components/Teacher/IssueList"
import IssueListBase from "./components/PaginationTablePageBase"
import FormPageBase from "./components/FormPageBase"
//<Route path= "/dashboardCordinador" render={(props) => <Admin {...props} isAuthed={"hola admin"}/>}/>
//REPETICION DE CODIGO EN RUTAS
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
          <Route path="/verEnunciadoProfesor" render={(props) => <FormPageBase {...props} type={"littleForm"} subtype={"lookUp"} speciality= {"prof"} title={"Detalles del enunciado"} navegation={"Ver Enunciado"} />} />
          <Route path="/verEnunciadoAlumno" render={(props) => <FormPageBase {...props} type={"littleForm"} subtype={"lookUp"} speciality= {"alumn"} title={"Detalles del enunciado"} navegation={"Ver Enunciado"} />} />
       
          <Route path= "/practica" render={(props) => <Student {...props} isAuthed={"hola student"}/>}/>
           <Redirect from= "/" to="/dashboardDefault"/>

         </Switch>
      </div>
      
    );
  }
}

export default App;
