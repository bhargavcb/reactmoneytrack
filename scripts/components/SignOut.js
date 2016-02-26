import React from 'react';
import autobind from 'autobind-decorator';
import reactMixin from 'react-mixin'
import {History} from 'react-router'
import rebase from 're-base'

var base = rebase.createClass('https://moneytrack.firebaseio.com/')

@autobind
class SignOut extends React.Component
{	
	signOut(event)
	{	event.preventDefault();
		base.unauth();
		this.history.pushState(null,'/');
	}
	render()
	{
		return(
				<button onClick={this.signOut}>SignOut</button>
			)
	}
}

reactMixin.onClass(SignOut,History)

export default SignOut;