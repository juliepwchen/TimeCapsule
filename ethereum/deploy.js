//Manually run "node deploy.js" to deploy Factory Contract
//Manually copy deployed Contract address to factory.js

const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/TimeCapsuleFactory.json');

//This Wallet provider connects to some target network & unlock accounts
//Use Mnemonics to unlock accounts by generates Public/Private keys
//This provider connects to an Infura Node 
//- does not require us to host expensive Nodes on our machine

const provider = new HDWalletProvider(
    'stock someone endless wish list report grocery shop purity awful cram disagree',
    'https://rinkeby.infura.io/1sShrQjlFt3rxAc7c4Tu'
);

//Web3 is pre-configred to connect to Rinkeby network using Provider
const web3 = new Web3(provider);

(async ()=>{
    try{
        const accounts = await web3.eth.getAccounts();
        console.log("Account = ", accounts[0]); 
        const result = await new web3.eth.Contract(JSON.parse(
                            compiledFactory.interface
                        )).deploy({
                            data: compiledFactory.bytecode
                        }).send({
                            from: accounts[0],
                            gas: '3100000'
                        });
        console.log("Contract deploy to ", result.options.address);
        result.setProvider(provider);
    } catch(e) {
      console.log(e);
    }

})();