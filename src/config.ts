import {getEnvironment, isEmpty} from './utils/appService';
let packageJson: any = require('../../../package.json');
let localConfigJson: any = require('../../../localConfig.json');
// let configLocation: string = getEnvironment() === 'production' ? packageLocation : localConfigLocation;
localConfigJson = isEmpty(localConfigJson) ? packageJson : localConfigJson;

// TODO remove any here.
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
