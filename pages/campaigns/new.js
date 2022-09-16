import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router, Link } from '../../routes';

class CampaignNew extends Component {

	state = {
		minimumContribution: '',
		errorMessage: '',
		spinner: false
	}

	onSubmit = async (event) => {
		event.preventDefault();
		this.setState({ errorMessage: '' });
		try {
			this.setState({ spinner: true });
			const accounts = await web3.eth.getAccounts();
			await factory.methods.createCampaign(this.state.minimumContribution).send({
				from: accounts[0]
			});
			Router.pushRoute('/');
		} catch (err) {
			this.setState({ errorMessage: err.message });
		}
		this.setState({ spinner: false });
	};

	render () {
		return (
			<Layout>
				<h3>Create a Campaign</h3>
				<Form onSubmit={this.onSubmit} error = {!!this.state.errorMessage}>
					<Form.Field>
						<label>Minimum Comntribution</label>
						<Input
							label='wei'
							labelPosition='right'
							placeholder='Minimum contribution'
							value={this.state.minimumContribution}
							onChange={event =>
								this.setState({ minimumContribution: event.target.value })}
								/>
					</Form.Field>
					<Message error header='Oops!' content={this.state.errorMessage} />
					<Button primary loading={this.state.spinner}>Create!</Button>

				</Form>
			</Layout>
			);
	};
}

export default CampaignNew;
