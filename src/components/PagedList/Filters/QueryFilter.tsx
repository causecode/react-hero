import * as React from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import {IFilter} from './IFilters';
import '../../../utils/appService';

export interface IQueryFilter extends IFilter {
    placeholder: Array<string>;
}

export function QueryFilter ({ label, placeholder, fields, paramName }: IQueryFilter, {}) {

    label = label ? label : paramName;
    return (
        <FormGroup className="query-filter">
            <ControlLabel>{ label.capitalize() }</ControlLabel>
            <FormControl type="text" placeholder={ placeholder} {...fields[0]} />
        </FormGroup>
    );
}
