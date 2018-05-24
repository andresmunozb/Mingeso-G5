import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

import firebase from 'firebase/app';
import 'firebase/auth';

var config = {
    apiKey: "AIzaSyA5BYOHIywWvnRdL1nfIgNyUp3ROrvLuRk",
    authDomain: "mingeso-g5.firebaseapp.com",
    databaseURL: "https://mingeso-g5.firebaseio.com",
    projectId: "mingeso-g5",
    storageBucket: "mingeso-g5.appspot.com",
    messagingSenderId: "18494868498"
  };
firebase.initializeApp(config);
ReactDOM.render(<Router><App/></Router>, document.getElementById('root'));
registerServiceWorker();
