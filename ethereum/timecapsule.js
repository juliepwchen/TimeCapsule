//allowing dynamic deployment of TimeCapusle contract
//if address is obtained via 
import web3 from './web3';
import TimeCapsule from './build/TimeCapsule.json';

export default (address) => {
    //console.log('Inside timecapsule.js ', address);
    const instance = new web3.eth.Contract(
                        JSON.parse(TimeCapsule.interface),
                        address
                    );
    //console.log("INSTANCE ", instance);
    return instance; 
};
