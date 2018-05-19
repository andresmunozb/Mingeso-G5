import React, { Component } from 'react';
import logo from './components/logo.svg';
import './components/App.css';
import Header from './components/Global/Header';
import { Switch, Route, Redirect } from 'react-router-dom'
import Admin from "./components/Admin/index"
import DashBoardDefault from "./components/dashboard/dashboard"
import IssueListTeacher from "./components/Teacher/IssueList"
import IssueListBase from "./components/PaginationTablePageBase"
import FormPageBase from "./components/FormPageBase"
import LoginPage from "./components/LoginPage"

//<Route path= "/dashboardCordinador" render={(props) => <Admin {...props} isAuthed={"hola admin"}/>}/>
//REPETICION DE CODIGO EN RUTAS
//        <Route path="/login" render={(props) => <LoginPage {...props}  />} />

class App extends Component {
  render() {
    return (
      <div className="App">
      <Header/>
        <Switch>
           <Route path= "/listaEnunciadosProfesor" render={(props) => <IssueListBase {...props} type={"prof"}/>}/>
           <Route path="/listaEnunciadosAlumno" render={(props) => <IssueListBase {...props} type={"alumn"}/>}/>
           <Route path="/editarEnunciado" render={(props) => <FormPageBase {...props}  type={"littleForm"} subtype={"edit"} title={"Edicion de enunciado"}  navegation={"Nuevo enunciado"}/>} />
          <Route path= "/dashboardDefault" render={(props) => <DashBoardDefault {...props} isAuthed={"hola admin"}/>}/>
          <Route path= "/nuevoEnunciado" render={(props) => <FormPageBase {...props} type={"littleForm"} subtype={"new"} title={"Crear enunciado"} navegation={"Ver Enunciado"} />} />
          <Route path="/verEnunciadoProfesor" render={(props) => <FormPageBase {...props} type={"littleForm"} subtype={"lookUp"} speciality= {"prof"} title={"Detalles del enunciado"} navegation={"Ver Enunciado"} />} />
          <Route path="/verEnunciadoAlumno" render={(props) => <FormPageBase {...props} type={"littleForm"} subtype={"lookUp"} speciality= {"alumn"} title={"Detalles del enunciado"} navegation={"Ver Enunciado"} />} />     
          <Route path= "/ejercitacionCodigo" render={(props) => <FormPageBase {...props} type={"biggerForm"} subtype={"lookUp"} speciality= {"alumn"} title={"Detalles del enunciado"} navegation={"Ver Enunciado"}/>}/>
           <Redirect from= "/" to="/dashboardDefault"/>

         </Switch>
      </div>
      
    );
  }
}
export default App;


/*
 ESTABLE

  class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/login" render={(props) => <LoginPage {...props}  />} />
        <Switch>
        <Header/>

           <Route path= "/listaEnunciadosProfesor" render={(props) => <IssueListBase {...props} type={"prof"}/>}/>
           <Route path="/listaEnunciadosAlumno" render={(props) => <IssueListBase {...props} type={"alumn"}/>}/>
           <Route path="/editarEnunciado" render={(props) => <FormPageBase {...props}  type={"littleForm"} subtype={"edit"} title={"Detalles del enunciado"}  navegation={"Nuevo enunciado"}/>} />

          <Route path= "/dashboardDefault" render={(props) => <DashBoardDefault {...props} isAuthed={"hola admin"}/>}/>
          <Route path= "/nuevoEnunciado" render={(props) => <FormPageBase {...props} type={"littleForm"} subtype={"new"} title={"Crear enunciado"} navegation={"Ver Enunciado"} />} />
          <Route path="/verEnunciadoProfesor" render={(props) => <FormPageBase {...props} type={"littleForm"} subtype={"lookUp"} speciality= {"prof"} title={"Detalles del enunciado"} navegation={"Ver Enunciado"} />} />
          <Route path="/verEnunciadoAlumno" render={(props) => <FormPageBase {...props} type={"littleForm"} subtype={"lookUp"} speciality= {"alumn"} title={"Detalles del enunciado"} navegation={"Ver Enunciado"} />} />     
          <Route path= "/ejercitacionCodigo" render={(props) => <FormPageBase {...props} type={"biggerForm"} subtype={"lookUp"} speciality= {"alumn"} title={"Detalles del enunciado"} navegation={"Ver Enunciado"}/>}/>
           <Redirect from= "/" to="/login"/>

         </Switch>
      </div>
      
    );
  }
}*/