import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';


//Admin
import HomeAdmin from '../Admin/HomeAdmin'

//Student
import HomeStundet from '../Student/HomeStudent';
import Solution from '../Student/Solution';

//Teacher
import HomeTeacher from '../Teacher/HomeTeacher'
import CreateExerciseForm from '../Teacher/CreateExerciseForm'
import EditExerciseForm from '../Teacher/EditExerciseForm'
import ExerciseListPublishedTeacher from '../Teacher/ExerciseListFolder/ExerciseListPublishedTeacher'
import ExerciseItemUnpublishedTeacher from '../Teacher/ExerciseListFolder/ExerciseListUnpublishedTeacher'

//import ExerciseListStudent from '../Student/ExerciseListStudent';
//import Home from './Home';


//import ExerciseListTeacher from '../Teacher/ExerciseListFolder/ExerciseList'
//<Route path='/exercises_teacher' exact={true} render={props => (<ExerciseListTeacher {...props} />)}></Route>


class Body extends Component{
    
    render(){
        return(
            <Switch>
            <Route path='/home_admin' exact={true} render={props => (<HomeAdmin {...props} />)}></Route>
            
            <Route path='/home_student' exact={true} render={props => (<HomeStundet {...props} />)}></Route>
            <Route path='/solution' exact={true} render={props => (<Solution {...props} />)}></Route>
            
            <Route path='/home_teacher' exact={true} render={props => (<HomeTeacher {...props} />)}></Route>
            <Route path='/create_exercise' exact={true} render={props => (<CreateExerciseForm {...props} />)}></Route>
            <Route path='/published_exercises_teacher' exact={true} render={props => (<ExerciseListPublishedTeacher {...props} />)}></Route>
            <Route path='/unpublished_exercises_teacher' exact={true} render={props => (<ExerciseItemUnpublishedTeacher {...props} />)}></Route>
            <Route path='/edit_exercise' exact={true} render={props => (<EditExerciseForm {...props} />)}></Route>


            
            </Switch>

        );
    }
}

Body.propTypes = {
    user: PropTypes.object,
    routes:PropTypes.array.isRequired
}

export default Body;



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
            )} 
            

            <Route path='/exercises_student' exact={true} render={props => (<ExerciseListStudent {...props} />)}></Route>

            */