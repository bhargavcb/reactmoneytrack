import React  from 'react';
import ReactDOM  from 'react-dom';
import { Router, Route } from 'react-router';
import { createHistory } from 'history';

import NotFound from './components/NotFound';
import MoneyTrack from './components/MoneyTrack';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';





/* Defining Routes for the Paths*/
var routes = (
<Router history={createHistory()}>
	<Route path = "/" component={SignIn}/>
	<Route path = "/signup" component={SignUp}/>
	<Route path = "/home/:userId" component={MoneyTrack}/>
	<Route path = "*" component={NotFound}/>
	</Router>
	)





ReactDOM.render(routes,document.querySelector('#main'));