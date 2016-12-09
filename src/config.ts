import * as appService from './utils/appService';
let packageJson: any = require('../../../package.json');
let localConfigJson: any = require('../../../localConfig.json');

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

let reactHeroConfig = config.reactHero;

export {reactHeroConfig as config};
