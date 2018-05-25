
import React, { Component } from 'react';

class Solution extends Component {
    constructor () {
      super()
      this.funcion = this.funcion.bind(this)
      //this.handleLogout = this.handleLogout.bind(this)
    }
  
    state = {
      user: null
    }
  
    componentWillMount () {
    
    }
  
    funcion () {
     
    }
  
    
    render() {
      return (
        <div className="Solution">
         Solucion de enunciados
        </div>
      );
    }
  }
  
  export default Solution;
  