import * as React from 'react';
import {FormGroup, ControlLabel} from 'react-bootstrap';
import {IFilter} from '../../../interfaces';
import {GenericFilter} from './GenericFilter';
const Field = require<any>('redux-form').Field;

export interface IQueryFilter extends IFilter {
    placeholder: string;
}

export function QueryFilter ({label, placeholder, paramName}: IQueryFilter): JSX.Element {

    label = label || paramName;
    return (
        <FormGroup className="query-filter">
            <ControlLabel>{label.capitalize()}</ControlLabel>
            <Field 
                    type="text"
                    name={paramName} 
                    component={GenericFilter} 
                    placeholder={placeholder}
            />
        </FormGroup>
    );
}
