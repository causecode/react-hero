let config: {
    reactHero: {
        serverUrl: string;
        APIUrl: string;
    };
} = require<any>('../../../package.json');

let reactHeroConfig = config.reactHero;

export {reactHeroConfig as config};
