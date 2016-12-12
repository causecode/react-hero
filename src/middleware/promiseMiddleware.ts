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

        const {type, payload, resource, successCallBack, failureCallBack, actionParams} = action;
        const {promise, data} = payload;
        const PENDING: string = `${type}_START`;
        const FULFILLED: string = `${type}_FULFILLED`;
        const REJECTED: string = `${type}_ERROR`;

        /**
         * Dispatch the pending action
         */
        dispatch(objectAssign({},
            {type: PENDING},
            data ? {payload: data} : {},
            {resource},
            actionParams
        ));

        /**
         * If successful, dispatch the fulfilled action, otherwise dispatch
         * rejected action.
         */
        return promise.then(
            result => {
                dispatch(objectAssign({}, {
                    type: FULFILLED,
                    payload: result.data || {},
                    resource
                }, actionParams));

                if (typeof successCallBack === 'function') {
                    successCallBack(result);
                }
            },
            error => {
                dispatch(objectAssign({}, {
                    type: REJECTED,
                    payload: error,
                    resource
                }, actionParams));

                if (typeof failureCallBack === 'function') {
                    failureCallBack(error);
                }
            }
        );
    };
}
