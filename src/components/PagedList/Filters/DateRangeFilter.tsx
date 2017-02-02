import * as React from 'react';
import {FormGroup, ControlLabel} from 'react-bootstrap';
import {IFilter} from '../../../interfaces';
import {GenericFilter} from './GenericFilter';
const Field = require<any>('redux-form').Field;

export function DateRangeFilter({label, paramName}: IFilter): JSX.Element {

    label = label ? label : paramName;
    return (
        <FormGroup>
            <ControlLabel>{label.capitalize()}</ControlLabel>
            <strong>From</strong>
            <Field 
                    type="date"
                    component={GenericFilter}
                    name={`${paramName}From`}
            />
            <strong>To</strong>
            <Field 
                    type="date"
                    component={GenericFilter}
                    name={`${paramName}To`}
            />
        </FormGroup>
    );
}
