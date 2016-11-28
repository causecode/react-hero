import * as appService from './utils/appService';
let packageJson: any = require('../../../package.json');
let localConfigJson: any = require('../../../package.json');
// let localConfigJson: any = require('../../../localConfig.json');
// let configLocation: string = getEnvironment() === 'production' ? packageLocation : localConfigLocation;

// Doing this to avoid cyclic imports problem when used through commandline.
let isEmpty = appService.isEmpty || ((...args: any[]) => {});
let getEnvironment = appService.getEnvironment || (() => '');
localConfigJson = isEmpty(localConfigJson) ? packageJson : localConfigJson;

let config: {
    reactHero: {
        serverUrl: string;
        APIUrl: string;
    };
} = (getEnvironment() === 'production') ? packageJson : localConfigJson;

// if (configLocation === localConfigLocation && isEmpty(config)) {
//     config = require<any>(packageLocation);
// }

let reactHeroConfig = config.reactHero;

export {reactHeroConfig as config};
