import { Store } from 'redux';
export interface IMockStore extends Store {
    getState(): any;
    getActions(): Array<any>;
    clearActions(): void;
    subscribe(): any;
}
export declare function configureStore(initialState: any): Store | IMockStore;
export declare function _getEnhancers(): any;
export declare const store: Store | IMockStore;
