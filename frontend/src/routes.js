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

//render={()=><TestWidget num="2" someProp={100}/>
//<Route path="nuevoEnunciado" component={FormPage}/>

export default (
  <Route>
    <Route path="/login" component={LoginPage}/>
      <Route path="/" component={App}>
        <IndexRoute component={Dashboard}/>
        <Route path="dashboard" component={Dashboard}/>
        <Route path="practicar" component={CodPage}/>
        <Route path="nuevoEnunciado" component={FormPage}/>
        <Route path="listaEnunciadosAlumno" component={TablePage}/>
        <Route path="maps" component={MapPage}/>
        <Route path="listaEnunciadosProfesor" component={PaginationTablePageBase}/>
        <Route path="*" component={NotFoundPage}/>
      </Route>
  </Route>
);
