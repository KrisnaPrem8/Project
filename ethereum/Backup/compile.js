const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);
 
const EVPath = path.resolve(__dirname, 'contracts', 'EVSupplyChain.sol');
const source = fs.readFileSync(EVPath, 'utf8');
 
const input = {
    language: 'Solidity',
    sources: {
        'EVSupplyChain.sol': {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*'],
            },
        },
    },
};
 
const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts;

fs.ensureDirSync(buildPath);

for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(':', '') + '.json'),
    output[contract]
  );
}