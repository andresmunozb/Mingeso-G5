import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Global/Header';
import { Switch, Route, Redirect } from 'react-router-dom'
import Admin from "./Admin/index"
import Student from "./Student/Solution/index"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Switch>
           <Route path= "/hola" render={(props) => <Admin {...props} isAuthed={"hola admin"}/>}/>
           <Route path= "/hola2" render={(props) => <Student {...props} isAuthed={"hola student"}/>}/>
           <Redirect from= "/" to="/hola2"/>

         </Switch>
      </div>
      
    );
  }
}

export default App;
