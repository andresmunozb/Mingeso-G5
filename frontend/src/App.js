import React, { Component } from 'react';
import Header from './components/Global/Header/Header';
import Body from './components/Global/Body';
import firebase from 'firebase';
import routes from './routes'


class App extends Component {
  constructor () {
    super()
    this.handleAuth = this.handleAuth.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.getRol = this.getRol.bind(this)
    this.routesFilter = this.routesFilter.bind(this)
  }

  state = {
    user: null,
    rol: "student",
    routes: routes,
    routesFiltered:[],
  }

  getRol(){

  }
  routesFilter(rol){
    let newRoutesFiltered = this.state.routes.filter(function(route){
      return(route.rol === rol)
    });
    this.setState({
      routesFiltered: newRoutesFiltered,
    });
  }

  componentWillMount () {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
      console.log(user);
    })
    this.getRol();
    this.routesFilter(this.state.rol);
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
    console.log(this.state)
    return (
      <div className="App">
        <Header
        user={this.state.user}
        onAuth={this.handleAuth}
        onLogout={this.handleLogout}
        routes={this.state.routesFiltered}
        />
        <Body user={this.state.user} routes={this.state.routesFiltered}/>
      </div>
    
    );
  }
}

export default App;
