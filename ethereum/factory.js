import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const contractAddress = "0x8F899c219803f7bbda964A61aDaf545F8bf49eE2";

const factory = new web3.eth.Contract(CampaignFactory.abi, contractAddress);

export default factory;
