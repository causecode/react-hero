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
            {renderRangeFilterField(`${paramName}From`, type || 'text')}
            
            <strong>To</strong>
            {renderRangeFilterField(`${paramName}To`, type || 'text')}
        </FormGroup>
    );
}

function renderRangeFilterField(paramName: string, type: string): JSX.Element {
    return (
        <Field type={type} name={paramName} component={GenericFilter} />
    );
}
