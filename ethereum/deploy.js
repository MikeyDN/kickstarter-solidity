// deploy code will go here
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");

menmonic = 'cousin meadow fix topple rigid news physical occur hockey job stamp step';
infuraLink = 'https://rinkeby.infura.io/v3/3be66a7d4d014a45a47fdc22233b7b6f';

const provider = new HDWalletProvider(
  menmonic,
  infuraLink
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: compiledFactory.evm.bytecode.object })
    .send({ gas: '1400000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);

  provider.engine.stop(); // Prevent a hanging deployment
};

deploy();
