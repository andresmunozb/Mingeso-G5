import React,{Component} from 'react'
import {Link} from 'react-router-dom'
class Solution extends Component{
    constructor(props){
        super(props)
        console.log(props)
    }

    render(){

        return(
            <Link to={{
                pathname: '/hola',
                state: { fromDashboard: true }
                
              }}>

            <p>
            Llegue2
              </p>
              </Link>

            
     
            
            
        );
    }
}

export default Solution;