import React,{Component} from 'react'

class dashboard extends Component{
    constructor(props){
        super(props)
        console.log(props)

    }

    render(){

        return(
            <p>
                Soy el dashboard default 
            </p>
        );
    }
}

export default dashboard;