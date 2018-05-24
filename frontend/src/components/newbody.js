import React,{Component} from 'react';
import PropTypes from 'prop-types';
import Home from './Home';
import { Switch, Route } from 'react-router-dom';
import ExerciseListStudent from '../Student/ExerciseListStudent';
import HomeStundet from '../Student/HomeStudent';
import Solution from '../Student/Solution';

/* {this.props.routes && this.props.routes.map(
            (route,key) => 
            route.routes ?  
            <div>
                {route.routes.map((route2,key2)=> 
                    <Route path={route2.path} 
                    exact={route2.exact}  
                    render={props => (<route2.component {...props} />)}></Route>)}
            </div>:
            <Route path={route.path} exact={route.exact} render={props => (<route.component {...props} />)}></Route>
            )} */
class Body extends Component{
    
    render(){
        return(
            <Switch>

            
            <Route path='/home_student' exact={true} render={props => (<HomeStundet {...props} />)}></Route>
            <Route path='/exercises_student' exact={true} render={props => (<ExerciseListStudent {...props} />)}></Route>
            <Route path='/solution' exact={true} render={props => (<Solution {...props} />)}></Route>
            </Switch>

        );
    }
}

Body.propTypes = {
    user: PropTypes.object,
    routes:PropTypes.array.isRequired
}

export default Body;