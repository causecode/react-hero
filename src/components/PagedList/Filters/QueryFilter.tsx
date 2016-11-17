import * as React from 'react';
import {FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import '../../../utils/appService';
import {IFilter} from '../../../interfaces';

export interface IQueryFilter extends IFilter {
    placeholder: Array<string>;
}

export function QueryFilter ({ label, placeholder, fields, paramName }: IQueryFilter, {}): JSX.Element {

    label = label ? label : paramName;
    return (
        <FormGroup className="query-filter">
            <ControlLabel>{ label.capitalize() }</ControlLabel>
            <FormControl type="text" placeholder={ placeholder.join(', ') } {...fields[0]} />
        </FormGroup>
    );
}
