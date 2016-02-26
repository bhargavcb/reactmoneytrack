/* Obtain the User Spend Details and Store it in State*/

import React from 'react';
import autobind from 'autobind-decorator';


@autobind
class EnterDetails extends React.Component{

	createSpendDetail(event)
	{
		event.preventDefault();

		var spendDetail = {

			spendAction : this.refs.SpentOn.value,
			spendAmount : this.refs.Amount.value
		}

		this.props.addAmountDetails(spendDetail);
		this.refs.detailForm.reset();

	}
	render()
	{
		return(
			<form className='fish-edit' ref = "detailForm" onSubmit={this.createSpendDetail} >
				<input type='text' ref="SpentOn" placeholder='What did you do?' required/>
				<input type='number' ref="Amount" placeholder='Enter Amount' required/>
				<input type='Submit'/>
			</form>
			)
	}
}

export default EnterDetails;