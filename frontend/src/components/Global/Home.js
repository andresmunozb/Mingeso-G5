import React,{Component} from 'react';
import imagen from './background.png';
import './index.css';

class Home extends Component{
    render(){
        return(
            <div class="flex-center position-ref posr" style={{backgroundColor: "black"}}>
                <img src={imagen} className="App-logo" alt="logo" />
          </div> 
        
        );
    }
}


export default Home;