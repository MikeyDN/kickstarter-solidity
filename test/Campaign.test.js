const mocha = require('mocha');
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {

	accounts = await web3.eth.getAccounts();
	factory = await new web3.eth.Contract(compiledFactory.abi)
		.deploy({
			data: compiledFactory.evm.bytecode.object
		})
		.send({ from: accounts[0], gas:'1400000' });

	await factory.methods.createCampaign("100").send({
		from: accounts[0],
	 	gas: '1000000'
	});

 	[campaignAddress] = await factory.methods.getDeployedCampaigns().call(); // Puts first value from given list to variable

	campaign = await new web3.eth.Contract(compiledCampaign.abi, campaignAddress);

});

describe('Campaigns', () => {
	it('deploys factory and campaign', () => {
		assert.ok(factory.options.address);
		assert.ok(campaign.options.address);
	});

	it('marks caller as campaign manager', async () => {
		const manager = await campaign.methods.manager().call();
		assert.equal(manager, accounts[0]);
	});

	it('receives and registers contributors', async() => {
		await campaign.methods.contribute().send({ from: accounts[1], gas: '1000000', value: '1000000' });

		const isContributor = await campaign.methods.contributors(accounts[1]).call();
		assert.ok(isContributor);

	});

	it('requires minimum contribution', async () => {
		try {
			await campaign.methods.contribute().send({ from: accounts[1], gas: '1000000', value: '5' });
			assert(false);
		} catch (err) {
			assert(err);
		}
	});

		it('allows manager to create spending request', async () => {
			await campaign.methods
				.createRequest('Buy batteries','1000000',accounts[1])
					.send({
					from: accounts[0],
					gas: '1000000'
				});

				const request = await campaign.methods.requests(0).call();

				assert.equal('Buy batteries', request.description);
		});

		it('processes requests', async () => {
			await campaign.methods.contribute().send({
				from: accounts[0],
				value:web3.utils.toWei('10','ether')
			});

			await campaign.methods
				.createRequest("A", web3.utils.toWei('5', 'ether'), accounts[1]).send({
					from: accounts[0],
					gas: '1000000'
				});

			await campaign.methods.approveRequest(0).send({
					from: accounts[0],
					gas: '1000000'
				});

			await campaign.methods.finalizeRequest(0).send({
				from: accounts[0],
				gas: '1000000'
			});

			let balance = await web3.eth.getBalance(accounts[1]);
			balance = web3.utils.fromWei(balance, 'ether');
			balance = parseFloat(balance);
			console.log(balance);
			assert.ok(balance > 100);


		});


	});
