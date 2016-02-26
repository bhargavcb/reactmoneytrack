/* Module for Firebase SignUp */


import React from 'react';
import firebase from 'firebase'
import autobind from 'autobind-decorator';
import {History} from 'react-router' 
import reactMixin from 'react-mixin'



var base = new Firebase('https://moneytrack.firebaseio.com/');

@autobind
class SignUp extends React.Component{
	//mixins : [history],
	createUser(event)
	{	event.preventDefault();

		base.createUser(
		{
			email: this.refs.email.value,
			password: this.refs.password.value
		},this.authHanlder);
	}
authHanlder(error,authData)
	{
			if(error)
			{
				console.log('LogIn Failed');

			}
			else
				{var uid = authData.uid;
					console.log(uid);
			this.history.pushState(null,'/home/'+uid);


			}
	}
	render()
	{
		return(
				<form className = 'store-selector' onSubmit={this.createUser} >
				<h1>Register New Account</h1>
				<input type='text' ref='email' placeholder='Email-ID'/>
				<input type='password' ref='password'placeholder='password'/>
				<input type='Submit'/>
				</form>

			)
	}
}

reactMixin.onClass(SignUp,History)


export default SignUp;
