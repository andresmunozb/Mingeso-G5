import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { Switch, Route,Redirect} from 'react-router-dom';


//Admin
import HomeAdmin from '../Admin/HomeAdmin'

//Student
import HomeStudent from '../Student/HomeStudent';
import Solution from '../Student/Solution';
import ExerciseListStudent from '../Student/ExerciseListFolder/ExerciseListStudent'
import ViewExerciseFormStudent from '../Student/ViewExerciseFormStudent'

//Teacher
import HomeTeacher from '../Teacher/HomeTeacher'
import CreateExerciseForm from '../Teacher/CreateExerciseForm'
import EditExerciseForm from '../Teacher/EditExerciseForm'
import ViewExerciseFormTeacher from '../Teacher/ViewExerciseFormTeacher'

import ExerciseListPublishedTeacher from '../Teacher/ExerciseListFolder/ExerciseListPublishedTeacher'
import ExerciseItemUnpublishedTeacher from '../Teacher/ExerciseListFolder/ExerciseListUnpublishedTeacher'

//import ExerciseListStudent from '../Student/ExerciseListStudent';
//import Home from './Home';


//import ExerciseListTeacher from '../Teacher/ExerciseListFolder/ExerciseList'
//<Route path='/exercises_teacher' exact={true} render={props => (<ExerciseListTeacher {...props} />)}></Route>

//
// 

class Body extends Component{
    constructor(props){
        super(props);
        console.log("estos son mis props")
        console.log(props);
        this.state = {
            typeOfUser: props.rol
        }
    }
    
    render(){
        return(
        <div className="Body">
              
            {this.state.typeOfUser === 'student' && 
              <Switch>
                    <Route path='/home_student' exact={true} render={props => (<HomeStudent {...props} />)}></Route>
                    <Route path='/solution' exact={true} render={props => (<Solution {...props} />)}></Route>
                    <Route path='/exercises_student' exact={true} render={props => (<ExerciseListStudent {...props} />)}></Route>            
                    <Route path='/view_exercise_student' exact={true} render={props => (<ViewExerciseFormStudent {...props} />)}></Route>
                    <Redirect to='/home_student' from= '/'/>

               </Switch>
        
        
            }

            {this.state.typeOfUser === 'teacher' && 
              <Switch>
                    <Route path='/home_teacher' exact={true} render={props => (<HomeTeacher {...props} />)}></Route>
                    <Route path='/create_exercise' exact={true} render={props => (<CreateExerciseForm {...props} />)}></Route>
                    <Route path='/view_exercise_teacher' exact={true} render={props => (<ViewExerciseFormTeacher {...props} />)}></Route>
                    <Route path='/published_exercises_teacher' exact={true} render={props => (<ExerciseListPublishedTeacher {...props} />)}></Route>
                    <Route path='/unpublished_exercises_teacher' exact={true} render={props => (<ExerciseItemUnpublishedTeacher {...props} />)}></Route>
                    <Route path='/edit_exercise' exact={true} render={props => (<EditExerciseForm {...props} />)}></Route>
                    <Redirect to='/home_teacher' from= '/'/>
             </Switch>
        
        
              }

            {this.state.typeOfUser === 'admin' && 
              <Switch>
                    <Route path='/home_admin' exact={true} render={props => (<HomeAdmin {...props} />)}></Route>
                    <Redirect to='/home_admin' from= '/'/>
            </Switch>
            }

        </div>
            

        );
    }
}

Body.propTypes = {
    user: PropTypes.string,
    routes:PropTypes.array.isRequired
}

export default Body;

/*
            {this.state.typeOfUser === 'student' && 
              <Switch>
                    <Route path='/home_student' exact={true} render={props => (<HomeStudent {...props} />)}></Route>
                    <Route path='/solution' exact={true} render={props => (<Solution {...props} />)}></Route>
                    <Route path='/exercises_student' exact={true} render={props => (<ExerciseListStudent {...props} />)}></Route>            
                    <Redirect to='/home_student' from= '/'/>

               </Switch>
        
        
            }

            {this.state.typeOfUser === 'teacher' && 
              <Switch>
                  <Route path='/home_teacher' exact={true} render={props => (<HomeTeacher {...props} />)}></Route>

                    <Route path='/create_exercise' exact={true} render={props => (<CreateExerciseForm {...props} />)}></Route>
                    <Route path='/published_exercises_teacher' exact={true} render={props => (<ExerciseListPublishedTeacher {...props} />)}></Route>
                    <Route path='/unpublished_exercises_teacher' exact={true} render={props => (<ExerciseItemUnpublishedTeacher {...props} />)}></Route>
                    <Route path='/edit_exercise' exact={true} render={props => (<EditExerciseForm {...props} />)}></Route>
                    <Redirect to='/home_teacher' from= '/'/>
             </Switch>
        
        
              }

            {this.state.typeOfUser === 'admin' && 
              <Switch>
                    <Route path='/home_admin' exact={true} render={props => (<HomeAdmin {...props} />)}></Route>
                    <Redirect to='/home_admin' from= '/'/>
            </Switch>*/


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