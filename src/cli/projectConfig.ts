import {commandLine} from './commandLine';
export let projectRoot: string = commandLine.development ? '../..' : '../../../..';

export let config = require<any>(projectRoot + '/tsconfig.json');
if (!config || !config.compilerOptions) {
    throw new Error('Could not find typescript configuration. ' + 
            'Make sure you have created a tsconfig.json in your project root with a rootDir and outDir. ');
}
export let typescriptRoot: string = '/' + config.compilerOptions.rootDir;
export let typescriptOut: string = '/' + config.compilerOptions.outDir;
if (!typescriptRoot) {
    throw new Error('rootDir not defined in tsconfig.json');
}
if (!typescriptOut) {
    throw new Error('outDir not defined in tsconfig.json');
}
