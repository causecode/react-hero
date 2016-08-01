import {promiseMiddleware} from '../src/middleware/promise-middleware';
import {Store} from 'redux';
import 'babel-polyfill';
const unroll: any = require<any>('unroll');

unroll.use(it);

interface IPreMiddlewareAction {
    types: string[];
    payload: {
        promise: any
    };
    resource?: string;
}

describe('Test promise middleware', () => {

    let next: jest.Mock<Function>;
    let dispatch: jest.Mock<Function>;
    let store: {dispatch: jest.Mock<Function>};
    let successPath: string = 'successPath';
    let failurePath: string = 'failurePath';
    let START: string = 'START';
    let SUCCESS: string = 'SUCCESS';
    let ERROR: string = 'ERROR';
    let successObject: {success: boolean} = {success: true};
    let failureObject: {success: boolean} = {success: false};

    let fetchData: jest.Mock<Function> = jest.fn<Function>((path) => {
        return new Promise((resolve, reject) => {
            if (path === successPath) {
                resolve(successObject);
            } else {
                reject(failureObject);
            }
        });
    });

    let getAction = (path: string): IPreMiddlewareAction => {
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

    beforeEach(() => {
        next = jest.fn<Function>();
        dispatch = jest.fn<Function>();
        store = { dispatch: dispatch };
    });

    unroll('executes middleware with the correct action type and path #path', async (done, testArgs) => {
        let promise: Promise = promiseMiddleware(store)(next)(getAction(testArgs.path));
        await promise;

        let dispatchCalls = dispatch.mock.calls;

        expect(dispatchCalls.length).toEqual(2);
        expect(dispatchCalls[0][0].type).toEqual(START);
        expect(dispatchCalls[0][0].resource).toEqual('test');
        expect(dispatchCalls[1][0].type).toEqual(testArgs.type);
        expect(dispatchCalls[1][0].resource).toEqual('test');
        expect(dispatchCalls[1][0].payload).toEqual(testArgs.response);
        done();
    }, [
        ['path', 'response', 'type', 'action'],
        [successPath, successObject, SUCCESS, getAction(successPath)],
        [failurePath, failureObject, ERROR, getAction(failurePath)]
    ]);

    it('calls next if promise is not passed', () => {
        promiseMiddleware(store)(next)(successObject);

        expect(next).toBeCalledWith(successObject);
    });
});
