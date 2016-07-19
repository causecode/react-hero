import configureStore from '../src/store/store';
import {IMockStore, store} from '../src/store/store';
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
        process.env.NODE_ENV = 'development';
        compose = jest.fn();
        let testStore: any = configureStore({});

        expect(testStore).toBeTruthy();
        expect(testStore.getActions).toBeFalsy();
    });

});
