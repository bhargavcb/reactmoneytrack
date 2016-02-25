var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
var createBrowserHistory = require('history/lib/createBrowserHistory');
var reBase = require('re-base');
var base = reBase.createClass('https://moneytrack.firebaseio.com/');


/* Main Aplication Class*/

var MoneyTrack = React.createClass(
{
	getInitialState: function()
	{
		return{
			spendDetail:{}
		}
	},
	componentDidMount: function()
	{
		base.syncState(this.props.params.userId,{context: this,state: 'spendDetail'});
	},
	addAmountDetails:function(spendDetail)
	{
		var timeStamp = (new Date()).getTime();

		this.state.spendDetail['spend'+timeStamp] = spendDetail;

		this.setState({spendDetail:this.state.spendDetail});
	},
	renderDetails:function(key)
	{
		var spende = this.state.spendDetail[key];
		var Amount = spende['spendAmount'];
		var Action = spende['spendAction'];
		return <li className='list-of-fish'>Spent {Amount} on {Action}</li>
	},
	render : function(){
		return(
				<div>
				<h1>Welcome to MoneyTrack</h1> <SignOut/>
				<EnterDetails addAmountDetails={this.addAmountDetails}/>
				<ul>
	            {Object.keys(this.state.spendDetail).map(this.renderDetails)}
	          	</ul>
				</div>
				
			)
	},

});


/* Obtain the User Spend Details and Store it in State*/

var EnterDetails = React.createClass(
{
	createSpendDetail: function(event)
	{
		event.preventDefault();

		var spendDetail = {

			spendAction : this.refs.SpentOn.value,
			spendAmount : this.refs.Amount.value
		}

		this.props.addAmountDetails(spendDetail);
		this.refs.detailForm.reset();

	},
	render: function()
	{
		return(
			<form className='fish-edit' ref = "detailForm" onSubmit={this.createSpendDetail} >
				<input type='text' ref="SpentOn" placeholder='What did you do?' required/>
				<input type='number' ref="Amount" placeholder='Enter Amount' required/>
				<input type='Submit'/>
			</form>
			)
	}
});

/*Obtain User Credentials and Authenticate with Firebase */

var SignIn = React.createClass(
{	mixins : [History],
	goToUserPage: function(authData)
	{
		this.history.pushState(null,'/home/'+{uid});
	},
	authUser: function(event)
	{	event.preventDefault();
		this.refs.signInForm.reset();
		var email = this.refs.userName.value;
		var password = this.refs.password.value;
		base.authWithPassword(
		{
			email: email ,
			password: password
		},this.authHanlder)
	},
	authHanlder:function(error,authData)
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
	},
	goToSignUp: function()
		{
			this.history.pushState(null,'/signUp');
		},
	render: function()
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
})


/* Module for Firebase SignUp */

var SignUp = React.createClass(
{
	mixins : [history],
	createUser: function(event)
	{	event.preventDefault();

		base.createUser(
		{
			email: this.refs.email.value,
			password: this.refs.password.value
		},this.authHanlder);
	},
authHanlder:function(error,authData)
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
	},
	render:function()
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
})

var SignOut = React.createClass(
{	mixins :[History],
	signOut: function(event)
	{	event.preventDefault();
		base.unauth();
		this.history.pushState(null,'/');
	},
	render : function()
	{
		return(
				<button onClick={this.signOut}>SignOut</button>
			)
	}
})


/*  404 Page - For when the Route is not defined */

var NotFound = React.createClass({
  render : function() 
  {
    return <h1>Not Found!</h1>
  }
});


/* Defining Routes for the Paths*/
var routes = (
<Router history={createBrowserHistory()}>
	<Route path = "/" component={SignIn}/>
	<Route path = "/signup" component={SignUp}/>
	<Route path = "/home/:userId" component={MoneyTrack}/>
	<Route path = "*" component={NotFound}/>
	</Router>
	)





ReactDOM.render(routes,document.querySelector('#main'));