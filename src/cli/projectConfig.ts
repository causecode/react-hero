import {commandLine} from './commandLine';
let projectRoot = commandLine.development ? '../..' : '../../../..';

let config = require<any>(projectRoot + '/tsconfig.json');
if (!config || !config.compilerOptions) {
    throw new Error('Could not find typescript configuration. ' + 
            'Make sure you have created a tsconfig.json in your project root with a rootDir and outDir. ');
}
let typescriptRoot = '/' + config.compilerOptions.rootDir;
let typescriptOut = '/' + config.compilerOptions.outDir;

if (!typescriptRoot) {
    throw new Error('rootDir not defined in tsconfig.json');
}
if (!typescriptOut) {
    throw new Error('outDir not defined in tsconfig.json');
}

export {typescriptRoot, typescriptOut, projectRoot};
export default config;
