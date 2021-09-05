const {abi} = require('./compile');
const Web3 = require('web3');

// from ganache
const web3 = new Web3('http://localhost:7545');

const contractAddress = '0x3AFb922D64454b331e41dEa9b47b250bC9478234';

const contractInstance = new web3.eth.Contract(abi, contractAddress);

// console.log(contractInstance.options.address)

module.exports = contractInstance;