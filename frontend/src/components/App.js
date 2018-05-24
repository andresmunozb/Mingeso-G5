import React, { Component } from 'react';
import './App.css';
import Header from './Global/Header';
import Body from './Global/Body';
import firebase from 'firebase';
import routes from './routes'
import Elements from './Student/ExerciseListFolder/ExerciseListStudent'
import Elements2 from './Teacher/CreateExerciseForm'
import Elements3 from './Teacher/EditExerciseForm'
import Elements4 from './Teacher/ExerciseListFolder/ExerciseListUnpublishedTeacher'
import Elements5 from './Teacher/ExerciseListFolder/ExerciseListPublishedTeacher'


import Axios from 'axios'

class App extends Component {
  constructor () {
    super()
    this.handleAuth = this.handleAuth.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  state = {
    user: null
  }

  componentWillMount () {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
      console.log(user);

    })
  }

  handleAuth () {
    const provider = new firebase.auth.GoogleAuthProvider()
    provider.addScope('https://www.googleapis.com/auth/plus.login')


    firebase.auth().signInWithPopup(provider)
      .then(result => console.log(`${result.user} ha iniciado sesión`))
      .catch(error => console.log(`Error ${error.code}: ${error.message}`))
  }

  handleLogout () {
    firebase.auth().signOut()
      .then(result => console.log('Te has desconectado correctamente'))
      .catch(error => console.log(`Error ${error.code}: ${error.message}`))
  }


  
  render() {
    return (
      <div className="App">
        <Header
        user={this.state.user}
        onAuth={this.handleAuth}
        onLogout={this.handleLogout}/>
        <Elements/>
      </div>
    );
  }
}

export default App;
