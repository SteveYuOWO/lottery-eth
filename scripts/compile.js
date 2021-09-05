const solc = require('solc');
const fs = require('fs');

const sourceCode = fs.readFileSync('../contracts/Lottery.sol').toString();

var input = {
  language: 'Solidity',
  sources: {
    'Lottery.sol': {
      content: sourceCode
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*']
      }
    }
  }
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

const simpleStorage = output.contracts['Lottery.sol'].Lottery;

const bytecode = simpleStorage.evm.bytecode.object;

const abi = simpleStorage.abi;

fs.writeFileSync('../src/shared/lottery-abi.json', JSON.stringify(abi));

module.exports = { bytecode, abi }