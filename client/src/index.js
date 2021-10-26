/* 
  * Developer Team's Issue Tracker
  * 
  * Basic Features:
  * 
  *  - Authentication/Authorization
  *  - User/Role Management
  *  - Ticket System for specific issues/bugs/feature requests
  * 
  * Built with React/Redux, Node, Express, MongoDB/Mongoose
  * 
*/

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import './index.css';
import App from './App';

ReactDOM.render(

  <Provider store={store}>

    <Router>

      <PersistGate persistor={persistor} >

        <App />

      </PersistGate>

    </Router>

  </Provider>
    
    ,
  document.getElementById('root')
);
