import {store} from '../store/store';
const objectAssign: any = require<any>('object-assign');

function isPromise(value): boolean {
    if (value !== null && typeof value === 'object') {
        return value.promise && typeof value.promise.then === 'function';
    }
}

export function promiseMiddleware({ dispatch }) {
    return next => (action) => {
        if (!isPromise(action.payload)) {
            return next(action);
        }

        const { types, payload, resource, successCallBack, failureCallBack } = action;
        const { promise, data } = payload;
        const [ PENDING, FULFILLED, REJECTED ] = types;

        /**
         * Dispatch the pending action
         */
        dispatch(objectAssign({},
            {type: PENDING},
            data ? {payload: data} : {},
            {resource}
        ));

        /**
         * If successful, dispatch the fulfilled action, otherwise dispatch
         * rejected action.
         */
        return promise.then(
            result => {
                dispatch({
                    type: FULFILLED,
                    payload: result.data || {},
                    resource
                });

                if (typeof successCallBack === 'function') {
                    successCallBack(result);
                }
            },
            error => {
                dispatch({
                    type: REJECTED,
                    payload: error,
                    resource
                });

                if (typeof failureCallBack === 'function') {
                    failureCallBack(error);
                }
            }
        );
    };
}
