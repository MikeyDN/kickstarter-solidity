import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';

class CampaignIndex extends Component {
	static async getInitialProps() {
		const campaigns = await factory.methods.getDeployedCampaigns().call();

		return { campaigns };
	}

	renderCampaign() {

		const items = this.props.campaigns.map(address => {
			return {
				header: address,
				description: <a>ViewCampaign</a>,
				fluid: true
			};
		});


		return <Card.Group items={items} />
	}

	render () {
		return (
			<div>
				<Layout>


					<h3>Open campaigns</h3>
					<Button
						floated="right"
						content="Create Campaign"
						icon="add circle"
						primary
					/>

					{this.renderCampaign()}
				</Layout>
			</div>);
	}
}

export default CampaignIndex;
