
import React, { Component } from 'react';

class DashboardStudent extends Component {
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
        <div className="DashboardStudent">
          Dashboard estudiante
        </div>
      );
    }
  }
  
  export default DashboardStudent;
  