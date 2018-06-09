import React, { Component } from 'react';
import Header from './components/Global/Header/Header';
import Body from './components/Global/Body';
import firebase from 'firebase';
import routes from './routes'
import Axios from 'axios';


class App extends Component {
  constructor () {
    super()
    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.getRol = this.getRol.bind(this);
    this.routesFilter = this.routesFilter.bind(this);
  }
  //DEFAULT POR MIENTRAS
  state = {
    user: null,
    rol: "none",
    routes: routes,
    routesFiltered:[]
  }

  getRol(email){
    Axios.get('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/users/'+email+'/role')
        .then( res => {
            const rol = res.data.nameRol;
            if(rol === 'admin' || rol === 'teacher' || rol === 'student'){
              this.routesFilter(rol);
              this.setState({rol});
            }
            else{
              this.setState({rol:'none'})
            }
        })
        .catch((err) => {
          this.setState({rol:'noRegister'})
        })
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
      if(user!==null){
        console.log(user.email);
        this.getRol(user.email);
      }
      else{
        
        this.setState({rol:'none'})
        this.setState({routesFiltered:[]})

      }
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
        onLogout={this.handleLogout}
        routes={this.state.routesFiltered}
        />
        <Body /*id= {this.state.id}*/ rol={this.state.rol} routes={this.state.routesFiltered}/>
      </div>
    
    );
  }
}

export default App;
