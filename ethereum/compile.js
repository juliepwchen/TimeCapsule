//No need to recompile Contracts when Client-side code changes
//Manually run "node compile.js" to compile once
//Write JSON output to files

const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');

//delete ethereum/bulid folder
fs.removeSync(buildPath);

const timecapsulePath = path.resolve(__dirname, 'contracts', 'TimeCapsule.sol');
const source = fs.readFileSync(timecapsulePath, 'utf8');
const output = solc.compile(source, 1).contracts;

//create 'build' directory
fs.ensureDirSync(buildPath);

//iterate keys over object
//assign 'contract' variable to ':TimeCapsule' & ':TimeCapsuleFactory'
for (let contract in output) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract.replace(':', '') + '.json'),
        output[contract]        //actual content
    );
}

