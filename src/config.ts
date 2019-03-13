import * as appService from './utils/appService';
require('dotenv').config();

// Doing this to avoid cyclic imports problem when used through commandline.
let isEmpty: (...args: any[]) => void | boolean = appService.isEmpty || ((...args: any[]) => {});

const { SERVER_URL, API_URL } = process.env;


if (isEmpty(API_URL)) {
    throw new Error('ApiUrl must be defined.');
}

if (isEmpty(SERVER_URL)) {
    throw new Error('Server URL must be defined.');
}

let reactHeroConfig: {serverUrl: string, APIUrl: string} = {
    serverUrl: SERVER_URL, APIUrl: API_URL,
};

export {reactHeroConfig as config};
