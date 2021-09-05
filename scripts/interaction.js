const contractInstance = require('./instance');

contractInstance.methods.manager().call().then(res => console.log(res))
