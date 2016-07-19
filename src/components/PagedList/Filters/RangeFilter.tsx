import * as React from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import {IFilter} from './IFilters';
import '../../../utils/appService';

export function RangeFilter({ label, paramName, fields }: IFilter, {}) {

    label = label ? label : paramName;
    return (
        <FormGroup>
            <ControlLabel>{ label.capitalize() }</ControlLabel>
            <strong>From</strong>
            <FormControl type="text" {...fields[0]}/>

            <strong>To</strong>
            <FormControl type="text" {...fields[1]}/>
        </FormGroup>
    );
}
