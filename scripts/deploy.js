const {bytecode, abi} = require('./compile');
const Web3 = require('web3');

// from ganache
const web3 = new Web3('http://localhost:7545');

const contract = new web3.eth.Contract(abi);

const account = '0x533e1537DD196A5dA9184497e3241885c6740e5F';

contract.deploy({
  data: bytecode,
  arguments: []
})
.send({
    from: account,
    gas: 3000000,
    gasPrice: '30000000000000'
})
.then(instance => {
  console.log(instance.options.address)
})