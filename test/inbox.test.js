const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());

const { interface, bytecode } = require('../compile');

let accounts, inboxContact;
beforeEach( async () => {

    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();

    // Use one of the accounts to deploy the contract
    // calling deploy() only creates the object to be deployed
    // send() does the real work
    inboxContact = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hi there!'] })
    .send({ from: accounts[0], gas: '1000000' });
})

// test
describe('Inbox Contract', () => {

    // test if a contract is deployed
    it('deploys contract', () => {
        assert.ok(inboxContact.options.address);
    });

    it('initializes default message', async () => {
        const message = await inboxContact.methods.message().call();
        assert.equal(message, 'Hi there!');
    });

    it('can change the message', async () => {
        await inboxContact.methods.setMessage('Bye there!').send({ from: accounts[0] });
        const message = await inboxContact.methods.message().call();
        assert.equal(message, 'Bye there!');
    });

})