import * as React from 'react';
import {FormGroup, ControlLabel} from 'react-bootstrap';
import {IFilter} from '../../../interfaces';
import {GenericFilter} from './GenericFilter';
const Field = require<any>('redux-form').Field;

export interface IRangeFilterProps extends IFilter {
    paramNameFrom?: string;
    paramNameTo?: string;
}

export function RangeFilter({label, paramName, type, paramNameFrom, paramNameTo}: IRangeFilterProps): JSX.Element {

    label = label || paramName;

    return (
        <FormGroup>
            <ControlLabel>{label.capitalize()}</ControlLabel>

            <strong>From</strong>
            {renderRangeFilter(paramNameFrom || `${paramName}From`, type || 'text')}

            <strong>To</strong>
            {renderRangeFilter(paramNameTo || `${paramName}To`, type || 'text')}
        </FormGroup>
    );
}

export function renderRangeFilter(
            paramName: string, type: string, formatter?: (value: any) => any, parser?: (value: string) => any
    ): JSX.Element {
    return (
        <Field type={type} name={paramName} component={GenericFilter} format={formatter} parse={parser} />
    );
}
