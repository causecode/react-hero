let config: {
    reactHero: {
        serverUrl: string;
    };
} = require<any>('../../../package.json');

let reactHeroConfig = config.reactHero;

export {reactHeroConfig as config};
