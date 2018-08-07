
import React, { Component } from 'react';
class HomeTeacher extends Component {
    constructor (props) {
      super(props)
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
        <div >
          Dashboard profesor
         

        </div>
      );
    }
  }
  
  export default HomeTeacher;
  