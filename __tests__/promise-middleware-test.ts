import promiseMiddleware from '../src/middleware/promise-middleware';
import {Store} from 'redux';
import 'babel-polyfill';

interface IPostMiddlewareAction {
    type: string;
    payload?: Object[];
    meta?: Object;
    resource: string;
}

interface IPreMiddlewareAction {
    types: string[];
    payload: {
        promise: Promise
    };
    resource?: string;
}

let successPath: string = 'successPath';
let failurePath: string = 'failurePath';

describe('Test promise middleware', () => {
    let store: Object, next: jest.Mock<Function>, action, START: string, SUCCESS: string, ERROR: string,
            dispatch: jest.Mock<Function>, fetchData: jest.Mock<Function>, successObject: {success: boolean},
            failureObject: {success: boolean}, getAction: (path: string) => IPreMiddlewareAction;

    beforeEach(() => {
        next = jest.fn<Function>();
        dispatch = jest.fn<Function>();
        store = { dispatch: dispatch };
        successPath = 'successPath';
        failurePath = 'failurePath';
        START = 'START';
        SUCCESS = 'SUCCESS';
        ERROR = 'ERROR';
        successObject = {success: true};
        failureObject = {success: false};

        fetchData = jest.fn((path) => {
            return new Promise((resolve, reject) => {
                if (path === successPath) {
                    resolve(successObject);
                } else {
                    reject(failureObject);
                }
            });
        });
        getAction = (path: string): IPreMiddlewareAction => {
            return {
                types: [
                    START, SUCCESS, ERROR
                ],
                payload: {
                    promise: fetchData(path)
                },
                resource: 'test'
            };
        };
    });

    it('executes middleware with the correct action type', async () => {
        let promise: Promise = promiseMiddleware(store)(next)(getAction(successPath));
        await promise;

        let dispatchCalls = dispatch.mock.calls;

        expect(dispatchCalls.length).toEqual(2);
        expect(dispatchCalls[0][0].type).toEqual(START);
        expect(dispatchCalls[0][0].resource).toEqual('test');
        expect(dispatchCalls[1][0].type).toEqual(SUCCESS);
        expect(dispatchCalls[1][0].resource).toEqual('test');
        expect(dispatchCalls[1][0].payload).toEqual(successObject);
    });

    it('calls next if promise is not passes', () => {
        promiseMiddleware(store)(next)(successObject);

        expect(next).toBeCalledWith(successObject);
    });

    it('executes middleware with rejected payload promise', async () => {
        await promiseMiddleware(store)(next)(getAction(failurePath));

        let dispatchCalls = dispatch.mock.calls;

        expect(dispatchCalls.length).toEqual(2);
        expect(dispatchCalls[0][0].type).toEqual(START);
        expect(dispatchCalls[0][0].resource).toEqual('test');
        expect(dispatchCalls[1][0].type).toEqual(ERROR);
        expect(dispatchCalls[1][0].resource).toEqual('test');
        expect(dispatchCalls[1][0].payload).toEqual(failureObject);
    });

});
