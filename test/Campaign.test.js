const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const provider = ganache.provider();
const web3 = new Web3(provider); 

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

//modified package.json:
//"scripts": {
//    "test": "mocha"
//}
beforeEach( async ()=>{
    try {
        accounts = await web3.eth.getAccounts();

        //deploy a factory
        factory = await new web3.eth.Contract(JSON.parse(
            compiledFactory.interface
        )).deploy({
            data: compiledFactory.bytecode
        }).send({
            from: accounts[0],
            gas: '1000000'
        });

        //100 Wei
        await factory.methods.createCampaign('100').send({
            from: accounts[0],
            gas: '1000000'
        });
        //ES6: [campaignAddress]: assign 1st element to (campaignAddress = addresses[0])
        [campaignAddress] = await factory.methods.getDeployCampaigns().call();
        campaign = await new web3.eth.Contract(
            JSON.parse(compiledCampaign.interface), 
            campaignAddress);
    } catch (e) {

    }
});

describe( 'Campaigns', ()=>{
    it('deploys a Factory and a Campaign', ()=>{
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    });
    it('marks the caller as manager', async ()=>{
        const manager = await campaign.methods.manager().call();
        assert.equal(accounts[0], manager); //what it should be, what it is
    });
    it('allows contribution and set approvers', async ()=>{
        await campaign.methods.contribute().send({
            value: '200',
            from: accounts[1]
        });
        const isContributor = await campaign.methods.approvers(accounts[1]).call();
        assert(isContributor);   //if false, test fails.
    });
    it('requires minimum contribution', async ()=>{
        try{
            await campaign.methods.contribute().send({
                value: '5',
                from: accounts[2]
            });
            assert(false);   //automatically fail the test
        } catch(e){
            assert.ok(e);
        }
    });
    it('allows manager to make a request', async ()=>{
        await campaign.methods.createRequest(
            'Buy Batteries',
            '100',
            accounts[1]
        ).send({
            from: accounts[0],
            gas: '1000000'
        });
        const request = await campaign.methods.requests(0).call();
        assert.equal('Buy Batteries', request.description);
    });
    it('processes requests', async ()=>{
        await campaign.methods.contribute().send({
            from: accounts[0],
            value: web3.utils.toWei('10', 'ether')
        });
        await campaign.methods.createRequest(
            'Buy a Car',
            web3.utils.toWei('5','ether'),
            accounts[1]
        ).send({
            from: accounts[0],
            gas: '1000000'
        });
        await campaign.methods.approveRequest(0).send({
            from: accounts[0],
            gas: '1000000'
        });
        await campaign.methods.finalizeRequest(0).send({
            from: accounts[0],
            gas: '1000000'   
        });
        let balance = await web3.eth.getBalance(accounts[1]);
        balance = await web3.utils.fromWei(balance);  //returns a string in Ether
        balance = parseFloat(balance);  //returns a decimal number

        //console.log(balance);
        assert(balance > 104);
    });

});