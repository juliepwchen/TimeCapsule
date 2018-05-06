import Web3 from 'web3';

let web3;
//Assume user has Metamask installed in browser
//Metamask injects a web3 object in browser
if (typeof window !== 'undefined') {
    if (typeof window.web3 !== 'undefined') {
        web3 = new Web3(window.web3.currentProvider);  //window.web3 deprecated
    } else web3 = new Web3(web3.currentProvider);
} else {
    //user on server OR not using Metamask
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/1sShrQjlFt3rxAc7c4Tu'
    );
    web3 = new Web3(provider);
}

export default web3;