const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const contractPath = path.resolve(__dirname, 'contract', 'Campaign.sol');
const source = fs.readFileSync(contractPath, 'utf8');
const input = JSON.stringify({
	language: 'Solidity',
	sources: { 'Campaign.sol': { content: source } },
	settings: {
		outputSelection: { '*': { '*': ['*'] } }
	}
});
const output = JSON.parse(solc.compile(input)).contracts['Campaign.sol'];

fs.ensureDirSync(buildPath);

for (let contract in output) {
	fs.outputJsonSync(
		path.resolve(buildPath, contract + '.json'),
		output[contract]
	);
}
// This is a complete boilerplate for compiling contracts to files.
