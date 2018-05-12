import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import NotFoundPage from './containers/NotFoundPage.js';
import LoginPage from './containers/LoginPage';
import Dashboard from './containers/DashboardPage';
import FormPage from './containers/FormPage';
import TablePage from './containers/TablePage';
import MapPage from './containers/MapPage';
import CodPage from './containers/CodPage';
import PaginationTablePageBase from './containers/PaginationTablePageBase';
import RouteProps from 'react-route-props'

//render={()=><TestWidget num="2" someProp={100}/>
//<Route path="nuevoEnunciado" component={FormPage}/>
/* render={(routeProps) => (
  <MyComponent {...routeProps} {...props} />
)}*/
//<Route path="listaEnunciadosProfesor" component={PaginationTablePageBase}/>
export default (
  <Route>
    <Route path="/login" component={LoginPage}/>
      <Route path="/" component={App}>
        <IndexRoute component={Dashboard}/>
        <Route path="dashboard" component={Dashboard}/>
        <Route path="practicar" component={CodPage}/>
        <Route path="nuevoEnunciado" component={FormPage}/>
        <RouteProps path='listaEnunciadosAlumno' component={PaginationTablePageBase} type={'alumn'}/>
        <RouteProps path='listaEnunciadosProfesor' component={PaginationTablePageBase} type={'prof'}/>
        <RouteProps path='listaEnunciadosCoordinador' component={PaginationTablePageBase} type={'coord'}/>
        <Route path="maps" component={MapPage}/>
        <Route path="*" component={NotFoundPage}/>
      </Route>
  </Route>
);
