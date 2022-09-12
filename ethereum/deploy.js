// deploy code will go here
const HDWalletProvider = require('@truffle/hdwallet-provider');
const { interface, bytecode } = require("./compile.js");
const Web3 = require("web3");

menmonic = 'mnemonic';
infuraLink = 'ifura rinkeby link';

const provider = new HDWalletProvider(
  menmonic,
  infuraLink
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hi there!'] })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);

  provider.engine.stop(); // Prevent a hanging deployment
};

deploy();
