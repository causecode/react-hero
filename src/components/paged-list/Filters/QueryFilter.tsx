import * as React from 'react';
import {IFilter} from '../../../interfaces';
import {GenericFilter} from './GenericFilter';
const Field = require<any>('redux-form').Field;

export interface IQueryFilter extends IFilter {
    placeholder: string;
}

export function QueryFilter ({placeholder, paramName}: IQueryFilter): JSX.Element {

    return (
        <div className="query-filter">
            <Field
                    type="text"
                    name={paramName}
                    component={GenericFilter}
                    placeholder={placeholder}
            />
        </div>
    );
}
