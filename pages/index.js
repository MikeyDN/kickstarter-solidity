import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from '../routes'

class CampaignIndex extends Component {
	static async getInitialProps() {
		const campaigns = await factory.methods.getDeployedCampaigns().call();

		return { campaigns };
	}

	renderCampaign() {

		const items = this.props.campaigns.map(address => {
			return {
				header: address,
				description:(
						<Link route={`/campaigns/${address}`}>
							<a>ViewCampaign</a>
						</Link>
					),
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
					<Link route='/campaigns/new'>
						<Button
							floated="right"
							content="Create Campaign"
							icon="add circle"
							primary
						/>
					</Link>

					{this.renderCampaign()}
				</Layout>
			</div>);
	}
}

export default CampaignIndex;
