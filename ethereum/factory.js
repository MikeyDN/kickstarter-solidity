import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const contractAddress = "0x48EE0A5dD56CC9e17d56377681F9E6826f8e10B8";

const factory = new web3.eth.Contract(CampaignFactory.abi, contractAddress);

export default factory;
