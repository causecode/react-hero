import * as React from 'react';
import {FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import '../../../utils/appService';
import {IFilter} from '../../../interfaces/interfaces';

export function RangeFilter({ label, paramName, fields }: IFilter, {}): JSX.Element {

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
