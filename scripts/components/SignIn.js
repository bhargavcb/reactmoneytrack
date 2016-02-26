/*Obtain User Credentials and Authenticate with Firebase */

import React from 'react';
import rebase from 're-base'
import reactMixin from 'react-mixin'
import autobind from 'autobind-decorator';
import {History} from 'react-router' 


var base = rebase.createClass('https://moneytrack.firebaseio.com/');


@autobind
class SignIn extends React.Component
{

	goToUserPage(authData)
	{
		this.history.pushState(null,'/home/'+{uid});
	}
	authUser(event)
	{	event.preventDefault();

		var email = this.refs.userName.value;
		var password = this.refs.password.value;
		console.log(email)
		console.log(password)
		base.authWithPassword(
		{
			email: email,
			password: password
		},this.authHanlder)

				this.refs.signInForm.reset();

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
	goToSignUp()
		{
			this.history.pushState(null,'/signUp');
		}
	render()
	{
		
		return(
			<form className='store-selector' ref='signInForm' onSubmit={this.authUser}>
				<h1>SignIn to Continue</h1>
				<input type='text' ref='userName' placeholder='UserName' required/>
				<input type='password' ref='password' placeholder='password' required/>
				<input type='Submit'/>
			</form>


			)

	}
}

reactMixin.onClass(SignIn,History)

export default SignIn;