
import React, { Component } from 'react';

class HomeStudent extends Component {
    constructor () {
      super()
      this.funcion = this.funcion.bind(this)
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
        <div className="HomeStudent">
          Dashboard estudiante
        </div>
      );
    }
  }
  
  export default HomeStudent;
  