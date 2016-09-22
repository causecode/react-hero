import {configureStore} from '../src/store/store';
import {IMockStore, store} from '../src/store/store';
import {getEnvironment} from '../src/utils/appService';
import {_getEnhancers} from '../src/store/store';
let compose = require<any>('redux').compose;

declare module process {
    export module env {
        let NODE_ENV: string;
    }
}

describe('tests store methods', () => {

    it('calls configure store', () => {
        let testStore: IMockStore = configureStore({}) as IMockStore;

        expect(testStore).toBeTruthy();
        expect(testStore.getActions).toBeTruthy();
    });

    it('calls the configure Store method in development environment', () => {
        let oldEnv: string = getEnvironment();
        process.env.NODE_ENV = 'development';
        let testStore: any = configureStore({});

        expect(testStore).toBeTruthy();
        expect(testStore.getActions).toBeFalsy();
        process.env.NODE_ENV = oldEnv;
    });

    it('calls getEnhancers', () => {
        let oldEnv: string = getEnvironment();
        process.env.NODE_ENV = 'development';
        window.devToolsExtension = jest.fn<Function>(() => () => () => {});

        // Not assigning type because the exact type is not known for redux enhancers
        let enhancers = _getEnhancers();
        expect(enhancers.length).toEqual(1);
        process.env.NODE_ENV = oldEnv;
    });

});
