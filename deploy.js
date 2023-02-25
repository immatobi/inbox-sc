const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
    'sleep jeans eyebrow cover equal cradle tooth dream hour true travel soldier',
    `https://goerli.infura.io/v3/dfde463782fb4397ad5538a5aecad17e`
);

const web3 = new Web3(provider);

let contract;
const deploy = async () => {

    const accounts = await web3.eth.getAccounts();
    console.log('attempting to deploy from account ' + accounts[0]);

    contract = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hi there!'] })
    .send({ from: accounts[0], gas: '1000000' });

    console.log('contract deployed to: ' + contract.options.address);
    // 0xeaa770a280A55739f520590D7A7Cdec1E8943534

    provider.engine.stop();

}

deploy();