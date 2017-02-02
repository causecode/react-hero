import * as React from 'react';
import {FormGroup, ControlLabel} from 'react-bootstrap';
import {IFilter} from '../../../interfaces';
import {GenericFilter} from './GenericFilter';
const Field = require<any>('redux-form').Field;

export function RangeFilter({label, paramName, type}: IFilter): JSX.Element {

    label = label ? label : paramName;
    return (
        <FormGroup>
            <ControlLabel>{label.capitalize()}</ControlLabel>
            <strong>From</strong>
            <Field 
                    type={type || 'text'}
                    name={`${paramName}From`}
                    component={GenericFilter}
            />
            <strong>To</strong>
            <Field 
                    type={type || 'text'}
                    name={`${paramName}To`}
                    component={GenericFilter}
            />
        </FormGroup>
    );
}
