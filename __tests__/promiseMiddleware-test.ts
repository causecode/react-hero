import {promiseMiddleware} from '../src/middleware/promiseMiddleware';
import {Store} from 'redux';
import 'babel-polyfill';
import {Stub} from '../src/interfaces';
const unroll: any = require<any>('unroll');

unroll.use(it);

interface IPreMiddlewareAction {
    type: string;
    payload: {
        promise: any
    };
    resource?: string;
    successCallBack?: jest.Mock<Stub>;
    failureCallBack?: jest.Mock<Stub>;
}

describe('Test promise middleware', () => {

    let next: jest.Mock<Function>;
    let dispatch: jest.Mock<Function>;
    let store: {dispatch: jest.Mock<Function>};
    let successPath: string = 'successPath';
    let failurePath: string = 'failurePath';
    let ACTION: string = 'TEST_ACTION';
    let START: string = `${ACTION}_START`;
    let SUCCESS: string = `${ACTION}_FULFILLED`;
    let ERROR: string = `${ACTION}_ERROR`;
    let successObject: {success: boolean} = {success: true};
    let failureObject: {success: boolean} = {success: false};

    let fetchData: jest.Mock<Function> = jest.fn<Function>((path) => {
        return new Promise((resolve, reject) => {
            if (path === successPath) {
                resolve({data: successObject});
            } else {
                reject(failureObject);
            }
        });
    });

    let getAction = (path: string, promise?: (path: string) => Promise<{}>): IPreMiddlewareAction => {
        return {
            type: ACTION,
            payload: {
                promise: promise ? promise(path) : fetchData(path)
            },
            resource: 'test'
        };
    };

    beforeEach(() => {
        next = jest.fn<Function>();
        dispatch = jest.fn<Function>();
        store = { dispatch: dispatch };
    });

    unroll('executes middleware with the correct action type', async (done, testArgs) => {
        await promiseMiddleware(store)(next)(testArgs.action);

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
        [failurePath, failureObject, ERROR, getAction(failurePath)],
        [successPath, {}, SUCCESS, getAction(successPath, () => {
            return new Promise((resolve) => { resolve({successObject}); });
        })]
    ]);

    describe('executes callbacks if passed', () => {
        let successCallBack: jest.Mock<Stub>;
        let failureCallBack: jest.Mock<Stub>;

        function configureAction(action: IPreMiddlewareAction): void {
            successCallBack = jest.fn<Stub>();
            failureCallBack = jest.fn<Stub>();
            action.successCallBack =  successCallBack;
            action.failureCallBack = failureCallBack;
        }

        it('executes successCallback if passed and promise resolves', async() => {
            let action: IPreMiddlewareAction = getAction(successPath);
            configureAction(action);
            await promiseMiddleware(store)(next)(action);

            expect(successCallBack).toBeCalledWith({data: successObject});
            expect(failureCallBack).not.toBeCalled();
        });

        it('executes failureCallBack if passed and promise rejects', async() => {
            let action: IPreMiddlewareAction = getAction(failurePath);
            configureAction(action);
            await promiseMiddleware(store)(next)(action);

            expect(successCallBack).not.toBeCalled();
            expect(failureCallBack).toBeCalledWith(failureObject);
        });
    });


    it('calls next if promise is not passed', () => {
        promiseMiddleware(store)(next)(successObject);

        expect(next).toBeCalledWith(successObject);
    });
});
