import React,{Component} from 'react';
import PropTypes from 'prop-types';
import Home from './Home';
import About from './About';
import Contact from './Contact'
import { Switch, Route } from 'react-router-dom';


class Body extends Component{
    
    render(){
        return(
            <div>
            <ul>{this.props.routes && this.props.routes.map(
                (route,key) => <li key={key} >{route.name}</li>
            )}</ul>
            <Switch>
            
                <Route path='/' exact={true} component={Home}></Route>
                <Route path='/about' exact={true} component={About}></Route>
                <Route path='/contact' exact={true} component={Contact}></Route>
                
            </Switch>
            </div>
        );
    }
}

Body.propTypes = {
    user: PropTypes.object,
    routes:PropTypes.array.isRequired
}

export default Body;