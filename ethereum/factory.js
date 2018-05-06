//Using deployed Contract address from manually run "node deploy.js"
//return an instance of Factory via Web3 provider
import web3 from './web3';
import TimeCapsuleFactory from './build/TimeCapsuleFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(TimeCapsuleFactory.interface),
    '0x09FF5BfA0a0dbFDC06aC07c5c6Cd4C34203b7EED'
);

export default instance;