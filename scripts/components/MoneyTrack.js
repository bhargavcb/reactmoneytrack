import autobind from 'autobind-decorator';

import React from 'react';
import SignOut from './SignOut';
import EnterDetails from './EnterDetails';
import rebase from 're-base'

var base = rebase.createClass('https://moneytrack.firebaseio.com/')


@autobind
class  MoneyTrack extends React.Component
{
	constructor()
	{
		super();
		this.state = {
			spendDetail : {},
		}
	}
	componentDidMount()
	{
		this.ref = base.syncState(this.props.params.userId,{context: this,state: 'spendDetail'});
	}
	componentWillUnmount()
	{
		base.removeBinding(this.ref);
	}
	addAmountDetails(spendDetail)
	{
		var timeStamp = (new Date()).getTime();

		this.state.spendDetail['spend'+timeStamp] = spendDetail;

		this.setState({spendDetail:this.state.spendDetail});
	}
	renderDetails(key)
	{
		var spende = this.state.spendDetail[key];
		var Amount = spende['spendAmount'];
		var Action = spende['spendAction'];
		return <li className='list-of-fish'>Spent {Amount} on {Action}</li>
	}
	render(){
		return(
				<div>
				<h1>Welcome to MoneyTrack</h1> <SignOut/>
				<EnterDetails addAmountDetails={this.addAmountDetails}/>
				<ul>
	            {Object.keys(this.state.spendDetail).map(this.renderDetails)}
	          	</ul>
				</div>
				
			)
	}

}

export default MoneyTrack;
